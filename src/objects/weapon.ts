import { WeaponMatrix, WeaponProperty, WeaponStat } from '../defs';
import { CanAttack } from '../interfaces';

export class Weapon implements CanAttack {
  constructor(key: string, speed: number, strength: number) {
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
  private _properties: WeaponProperty[] = [];
  get Properties(): WeaponProperty[] { return this._properties; };
  
  readonly BaseCost: number = 0;
  get PointsCost(): number {
    return this.BaseCost + this._properties.map((p: WeaponProperty) => p.PointsCost).reduce((a, b) => a + b, 0);
  }

  AdjustSpeed(by: number) {
    this._speed += by;
  }
  AdjustStrength(by: number) {
    this._strength += by;
  }

  AddProperty(weaponProperty: WeaponProperty, ...props: any[]): Weapon {
    if (!weaponProperty.MultipleAllowed && this._properties.find((p: WeaponProperty) => p.Key === weaponProperty.Key)) {
      return this;
    }
    if (weaponProperty.Prerequisites.some((wp) => !this._properties.find((p: WeaponProperty) => p.Key === wp.Key))) {
      throw new Error(
        `Cannot add ${weaponProperty.Key} as Weapon must already have ${weaponProperty.Prerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`,
      );
    }
    this._properties.push(weaponProperty);
    weaponProperty.AddEffect(this, weaponProperty, props);
    return this;
  }

  RemoveProperty(weaponProperty: WeaponProperty, ...props: any[]): Weapon {
    // TODO: is this a prerequisite for other properties? If so, remove those as well or warn? TBC
    const index = this._properties.findIndex((p: WeaponProperty) => p.Key === weaponProperty.Key);
    this._properties.splice(index, 1);
    weaponProperty.RemoveEffect(this, weaponProperty, props);
    return this;
  }

  static Unarmed() : Weapon {
    return new Weapon('Unarmed', 3, 2);
  }
  static Knife() : Weapon {
    return new Weapon('Knife', 3, 3);
  }
  static OneHandedHandSwordAxeSpear() : Weapon {
    return new Weapon('1 Handed Sword / Axe / Spear', 2, 5);
  }
  static Staff(): Weapon {
    return new Weapon('Staff', 2, 5);
  }
  static TwoHandedAxeHammerSword() : Weapon {
    return new Weapon('2 Handed Axe / Hammer / Sword', 1, 7)
    .AddProperty(WeaponProperty.TwoHanded())
    .AddProperty(WeaponProperty.HighCrit());
  }
  static TwoHandedPolearm() : Weapon {
    return new Weapon('Two Handed Polearm', 1, 7)
    .AddProperty(WeaponProperty.TwoHanded())
    .AddProperty(WeaponProperty.Reach());
  }
  static Longbow() : Weapon {
    return new Weapon('Longbow', 1, 5)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged());
  }
  static Shortbow() : Weapon {
    return new Weapon('Shortbow', 1, 5)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged());
  }
  static Crossbow() : Weapon {
    return new Weapon('Crossbow', 1, 6)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.SlowToLoad());
  }
  static HandCrossbow() : Weapon {
    return new Weapon('Crossbow', 1, 3)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded());
  }
  static Dagger() : Weapon {
    return new Weapon('Dagger', 3, 3)
    .AddProperty(WeaponProperty.Light());
  }
  static Whip() : Weapon {
    return new Weapon('Whip', 2, 2)
    .AddProperty(WeaponProperty.Light())
    .AddProperty(WeaponProperty.Reach());
  }
  static Javelin() : Weapon {
    return new Weapon('Javelin', 1, 5)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded())
    .AddProperty(WeaponProperty.LowAmmo(), 3)
    .AddProperty(
      WeaponProperty.Melee(),
      WeaponMatrix.find((wp) => wp.Speed === 2 && wp.Strength === 4),
    );
  }
  static Sling() : Weapon {
    return new Weapon('Sling', 1, 3)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded());
  }
  static ThrowingKnife() : Weapon {
    return new Weapon('Throwing Knife', 1, 4)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded())
    .AddProperty(WeaponProperty.LowAmmo(), 4);
  }
  static Pike() : Weapon {
    return new Weapon('Pike', 2, 5)
    .AddProperty(WeaponProperty.TwoHanded())
    .AddProperty(WeaponProperty.Reach());
  }
  static DoubleSword() : Weapon {
    return new Weapon('Double Sword', 3, 5)
    .AddProperty(WeaponProperty.TwoHanded());
  }
  static WarBanner() : Weapon {
    return new Weapon('War Banner', 2, 4)
    .AddProperty(WeaponProperty.MoraleBoosting());
  }
}
