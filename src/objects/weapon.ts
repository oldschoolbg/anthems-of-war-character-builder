import { WeaponMatrix, EquipmentProperty, WeaponStat } from '../defs';
import { CanAttack, CanHaveMagicalCharges, Keyed, SpellCharge } from '../interfaces';
import { CanHaveProperties } from './shared_implementations/can_have_properties';

export enum Weapons {
  Unarmed = 'Unarmed',
  Knife = 'Knife',
  OneHandedSword = 'One Handed Sword',
  OneHandedAxe = 'One Handed Axe',
  OneHandedSpear = 'One Handed Spear',
  Staff = 'Staff',
  TwoHandedAxe = 'Two Handed Axe',
  TwoHandedHammer = 'Two Handed Hammer',
  TwoHandedSword = 'Two Handed Sword',
  TwoHandedPolearm = 'TwoHanded Polearm',
  Longbow = 'Longbow',
  Shortbow = 'Shortbow',
  Crossbow = 'Crossbow',
  HandCrossbow = 'Hand Crossbow',
  Dagger = 'Dagger',
  DualWeildDaggers = 'Dual Weild Daggers',
  Whip = 'Whip',
  Javelin = 'Javelin',
  Sling = 'Sling',
  ThrowingKnife = 'Throwing Knife',
  Pike = 'Pike',
  DoubleSword = 'Double Sword',
  WarBanner = 'War Banner'
}

export class Weapon extends CanHaveProperties implements CanAttack, Keyed, CanHaveMagicalCharges {
  constructor(key: string, speed: number, strength: number) {
    super('WEAPON');
    this._key = key;
    this._speed = speed;
    this._strength = strength;
    const statCost = WeaponMatrix.find((wm: WeaponStat) => wm.Speed === this.Speed && wm.Strength === this.Strength);
    if (!statCost) {
      throw new Error(
        `Invalid Weapon ${this.Key} - Speed and Strength provided are not a valid combination: speed: ${this.Speed}. strength: ${this.Strength}`,
      );
    }
    this.BaseCost = statCost.PointsCost;
  }
  private _key: string;
  get Key(): string { return this._key; };
  private _speed: number;
  get Speed(): number { return this._speed; };
  private _strength: number;
  get Strength(): number { return this._strength; };
  
