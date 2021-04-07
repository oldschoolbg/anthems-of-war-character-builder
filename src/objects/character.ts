import { Move, Physicality, Dexterity, Constitution, Mind, Trait, Traits } from '../defs';
import { Mount, Mounts } from './mount';
import { Moveable, Keyed, IsCommander, Physical, Magicable } from '../interfaces';
import { MiscellaneousEquipment, MiscellaneousEquipments } from './miscellaneous_equipment';
import { Potion, Potions } from './potion';
import { Skill, Skills } from '../defs/skill';
import { Weapon, Weapons } from './weapon';
import { Armor, ArmorType } from './armour';
import { Shield, Shields } from './shield';
import { Elemental } from './magic';
import { CharacterClass, CharacterClasses } from '../defs/character_class';

/**
 * Default character has:
 * MOV = 4
 * PHY = 0
 * DEX = 0
 * CON = 1
 * MND = 0
 */
export class Character implements Moveable, Physical, Magicable, IsCommander {
  private constructor(characterClass: CharacterClass, isCommander?: boolean) {
    if (isCommander) {
      this.IsCommander = true;
    }
    this.SetCharacterClass(characterClass);
    this.Name = undefined;
    this._weapons = [
      Weapon.Unarmed()
    ];
  }

  Name: string | undefined;
  IsCommander: boolean = false;
  private _isRegular = false;
  get IsRegular(): boolean {
    return this._isRegular;
  }
  MOV: Move = new Move();
  PHY: Physicality = new Physicality();
  DEX: Dexterity = new Dexterity();
  CON: Constitution = new Constitution();
  MND: Mind = new Mind();

  private _characterClass = CharacterClass.Regular();
  get CharacterClass(): CharacterClass {
    return this._characterClass;
  }

  private _traits: Trait[] = [];
  get Traits(): Trait[] { return this._traits; };
  private _mount? : Mount;
  get Mount(): Mount | undefined { return this._mount; };
  private _elementals: Elemental[] = [];
  get Elementals(): Elemental[] {
    return this._elementals;
  }
  private _equipment: MiscellaneousEquipment[] = [];
  get Equipment(): MiscellaneousEquipment[] { return this._equipment; }
  private _potions: Potion[] = [];
  get Potions(): Potion[] { return this._potions; }
  private _skills: Skill[] = [];
  get Skills(): Skill[] { return this._skills; }
  get AvailableSkills(): Skill[] {
    return Skill.Options.filter(s => !this._skills.find(i => i.Key === s.Key));
  }
  private _weapons: Weapon[] = [];
  get Weapons(): Weapon[] { return this._weapons; }
  private _armour = Armor.None();
  get Armor(): Armor { return this._armour; }
  private _shield = Shield.None();
  get Shield(): Shield { return this._shield; }

  private _spellPoolLimit: number = 0;
  public get SpellPoolLimit(): number { return this._spellPoolLimit + this.MND.Value + 1; }
  private _spellcastingSlotsLimit: number = 0;
  public get SpellcastingSlotsLimit(): number { return this._spellcastingSlotsLimit; }
  private _spellcastingSchoolsLimit: number = 0;
  public get SpellcastingSchoolsLimit(): number { return this._spellcastingSchoolsLimit; }
  private _spellcastingSchools: any[] = [];
  get SpellCastingSchools(): any[] { return this._spellcastingSchools; }

  get PointsCost() : number {
    const mountCost : number = this.Mount !== undefined ? this.Mount.PointsCost : 0;
    return this.MOV.PointsCost
           + this.PHY.PointsCost
           + this.DEX.PointsCost
           + this.CON.PointsCost
           + this.MND.PointsCost
           + this.CharacterClass.PointsCost
           + this.Armor.PointsCost
           + this.Shield.PointsCost
           + this.Traits.map((t: Trait) => t.PointsCost).reduce((a, b) => a + b, 0)
           + this.Potions.map((p: Potion) => p.PointsCost).reduce((a, b) => a + b, 0)
           + this.Weapons.map((w: Weapon) => w.PointsCost).reduce((a, b) => a + b, 0)
           + this.Equipment.map((m: MiscellaneousEquipment) => m.PointsCost).reduce((a, b) => a + b, 0)
           + mountCost;
  }

  SetSpellcastingSchoolsLimit(to: number): Character {
    this._spellcastingSchoolsLimit = to;
    return this;
  }
  SetSpellcastingSlotsLimit(to: number): Character {
    this._spellcastingSlotsLimit = to;
    return this;
  }
  SetSpellPoolLimit(to: number): Character {
    this._spellPoolLimit = to;
    return this;
  }

  SetCharacterClass(characterClass: CharacterClass) : Character {
    if (this.IsCommander && characterClass.Key === CharacterClasses.Instinct) {
      throw new Error('You cannot set a Commander to the Instinct Character Class');
    }
    this._characterClass = characterClass;
    this._isRegular = this._characterClass.Key === CharacterClasses.Regular
    return this;
  }

