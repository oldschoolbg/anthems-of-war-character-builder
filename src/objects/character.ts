import { Move, Physicality, Dexterity, Constitution, Mind, Trait } from '../defs';
import { Mount } from './mount';
import { Moveable, Keyed, IsCommander, Physical, Magicable } from '../interfaces';
import { MiscellaneousEquipment } from './miscellaneous_equipment';
import { Potion } from './potion';
import { Skill } from '../defs/skill';
import { Weapon } from './weapon';
import { Armour } from './armour';
import { Shield } from './shield';
import { Elemental } from './magic';

/**
 * Default character has:
 * MOV = 4
 * PHY = 0
 * DEX = 0
 * CON = 1
 * MND = 0
 */
export class Character implements Moveable, Physical, Magicable, IsCommander {
  private constructor(isCommander?: boolean) {
    if (isCommander) {
      this.IsCommander = true;
    }
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
  private _weapons: Weapon[] = [];
  get Weapons(): Weapon[] { return this._weapons; }
  private _armour = Armour.None();
  get Armour(): Armour { return this._armour; }
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
           + this.Armour.PointsCost
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

  AddTrait(trait: Trait) : Character {
    if (trait.Key === 'Instinct') {
      if (this._traits.find((t) => t.Key === 'Regular')) {
        this._traits = this._traits.filter((t) => t.Key !== 'Regular');
      }
      this._isRegular = false;
    }
    if (trait.Key === 'Regular') {
      if (this._traits.find((t) => t.Key === 'Instinct')) {
        this._traits = this._traits.filter((t) => t.Key !== 'Instinct');
      }
      this._isRegular = true;
    }
    this._traits.push(trait);
    trait.AddEffect(this);
    return this;
  }

  RemoveTrait(trait: Trait) : Character {
    if (trait.Key === 'Instinct') {
      this._traits.push(Trait.Regular());
    }
    if (trait.Key === 'Regular') {
      this._traits.push(Trait.Instinct());
    }
    this._traits = this._traits.filter((t) => t.Key !== trait.Key);
    trait.RemoveEffect(this);
    return this;
  }

  HasTrait(trait: Trait): boolean {
    return this._traits.find(t => t.Key === trait.Key) !== undefined;
  }

  AddEquipment(equipment: MiscellaneousEquipment) : Character {
    if (equipment.Prerequisites.some((wp) => !this._traits.find((p: Keyed) => p.Key === wp.Key))) {
      throw new Error(
        `Cannot add ${equipment.Key} as Character must have ${equipment.Prerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`,
      );
    }
    this._equipment.push(equipment);
    return this;
  }
  RemoveEquipment(equipment: MiscellaneousEquipment) : Character {
    const index = this._equipment.findIndex((e: Keyed) => equipment.Key === e.Key);
    this._equipment.splice(index, 1);
    return this;
  }

  AddWeapon(weapon: Weapon) : Character {
    /*if (weapons.Prerequisites.some((wp) => !this._traits.find((p: Keyed) => p.Key === wp.Key))) {
      throw new Error(
        `Cannot add ${equipment.Key} as Character must have ${equipment.Prerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`,
      );
    }*/
    if (this._weapons.find(t => t.Key === 'Unarmed')) {
      this._weapons = [];
    }
    this._weapons.push(weapon);
    return this;
  }
  RemoveWeapon(weapon: Weapon) : Character {
    const index = this._weapons.findIndex((e: Keyed) => weapon.Key === e.Key);
    this._weapons.splice(index, 1);
    if (this._weapons.length === 0) {
      this._weapons = [
        Weapon.Unarmed()
      ];
    }
    return this;
  }

  
  AddSkill(skill: Skill) : Character {
    if (skill.TraitPrerequisites.some((wp) => !this._traits.find((p: Keyed) => p.Key === wp.Key))) {
      throw new Error(
        `Cannot add ${skill.Key} as Character must have ${skill.TraitPrerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`,
      );
    }
    this._skills.push(skill);
    return this;
  }
  RemoveSkill(skill: Skill) : Character {
    const index = this._skills.findIndex((e: Keyed) => skill.Key === e.Key);
    this._skills.splice(index, 1);
    return this;
  }

  AddMount(mount: Mount) : Character {
    this._mount = mount;
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

  AddArmour(armour: Armour) : Character {
    this._armour = armour;
    return this;
  }
  RemoveArmour  () : Character {
    this._armour = Armour.None();
    return this;
  }

  AddShield(shield: Shield) : Character {
    this._shield = shield;
    return this;
  }
  RemoveShield  () : Character {
    this._shield = Shield.None();
    return this;
  }

  AddPotion(potion: Potion) : Character {
    this._potions.push(potion);
    return this;
  }

  RemovePotion(potion: Potion) : Character {
    const index = this._potions.findIndex(p => p.Key === potion.Key);
    this._potions.splice(index, 1);
    return this;
  }

  static Leader(): Character {
    return new Character(true)
    .AddTrait(Trait.Regular());
  }

  static Regular(): Character {
    return new Character()
    .AddTrait(Trait.Regular());
  }
  static Instinct(): Character {
    return new Character()
    .AddTrait(Trait.Instinct());
  }
}
