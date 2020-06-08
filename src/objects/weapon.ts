import {
  WeaponProperty,
} from '../defs/weapon_property';
import { WeaponMatrix, WeaponStat } from '../defs/weapons_stat';

export class Weapon {
  constructor(jsonObject: any) {
    this._key = jsonObject.key;
    this._speed = jsonObject.speed;
    this._strength = jsonObject.strength;
    if (jsonObject.Properties) {
      this._properties = jsonObject.Properties;
    }
    const statCost = WeaponMatrix.find((wm: WeaponStat) => wm.Speed === this.Speed && wm.Strength === this.Strength);
    if (!statCost) {
      throw new Error(
        `Invalid Weapon ${this.Key} - Speed and Strength provided are not a valid combination: speed: ${this.Speed}. strength: ${this.Strength}`,
      );
    }
    this.BaseCost = statCost.PointsCost;
  }
  static create(key: string, speed: number, strength: number) : Weapon {
    return new  Weapon({
      key : key,
      speed : speed,
      strength : strength
    });
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
  PointsCost(): number {
    return this.BaseCost + this._properties.map((p: WeaponProperty) => p.Points).reduce((a, b) => a + b, 0);
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
    return Weapon.create('Unarmed', 3, 2);
  }
  static Knife() : Weapon {
    return Weapon.create('Knife', 3, 3);
  }
  static OneHandedHandSwordAxeSpear() : Weapon {
    return Weapon.create('1 Handed Sword / Axe / Spear', 2, 5);
  }
  static Staff(): Weapon {
    return Weapon.create('Staff', 2, 5);
  }
  static TwoHandedAxeHammerSword() : Weapon {
    return Weapon.create('2 Handed Axe / Hammer / Sword', 1, 7)
    .AddProperty(WeaponProperty.TwoHanded())
    .AddProperty(WeaponProperty.HighCrit());
  }
  static TwoHandedPolearm() : Weapon {
    return Weapon.create('Two Handed Polearm', 1, 7)
    .AddProperty(WeaponProperty.TwoHanded())
    .AddProperty(WeaponProperty.Reach());
  }
  static Longbow() : Weapon {
    return Weapon.create('Longbow', 1, 5)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged());
  }
  static Shortbow() : Weapon {
    return Weapon.create('Shortbow', 1, 5)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged());
  }
  static Crossbow() : Weapon {
    return Weapon.create('Crossbow', 1, 6)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.SlowToLoad());
  }
  static HandCrossbow() : Weapon {
    return Weapon.create('Crossbow', 1, 3)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded());
  }
  static Dagger() : Weapon {
    return Weapon.create('Dagger', 3, 3)
    .AddProperty(WeaponProperty.Light());
  }
  static Whip() : Weapon {
    return Weapon.create('Whip', 2, 2)
    .AddProperty(WeaponProperty.Light())
    .AddProperty(WeaponProperty.Reach());
  }
  static Javelin() : Weapon {
    return Weapon.create('Javelin', 1, 5)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded())
    .AddProperty(WeaponProperty.LowAmmo(), 3)
    .AddProperty(
      WeaponProperty.Melee(),
      WeaponMatrix.find((wp) => wp.Speed === 2 && wp.Strength === 4),
    );
  }
  static Sling() : Weapon {
    return Weapon.create('Sling', 1, 3)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded());
  }
  static ThrowingKnife() : Weapon {
    return Weapon.create('Throwing Knife', 1, 4)
    .AddProperty(WeaponProperty.Ranged())
    .AddProperty(WeaponProperty.OneHanded())
    .AddProperty(WeaponProperty.LowAmmo(), 4);
  }
  static Pike() : Weapon {
    return Weapon.create('Pike', 2, 5)
    .AddProperty(WeaponProperty.TwoHanded())
    .AddProperty(WeaponProperty.Reach());
  }
  static DoubleSword() : Weapon {
    return Weapon.create('Double Sword', 3, 5)
    .AddProperty(WeaponProperty.TwoHanded());
  }
  static WarBanner() : Weapon {
    return Weapon.create('War Banner', 2, 4)
    .AddProperty(WeaponProperty.MoraleBoosting());
  }
}
