import { WeaponMatrix, EquipmentProperty, WeaponStat, EquipmentProperties } from '../defs';
import { CanAttack, CanHaveMagicalCharges, HasRange, Keyed, Multiple, SpellCharge } from '../interfaces';
import { CanHaveProperties } from './shared_implementations/can_have_properties';

export enum Weapons {
  Unarmed = 'Unarmed',
  Knife = 'Knife',
  OneHandedSword = 'One Handed Sword',
  OneHandedAxe = 'One Handed Axe',
  OneHandedSpear = 'One Handed Spear',
  OneHandedMace = 'One Handed Mace',
  Staff = 'Staff',
  TwoHandedAxe = 'Two Handed Axe',
  TwoHandedHammer = 'Two Handed Hammer',
  TwoHandedSword = 'Two Handed Sword',
  TwoHandedPolearm = 'Two Handed Polearm',
  Longbow = 'Longbow',
  Shortbow = 'Shortbow',
  Crossbow = 'Crossbow',
  HandCrossbow = 'Hand Crossbow',
  Dagger = 'Dagger',
  DualWieldDaggers = 'Dual Wield Daggers',
  Whip = 'Whip',
  Javelin = 'Javelin',
  Sling = 'Sling',
  ThrowingKnife = 'Throwing Knife',
  Pike = 'Pike',
  DoubleSword = 'Double Sword',
  WarBanner = 'War Banner'
}

export class Weapon extends CanHaveProperties implements CanAttack, HasRange, Keyed, CanHaveMagicalCharges, Multiple {
  constructor(key: Weapons | string, speed: number, strength: number) {
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

  static get Options(): Weapon[] {
    return [
        Weapon.Crossbow(),
        Weapon.Dagger(),
        Weapon.DoubleSword(),
        Weapon.DualWieldDaggers(),
        Weapon.HandCrossbow(),
        Weapon.Javelin(),
        Weapon.Knife(),
        Weapon.Longbow(),
        Weapon.OneHandedAxe(),
        Weapon.OneHandedSpear(),
        Weapon.OneHandedSword(),
        Weapon.OneHandedMace(),
        Weapon.Pike(),
        Weapon.Shortbow(),
        Weapon.Sling(),
        Weapon.Staff(),
        Weapon.ThrowingKnife(),
        Weapon.TwoHandedAxe(),
        Weapon.TwoHandedHammer(),
        Weapon.TwoHandedPolearm(),
        Weapon.TwoHandedSword(),
        Weapon.Unarmed(),
        Weapon.WarBanner(),
        Weapon.Whip()
    ]
  }

  private _key: Weapons | string;
  get Key(): Weapons | string { return this._key; };
  private _speed: number;
  get Speed(): number { return this._speed; };
  private _strength: number;
  get Strength(): number { return this._strength; };
  private _range = 1;
  get Range(): string {
    const ranged = this.Properties.find(p => p.Key === EquipmentProperties.Ranged);
    if (ranged !== undefined) {
      return `${this._range - 1}"`;
    }
    const reach = this.Properties.find(p => p.Key === EquipmentProperties.Reach);
    if (reach !== undefined) {
      return `Melee (${this._range}")`;
    }
    return `${this._range}"`;
  }
  get MultipleAllowed(): boolean { return true; };
  private _quantity = 1;
  get Quantity(): number {
    return this._quantity;
  }
  
  readonly BaseCost: number = 0;
  get PointsCost(): number {
    return (
      this.BaseCost
      + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0)
      + this._spellCharges.map((sc: SpellCharge) => sc.Spell.ChargeCost * sc.NumberOfCharges).reduce((a, b) => a + b, 0)
    ) * this._quantity;
  }
  private _spellCharges: SpellCharge[] = [];
  get SpellCharges(): SpellCharge[] {
    return this._spellCharges;
  }

  AddOne(): Weapon {
    this._quantity += 1;
    return this;
  }
  RemoveOne(): Weapon {
    if (this._quantity > 0) {
      this._quantity -= 1;
    }
    return this;
  }

  AdjustSpeed(by: number) {
    this._speed += by;
  }
  AdjustStrength(by: number) {
    this._strength += by;
  }
  AdjustRange(by: number) {
    this._range += by;
  }
  
  AllowMultiple(): Weapon {
    throw new Error("Multiple is always allowed for Weapons");
  }

  AddProperty(key: EquipmentProperties, ...props: any[]): Weapon {
    const property = super.AddProperty(key, props);
    if (property !== undefined) {
      property.AddEffect(this, property, props);
    }
    return this;
  }

