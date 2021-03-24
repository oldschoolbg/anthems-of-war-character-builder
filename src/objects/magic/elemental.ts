import { Armor, Weapon, Weapons } from "..";
import { Move, Physicality, Dexterity, Constitution, Mind, Trait, EquipmentProperty, CharacterClass, CharacterClasses, EquipmentProperties, Traits } from "../../defs";
import { Moveable, Keyed } from "../../interfaces";

export enum Elementals {
  AirElemental = "Air Elemental",
  WaterElemental = "Water Elemental",
  EarthElemental = "Earth Elemental",
  FireElemental = "Fire Elemental",
  ShadeAssassin = "Shade Assassin",
  Undead = "Undead",
  Skeleton = "Skeleton"
}

export class Elemental implements Moveable, Keyed {
  constructor(key: Elementals) {
    this._key = key;
  }
  private _key: Elementals;
  get Key(): Elementals {
    return this._key;
  }
  IsCommander: boolean = false;
  MOV: Move = new Move();
  PHY: Physicality = new Physicality();
  DEX: Dexterity = new Dexterity();
  CON: Constitution = new Constitution();
  MND: Mind = new Mind();
  private _characterClass = CharacterClass.Instinct();

  private _traits: Trait[] = [];
  get Traits(): Trait[] { return this._traits; };
  private _weapons: Weapon[] = [];
  get Weapons(): Weapon[] { return this._weapons; }
  private _armour = Armor.None();
  get Armor(): Armor { return this._armour; }

  get PointsCost() : number {
    return 0;
  }

  
  SetCharacterClass(characterClass: CharacterClass) : Elemental {
    this._characterClass = characterClass;
    return this;
  }

  AddTrait(key: Traits) : Elemental {
    const trait = Trait.Options.find(t => t.Key === key);
    if (trait !== undefined) {
      this._traits.push(trait);
      trait.AddEffect(this);
    }
    return this;
  }

  RemoveTrait(key: Traits) : Elemental {
    const index = this._traits.findIndex((e: Keyed) => key === e.Key);
    if (index !== -1) {
      this._traits[index].RemoveEffect(this);
      this._traits.splice(index, 1);
    }
    return this;
  }

  AddWeapon(key: Weapons | Weapon) : Elemental {
    let weapon: Weapon | undefined;
    if (key instanceof Weapon) {
      weapon = key as Weapon;
    } else {
      weapon = Weapon.Options.find(t => t.Key === key);
    }
    if (weapon !== undefined) {
      if (this._weapons.find(t => t.Key === Weapons.Unarmed)) {
        this._weapons = [];
      }
      this._weapons.push(weapon);
    }
    return this;
  }
  RemoveWeapon(key: Weapons) : Elemental {
    const index = this._weapons.findIndex((e: Keyed) => key === e.Key);
    if (index !== -1) {
      this._weapons.splice(index, 1);
      if (this._weapons.length === 0) {
        this._weapons = [
          Weapon.Unarmed()
        ];
      }
    }
    return this;
  }

  SetArmor(armour: Armor) : Elemental {
    this._armour = armour;
    return this;
  }
  RemoveArmor  () : Elemental {
    this._armour = Armor.None();
    return this;
  }

  static AirElemental(): Elemental {
    const result = new Elemental(Elementals.AirElemental)
    .SetArmor(new Armor('Buffetting Wind', '+2 to armor checks', 2))
    .AddWeapon(new Weapon('Windy Assualt', 4, 1));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 3;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };
  
  static WaterElemental(): Elemental {
    const result = new Elemental(Elementals.WaterElemental)
    .AddWeapon(new Weapon('Ice Shards', 2, 2).AddProperty(EquipmentProperties.Ranged));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 3;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };

  static EarthElemental(): Elemental {
    const result = new Elemental(Elementals.EarthElemental)
    .AddTrait(Traits.Large)
    .AddTrait(Traits.Slow)
    .AddWeapon(new Weapon('Rock Slam', 1, 6))
    .SetArmor(new Armor('Stone Armor', '+4 to armor checks', 5));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 2;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };
  
  static FireElemental(): Elemental {
    const result = new Elemental(Elementals.FireElemental)
    .AddWeapon(new Weapon('Fire Brand', 2, 5));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 2;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };

  static ShadeAssassin(): Elemental {
    const result = new Elemental(Elementals.ShadeAssassin)
    .AddWeapon(Weapon.Dagger())
    .SetArmor(Armor.LightArmor());
    result.MOV.Value = 4;
    result.PHY.Value = 1;
    result.DEX.Value = 3;
    result.CON.Value = 1;
    result.MND.Value = 0;
    return result;
  };

  static Undead(): Elemental {
    const result = new Elemental(Elementals.Undead)
    .AddWeapon(Weapon.Unarmed())
    .AddTrait(Traits.Slow);
    result.MOV.Value = 3;
    result.PHY.Value = 0;
    result.DEX.Value = 0;
    result.CON.Value = 1;
    result.MND.Value = 0;
    return result;
  };

  static Skeleton(weaponText: string): Elemental {
    const result = new Elemental(Elementals.Skeleton)
    .SetCharacterClass(CharacterClass.Regular())
    .AddWeapon(new Weapon(weaponText, 1, 3));
    result.MOV.Value = 4;
    result.PHY.Value = 1;
    result.DEX.Value = 1;
    result.CON.Value = 1;
    result.MND.Value = 0;
    return result;
  }
};