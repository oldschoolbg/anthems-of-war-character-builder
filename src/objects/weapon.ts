import { WeaponMatrix, EquipmentProperty, WeaponStat } from '../defs';
import { CanAttack, Keyed } from '../interfaces';
import { CanHaveProperties } from './shared_implementations/can_have_properties';

export class Weapon extends CanHaveProperties implements CanAttack, Keyed {
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
    return this.BaseCost + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0);
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

  static Unarmed() : Weapon {
    return new Weapon('Unarmed', 3, 2);
  }
  static Knife() : Weapon {
    return new Weapon('Knife', 3, 3);
  }
  static OneHandededSword(): Weapon {
    return new Weapon('1 Handed Sword', 2, 5);
  }
  static OneHandedAxe() : Weapon {
    return new Weapon('1 Handed Axe', 2, 5);
  }
  static OneHandedSpear() : Weapon {
    return new Weapon('1 Handed Spear', 2, 5);
  }
  static Staff(): Weapon {
    return new Weapon('Staff', 2, 5);
  }
  static TwoHandedAxeHammerSword() : Weapon {
    return new Weapon('2 Handed Axe / Hammer / Sword', 1, 7)
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
    return new Weapon('Dagger', 3, 3)
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
    .AddProperty(
      EquipmentProperty.Melee(),
      WeaponMatrix.find((wp) => wp.Speed === 2 && wp.Strength === 4),
    );
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