  RemoveProperty(key: EquipmentProperties, ...props: any[]): Weapon {
    const property = super.RemoveProperty(key, props)
    if (property !== undefined) {
      property.RemoveEffect(this, property, props);
    }
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

  static Unarmed() : Weapon {
    return new Weapon(Weapons.Unarmed, 3, 2);
  }
  static Knife() : Weapon {
    return new Weapon(Weapons.Knife, 3, 3);
  }
  static OneHandedSword(): Weapon {
    return new Weapon(Weapons.OneHandedSword, 2, 5);
  }
  static OneHandedAxe() : Weapon {
    return new Weapon(Weapons.OneHandedAxe, 2, 5);
  }
  static OneHandedSpear() : Weapon {
    return new Weapon(Weapons.OneHandedSpear, 2, 5);
  }
  static OneHandedMace() : Weapon {
    return new Weapon(Weapons.OneHandedMace, 2, 5);
  }
  static Staff(): Weapon {
    return new Weapon(Weapons.Staff, 2, 5);
  }
  static TwoHandedAxe() : Weapon {
    return new Weapon(Weapons.TwoHandedAxe, 1, 7)
    .AddProperty(EquipmentProperties.TwoHanded)
    .AddProperty(EquipmentProperties.HighCrit);
  }
  static TwoHandedHammer() : Weapon {
    return new Weapon(Weapons.TwoHandedHammer, 1, 7)
    .AddProperty(EquipmentProperties.TwoHanded)
    .AddProperty(EquipmentProperties.HighCrit);
  }
  static TwoHandedSword() : Weapon {
    return new Weapon(Weapons.TwoHandedSword, 1, 7)
    .AddProperty(EquipmentProperties.TwoHanded)
    .AddProperty(EquipmentProperties.HighCrit);
  }
  static TwoHandedPolearm() : Weapon {
    return new Weapon(Weapons.TwoHandedPolearm, 1, 7)
    .AddProperty(EquipmentProperties.TwoHanded)
    .AddProperty(EquipmentProperties.Reach);
  }
  static Longbow() : Weapon {
    return new Weapon(Weapons.Longbow, 1, 5)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.Ranged);
  }
  static Shortbow() : Weapon {
    return new Weapon(Weapons.Shortbow, 1, 5)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.Ranged);
  }
  static Crossbow() : Weapon {
    return new Weapon(Weapons.Crossbow, 1, 6)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.SlowToLoad);
  }
  static HandCrossbow() : Weapon {
    return new Weapon(Weapons.HandCrossbow, 1, 3)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.OneHanded);
  }
  static Dagger() : Weapon {
    return new Weapon(Weapons.Dagger, 3, 3)
    .AddProperty(EquipmentProperties.Light);
  }
  static DualWieldDaggers() : Weapon {
    return new Weapon(Weapons.DualWieldDaggers, 3, 3)
    .AddProperty(EquipmentProperties.Light)
    .AddProperty(EquipmentProperties.DualWield);
  }
  static Whip() : Weapon {
    return new Weapon(Weapons.Whip, 2, 2)
    .AddProperty(EquipmentProperties.Light)
    .AddProperty(EquipmentProperties.Reach);
  }
  static Javelin() : Weapon {
    return new Weapon(Weapons.Javelin, 1, 5)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.OneHanded)
    .AddProperty(EquipmentProperties.LowAmmo, 3)
    .AddProperty(EquipmentProperties.Versatile);
  }
  static Sling() : Weapon {
    return new Weapon(Weapons.Sling, 1, 3)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.OneHanded);
  }
  static ThrowingKnife() : Weapon {
    return new Weapon(Weapons.ThrowingKnife, 1, 4)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.OneHanded)
    .AddProperty(EquipmentProperties.LowAmmo, 4);
  }
  static Pike() : Weapon {
    return new Weapon(Weapons.Pike, 2, 5)
    .AddProperty(EquipmentProperties.TwoHanded)
    .AddProperty(EquipmentProperties.Reach);
  }
  static DoubleSword() : Weapon {
    return new Weapon(Weapons.DoubleSword, 3, 5)
    .AddProperty(EquipmentProperties.TwoHanded);
  }
  static WarBanner() : Weapon {
    return new Weapon(Weapons.WarBanner, 2, 4)
    .AddProperty(EquipmentProperties.MoraleBoosting);
  }
}
