import { 
  Move,
  Trait,
  WeaponStat, 
  WeaponMatrix,
  EquipmentProperty
} from '../defs';
import { Moveable, CanAttack, Keyed } from '../interfaces';

export class Mount implements Moveable, CanAttack, Keyed {
  constructor (key: string, speed: number, strength: number) {
    this._key = key;
    this._speed = speed;
    this._strength = strength;
    this._mov = new Move();
    const statCost = WeaponMatrix.find((wm: WeaponStat) => wm.Speed === this._speed && wm.Strength === this._strength);
    if (!statCost) {
      throw new Error(
        `Invalid Mount Attack ${this.Key} - Speed and Strength provided are not a valid combination: speed: ${this.Speed}. strength: ${this.Strength}`,
      );
    }
    const statNormalisedCost = statCost.PointsCost < 0 ? 0 : statCost.PointsCost;
    this.BaseCost = statNormalisedCost + this.MOV.PointsCost + 2;
  }
  private _mov: Move;
  get MOV(): Move { return this._mov; }
  private _key: string;
  get Key(): string { return this._key; }
  private _speed: number;
  get Speed(): number { return this._speed; };
  private _strength: number;
  get Strength(): number { return this._strength; };

  readonly BaseCost: number = 2;
  get PointsCost(): number {
    return this.BaseCost
    + this._traits.map((p: Trait) => p.PointsCost).reduce((a, b) => a + b, 0)
    + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0);
  }
  private _traits: Trait[] = [Trait.Large()];
  get Traits(): Trait[] { return this._traits; }
  private _properties: EquipmentProperty[] = [];
  get Properties() : EquipmentProperty[] { return this._properties; }

  AdjustSpeed(by: number) {
    this._speed += by;
  }
  AdjustStrength(by: number) {
    this._strength += by;
  }

  AddTrait(trait: Trait) : Mount {
    if (trait.Key === 'Instinct' || trait.Key === 'Regular') {
      throw new Error(`cannot add ${trait.Key} to a Mount`)
    }
    if (trait.Key === 'Huge') {
      this._traits = this._traits.filter((t) => t.Key !== 'Large');
    }
    this._traits.push(trait);
    trait.AddEffect(this);
    return this;
  }

  RemoveTrait(trait: Trait) : Mount {
    if (trait.Key === 'Huge') {
      this._traits.push(Trait.Large());
    }
    if (trait.Key === 'Large') {
      throw new Error('Cannot remove Large from a mount');
    }
    this._traits = this._traits.filter((t) => t.Key !== trait.Key);
    trait.RemoveEffect(this);
    return this;
  }
  
  AddProperty(weaponProperty: EquipmentProperty, ...props: any[]): Mount {
    if (weaponProperty.Key === 'Ranged') {
      throw new Error('Cannot add Ranged to a Mount');
    }
    if (!weaponProperty.MultipleAllowed && this._properties.find((p: EquipmentProperty) => p.Key === weaponProperty.Key)) {
      return this;
    }
    if (weaponProperty.Prerequisites.some((wp) => !this._properties.find((p: EquipmentProperty) => p.Key === wp.Key))) {
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

  RemoveProperty(weaponProperty: EquipmentProperty, ...props: any[]): Mount {
    // TODO: is this a prerequisite for other properties? If so, remove those as well or warn? TBC
    const index = this._properties.findIndex((p: EquipmentProperty) => p.Key === weaponProperty.Key);
    this._properties.splice(index, 1);
    weaponProperty.RemoveEffect(this, weaponProperty, props);
    return this;
  }

  static Horse() : Mount {
    return new Mount('Horse', 2, 4)
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast())
    .AddTrait(Trait.Fast());
  }
  static Wolf() : Mount {
    return new Mount('Wolf', 2, 5)
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast());
  }
  static Griffin() : Mount {
    return new Mount('Griffin', 2, 4)
    .AddTrait(Trait.Flying())
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast())
  }
  static Bear() : Mount {
    return new Mount('Bear', 1, 7)
    .AddProperty(EquipmentProperty.HighCrit());
  }
  static Drake() : Mount {
    return new Mount('Drake', 3, 3)
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast())
  }
}