  readonly BaseCost: number = 0;
  get PointsCost(): number {
    return this.BaseCost
    + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0)
    + this._spellCharges.map((sc: SpellCharge) => sc.Spell.ChargeCost * sc.NumberOfCharges).reduce((a, b) => a + b, 0);
  }
  private _spellCharges: Array<SpellCharge> = [];
  get SpellCharges(): Array<SpellCharge> {
    return this._spellCharges;
  }

  AdjustSpeed(by: number) {
    this._speed += by;
  }
  AdjustStrength(by: number) {
    this._strength += by;
  }

  AddProperty(weaponProperty: EquipmentProperty, ...props: any[]): Weapon {
    super.AddProperty(weaponProperty, props);
    weaponProperty.AddEffect(this, weaponProperty, props);
    return this;
  }

  RemoveProperty(weaponProperty: EquipmentProperty, ...props: any[]): Weapon {
    super.RemoveProperty(weaponProperty, props)
    weaponProperty.RemoveEffect(this, weaponProperty, props);
    return this;
  }
  AddSpellCharge(spellCharge: SpellCharge): Weapon {
    const found = this._spellCharges.findIndex(sp => sp.Spell.Key === spellCharge.Spell.Key);
    if (found !== -1) {
      spellCharge.NumberOfCharges += this._spellCharges[found].NumberOfCharges;
      this._spellCharges[found] = spellCharge;
    } else {
      this._spellCharges.push(spellCharge);
    }
    return this;
  }

  static Get(weapon: Weapons): Weapon {
    switch (weapon) {
      case Weapons.Crossbow:
        return Weapon.Crossbow();
      case Weapons.Dagger:
        return Weapon.Dagger();
      case Weapons.DoubleSword:
        return Weapon.DoubleSword();
      case Weapons.DualWeildDaggers:
        return Weapon.DualWeildDaggers();
      case Weapons.HandCrossbow:
        return Weapon.HandCrossbow();
      case Weapons.Javelin:
        return Weapon.Javelin();
      case Weapons.Knife:
        return Weapon.Knife();
      case Weapons.Longbow:
        return Weapon.Longbow();
      case Weapons.OneHandedAxe:
        return Weapon.OneHandedAxe();
      case Weapons.OneHandedSpear:
        return Weapon.OneHandedSpear();
      case Weapons.OneHandedSword:
        return Weapon.OneHandedSword();
      case Weapons.Pike:
        return Weapon.Pike();
      case Weapons.Shortbow:
        return Weapon.Shortbow();
      case Weapons.Sling:
        return Weapon.Sling();
      case Weapons.Staff:
        return Weapon.Staff();
      case Weapons.ThrowingKnife:
        return Weapon.ThrowingKnife();
      case Weapons.TwoHandedAxe:
        return Weapon.TwoHandedAxe();
      case Weapons.TwoHandedHammer:
        return Weapon.TwoHandedHammer();
      case Weapons.TwoHandedPolearm:
        return Weapon.TwoHandedPolearm();
      case Weapons.TwoHandedSword:
        return Weapon.TwoHandedSword();
      case Weapons.Unarmed:
        return Weapon.Unarmed();
      case Weapons.WarBanner:
        return Weapon.WarBanner();
      case Weapons.Whip:;
      return Weapon.Whip();
      default:
        throw new Error(`This is an unsupported Weapon: ${weapon}`);
    }
  }

  static Unarmed() : Weapon {
    return new Weapon('Unarmed', 3, 2);
  }
  static Knife() : Weapon {
    return new Weapon('Knife', 3, 3);
  }
  static OneHandedSword(): Weapon {
    return new Weapon('One Handed Sword', 2, 5);
  }
  static OneHandedAxe() : Weapon {
    return new Weapon('One Handed Axe', 2, 5);
  }
  static OneHandedSpear() : Weapon {
    return new Weapon('One Handed Spear', 2, 5);
  }
  static Staff(): Weapon {
    return new Weapon('Staff', 2, 5);
  }
  static TwoHandedAxe() : Weapon {
    return new Weapon('Two Handed Axe', 1, 7)
    .AddProperty(EquipmentProperty.TwoHanded())
    .AddProperty(EquipmentProperty.HighCrit());
  }
  static TwoHandedHammer() : Weapon {
    return new Weapon('Two Handed Hammer', 1, 7)
    .AddProperty(EquipmentProperty.TwoHanded())
    .AddProperty(EquipmentProperty.HighCrit());
  }
  static TwoHandedSword() : Weapon {
    return new Weapon('Two Handed Sword', 1, 7)
    .AddProperty(EquipmentProperty.TwoHanded())
    .AddProperty(EquipmentProperty.HighCrit());
  }
  static TwoHandedPolearm() : Weapon {
    return new Weapon('Two Handed Polearm', 1, 7)
    .AddProperty(EquipmentProperty.TwoHanded())
    .AddProperty(EquipmentProperty.Reach());
  }
  static Longbow() : Weapon {
    return new Weapon('Longbow', 1, 5)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.Ranged());
  }
  static Shortbow() : Weapon {
    return new Weapon('Shortbow', 1, 5)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.Ranged());
  }
  static Crossbow() : Weapon {
    return new Weapon('Crossbow', 1, 6)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.SlowToLoad());
  }
  static HandCrossbow() : Weapon {
    return new Weapon('Crossbow', 1, 3)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.OneHanded());
  }
  static Dagger() : Weapon {
    return new Weapon('Dagger', 3, 3)
    .AddProperty(EquipmentProperty.Light());
  }
  static DualWeildDaggers() : Weapon {
    return new Weapon('Dual Weild Daggers', 3, 3)
    .AddProperty(EquipmentProperty.Light())
    .AddProperty(EquipmentProperty.DualWield());
  }
  static Whip() : Weapon {
    return new Weapon('Whip', 2, 2)
    .AddProperty(EquipmentProperty.Light())
    .AddProperty(EquipmentProperty.Reach());
  }
  static Javelin() : Weapon {
    return new Weapon('Javelin', 1, 5)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.OneHanded())
    .AddProperty(EquipmentProperty.LowAmmo(), 3)
    .AddProperty(EquipmentProperty.Versatile());
  }
  static Sling() : Weapon {
    return new Weapon('Sling', 1, 3)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.OneHanded());
  }
  static ThrowingKnife() : Weapon {
    return new Weapon('Throwing Knife', 1, 4)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.OneHanded())
    .AddProperty(EquipmentProperty.LowAmmo(), 4);
  }
  static Pike() : Weapon {
    return new Weapon('Pike', 2, 5)
    .AddProperty(EquipmentProperty.TwoHanded())
    .AddProperty(EquipmentProperty.Reach());
  }
  static DoubleSword() : Weapon {
    return new Weapon('Double Sword', 3, 5)
    .AddProperty(EquipmentProperty.TwoHanded());
  }
  static WarBanner() : Weapon {
    return new Weapon('War Banner', 2, 4)
    .AddProperty(EquipmentProperty.MoraleBoosting());
  }
}