  AddTrait(key: Traits) : Character {
    const trait = Trait.Options.find(t => t.Key === key);
    if (trait !== undefined) {
      if (trait.CanAdd(this)) {
        const index = this._traits.findIndex((e: Keyed) => key === e.Key);
        if (index === -1) {
          trait.AddEffect(this);
          this._traits.push(trait);
        } else {
          const t = this._traits[index];
          if (t.MultipleAllowed) {
            t.AddEffect(this);
            t.AddOne();
          }
        }
      }
    }
    return this;
  }

  RemoveTrait(key: Traits) : Character {    
    const trait = this._traits.find((e: Keyed) => key === e.Key);
    if (trait !== undefined) {
      trait.RemoveEffect(this)
      if (trait.Quantity === 1) {
        this._traits = this._traits.filter(e => e.Key !== key);
      } else {
        trait.RemoveOne();
      }
    }
    return this;
  }

  AddEquipment(key: MiscellaneousEquipments) : Character {
    const equipment = MiscellaneousEquipment.Options.find(t => t.Key === key);
    if (equipment !== undefined) {
      if (equipment.CanAdd(this)) {
        const index = this._equipment.findIndex((e: Keyed) => key === e.Key);
        if (index === -1) {
          this._equipment.push(equipment);
        } else {
          const e = this._equipment[index];
          if (e.MultipleAllowed) {
            e.AddOne();
          }
        }
      }
    }
    return this;
  }
  RemoveEquipment(key: MiscellaneousEquipments) : Character {
    const equipment = this._equipment.find((e: Keyed) => key === e.Key);
    if (equipment !== undefined) {
      if (equipment.Quantity === 1) {
        this._equipment = this._equipment.filter(e => e.Key !== key);
      } else {
        equipment.RemoveOne();
      }
    }
    return this;
  }

  AddWeapon(key: Weapons | Weapon) : Character {
    let weapon: Weapon | undefined;
    if (key instanceof Weapon) {
      weapon = key as Weapon;
    } else {
      weapon = Weapon.Options.find(t => t.Key === key);
    }
    if (weapon !== undefined) {
      this._weapons = this._weapons.filter(e => e.Key !== Weapons.Unarmed)
      const index = this._weapons.findIndex((e: Keyed) => key === e.Key);
      if (index === -1) {
        this._weapons.push(weapon);
      } else {
        const w = this._weapons[index];
        if (w.MultipleAllowed) {
          w.AddOne();
        }
      }
    }
    return this;
  }
  RemoveWeapon(key: Weapons) : Character {
    const index = this._weapons.findIndex((e: Keyed) => key === e.Key);
    if (index !== -1) {
      const weapon = this._weapons[index];
      if (weapon.Quantity === 1) {
        this._weapons.splice(index, 1);
      } else {
        weapon.RemoveOne();
      }
      if (this._weapons.length === 0) {
        this._weapons = [
          Weapon.Unarmed()
        ];
      }
    }
    return this;
  }
  
  AddSkill(key: Skills) : Character {
    const skill = Skill.Options.find(t => t.Key === key);
    if (skill !== undefined) {
      if (skill.CanAdd(this)) {
        skill.AddEffect(this, skill);
        this._skills.push(skill);
      }
    }
    return this;
  }
  RemoveSkill(key: Skills) : Character {
    const index = this._skills.findIndex((e: Keyed) => key === e.Key);
    if (index !== -1) {      
      this._skills[index].RemoveEffect(this, this._skills[index]);
      this._skills.splice(index, 1);
    }
    return this;
  }

  AddMount(key: Mounts) : Character {
    const mount = Mount.Options.find(m => m.Key === key);
    if (mount !== undefined) {
      this._mount = mount;
    }
    return this;
  }
  RemoveMount() : Character {
    this._mount = undefined;
    return this;
  }

  AddElemental(elemental: Elemental): Character {
    this._elementals.push(elemental);
    return this;
  }
  RemoveElemental(elemental: Elemental): Character {
    const found = this._elementals.findIndex(e => e.Key === elemental.Key)
    if (found !== -1) {
      this._elementals.splice(found, 1);
    }
    return this;
  }

  SetArmor(key: ArmorType) : Character {
    const armour = Armor.Options.find(m => m.Key === key);
    if (armour !== undefined) {
      this._armour = armour;
    }
    return this;
  }
  SetShield(key: Shields) : Character {
    const shield = Shield.Options.find(m => m.Key === key);
    if (shield !== undefined) {
      this._shield = shield;
    }
    return this;
  }

  AddPotion(key: Potions) : Character {
    const potion = Potion.Options.find(p => p.Key === key);
    if (potion !== undefined) {
      this._potions.push(potion);
    }
    return this;
  }

  RemovePotion(key: Potions) : Character {
    const index = this._potions.findIndex(p => p.Key === key);
    this._potions.splice(index, 1);
    return this;
  }

  static Leader(): Character {
    return new Character(CharacterClass.Regular(), true);
  }

  static Regular(): Character {
    return new Character(CharacterClass.Regular());
  }
  static Instinct(): Character {
    return new Character(CharacterClass.Instinct());
  }
}
