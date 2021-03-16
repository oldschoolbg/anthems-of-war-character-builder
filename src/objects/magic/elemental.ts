import { Armour, Weapon } from "..";
import { Move, Physicality, Dexterity, Constitution, Mind, Trait, EquipmentProperty } from "../../defs";
import { Moveable, Keyed, Physical } from "../../interfaces";

export class Elemental implements Moveable, Keyed {
  constructor(key: string) {
    this._key = key;
  }
  private _key: string;
  get Key(): string {
    return this._key;
  }
  IsCommander: boolean = false;
  MOV: Move = new Move();
  PHY: Physicality = new Physicality();
  DEX: Dexterity = new Dexterity();
  CON: Constitution = new Constitution();
  MND: Mind = new Mind();

  private _traits: Trait[] = [ Trait.Instinct() ];
  get Traits(): Trait[] { return this._traits; };
  private _weapons: Weapon[] = [];
  get Weapons(): Weapon[] { return this._weapons; }
  private _armour = Armour.None();
  get Armour(): Armour { return this._armour; }

  get PointsCost() : number {
    return 0;
  }

  AddTrait(trait: Trait) : Elemental {
    if (trait.Key === 'Instinct') {
      if (this._traits.find((t) => t.Key === 'Regular')) {
        this._traits = this._traits.filter((t) => t.Key !== 'Regular');
      }
    }
    if (trait.Key === 'Regular') {
      if (this._traits.find((t) => t.Key === 'Instinct')) {
        this._traits = this._traits.filter((t) => t.Key !== 'Instinct');
      }
    }
    this._traits.push(trait);
    trait.AddEffect(this);
    return this;
  }

  RemoveTrait(trait: Trait) : Elemental {
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

  AddWeapon(weapon: Weapon) : Elemental {
    this._weapons.push(weapon);
    return this;
  }
  RemoveWeapon(weapon: Weapon) : Elemental {
    const index = this._weapons.findIndex((e: Keyed) => weapon.Key === e.Key);
    this._weapons.splice(index, 1);
    return this;
  }

  AddArmour(armour: Armour) : Elemental {
    this._armour = armour;
    return this;
  }
  RemoveArmour  () : Elemental {
    this._armour = Armour.None();
    return this;
  }

  static AirElemental(): Elemental {
    const result = new Elemental('Air Elemental')
    .AddArmour(new Armour('Buffetting Wind', '+2 to armor checks', 2))
    .AddWeapon(new Weapon('Windy Assualt', 4, 1));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 3;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };
  
  static WaterElemental(): Elemental {
    const result = new Elemental('Water Elemental')
    .AddWeapon(new Weapon('Ice Shards', 2, 2).AddProperty(EquipmentProperty.Ranged()));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 3;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };

  static EarthElemental(): Elemental {
    const result = new Elemental('Earth Elemental')
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Slow())
    .AddWeapon(new Weapon('Rock Slam', 1, 6))
    .AddArmour(new Armour('Stone Armor', '+4 to armor checks', 5));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 2;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };
  
  static FireElemental(): Elemental {
    const result = new Elemental('Fire Elemental')
    .AddWeapon(new Weapon('Fire Brand', 2, 5));
    result.MOV.Value = 4;
    result.PHY.Value = 3;
    result.DEX.Value = 2;
    result.CON.Value = 2;
    result.MND.Value = 0;
    return result;
  };

  static ShadeAssassin(): Elemental {
    const result = new Elemental('Shade Assassin')
    .AddWeapon(Weapon.Dagger())
    .AddArmour(Armour.LightArmour());
    result.MOV.Value = 4;
    result.PHY.Value = 1;
    result.DEX.Value = 3;
    result.CON.Value = 1;
    result.MND.Value = 0;
    return result;
  };

  static Undead(): Elemental {
    const result = new Elemental('Undead')
    .AddWeapon(Weapon.Unarmed())
    .AddTrait(Trait.Slow());
    result.MOV.Value = 3;
    result.PHY.Value = 0;
    result.DEX.Value = 0;
    result.CON.Value = 1;
    result.MND.Value = 0;
    return result;
  };

  static Skeleton(weaponText: string): Elemental {
    const result = new Elemental('Skeleton')
    .AddTrait(Trait.Regular())
    .AddWeapon(new Weapon(weaponText, 1, 3));
    result.MOV.Value = 4;
    result.PHY.Value = 1;
    result.DEX.Value = 1;
    result.CON.Value = 1;
    result.MND.Value = 0;
    return result;
  }
};