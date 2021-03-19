import { WeaponStat } from './weapons_stat';
import { CanAttack } from '../interfaces/can_attack';
import { Key, Keyed } from '../interfaces';
import { PropertyType } from '../objects/shared_implementations/can_have_properties';
import { Multiple } from '../interfaces/multiple';

export enum EquipmentProperties {
  Ranged = "Ranged",
  HighCrit =  "High Crit",
  TwoHanded = "Two Handed",
  Light = "Light",
  Reach = "Reach",
  DualWield = "Dual Wield",
  MoraleBoosting = "Morale Boosting",
  Versatile = "Versatile",
  LowAmmo = "Low Ammo",
  LowDurability = "Low Durability",
  SlowToLoad = "Slow To Load",
  OneHanded = "One Handed"
}

export class EquipmentProperty implements Keyed, Multiple {
  constructor(key: EquipmentProperties, points: number, description: string) {
    this._points = points;
    this._key = key;
    this._description = description;
  }

  static get Options(): EquipmentProperty[] {
    return [
      EquipmentProperty.Ranged(),
      EquipmentProperty.HighCrit(),
      EquipmentProperty.TwoHanded(),
      EquipmentProperty.Light(),
      EquipmentProperty.Reach(),
      EquipmentProperty.DualWield(),
      EquipmentProperty.MoraleBoosting(),
      EquipmentProperty.Versatile(),
      EquipmentProperty.LowAmmo(),
      EquipmentProperty.LowDurability(),
      EquipmentProperty.SlowToLoad(),
      EquipmentProperty.OneHanded()
    ];
  }
  private _points: number;
  get PointsCost(): number { return this._points; };
  private _key: EquipmentProperties;
  get Key(): EquipmentProperties { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _multipleAllowed: boolean = false;
  get MultipleAllowed(): boolean { return this._multipleAllowed; };
  private _quantity = 1;
  get Quantity(): number {
    return this._quantity;
  }
  private _allowedOn: PropertyType[] = [];
  private _addEffect: (weapon: CanAttack, property: EquipmentProperty, ...props: any[]) => void = (
    weapon: CanAttack,
    property: EquipmentProperty,
    ...props: any[]
  ) => {
    return;
  };
  get AddEffect() { return this._addEffect; }
  private _removeEffect: (weapon: CanAttack, property: EquipmentProperty, ...props: any[]) => void = (
    weapon: CanAttack,
    property: EquipmentProperty,
    ...props: any[]
  ) => {
    return;
  };
  get RemoveEffect() { return this._removeEffect; }
  private _prerequisites: Key[] = []
  // parent must have all these properties or you cannot add this property
  get Prerequisites(): Key[] { return this._prerequisites; } 
  private _kryptonite: Key[] = [];
  // parent cannot have both self and self.Kryptonite
  get Kryptonite(): Key[] { return this._kryptonite; }

  AddOne(): EquipmentProperty {
    this._quantity += 1;
    return this;
  }
  RemoveOne(): EquipmentProperty {
    if (this._quantity > 0) {
      this._quantity -= 1;
    }
    return this;
  }

  setAllowedOn(allowedOn: PropertyType): EquipmentProperty {
    if (!this.IsAllowed(allowedOn)) {
      this._allowedOn.push(allowedOn);
    }
    return this;
  }
  IsAllowed(allowedOn: PropertyType): boolean {
    return this._allowedOn.includes(allowedOn);
  }
  AllowMultiple(): EquipmentProperty {
    this._multipleAllowed = !this._multipleAllowed;
    return this;
  }
  setAddEffect(addEffect: (weapon: CanAttack, property: EquipmentProperty, ...props: any[]) => void): EquipmentProperty {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (weapon: CanAttack, property: EquipmentProperty, ...props: any[]) => void): EquipmentProperty {
    this._removeEffect = removeEffect;
    return this;
  }
  setPrerequisite(key: Key): EquipmentProperty {
    if (!this._prerequisites.find((p: Key) => p === key)) {
      this._prerequisites.push(key);
    }
    return this;
  }
  removePrerequisite(key: Key): EquipmentProperty {
    this._prerequisites = this._prerequisites.filter((p: Key) => p !== key);
    return this;
  }
  setKryptonite(key: Key): EquipmentProperty {
    if (!this._kryptonite.find((p: Key) => p === key)) {
      this._kryptonite.push(key);
    }
    return this;
  }
  removeKryptonite(key: Key): EquipmentProperty {
    this._kryptonite = this._kryptonite.filter((p: Key) => p !== key);
    return this;
  }
  AdjustPoints(by: number) {
    this._points += by;
  }

  static Ranged() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.Ranged,
      2,
      'Add three inches of range for each time this is applied to the weapon. Must be applied at least once to ranged weapons',
    )
    .setAllowedOn('WEAPON')
    .setAddEffect((weapon) => (weapon.AdjustRange(3)))
    .setRemoveEffect((weapon) => (weapon.AdjustRange(-3)))
    .setKryptonite(EquipmentProperties.LowDurability)
    .AllowMultiple();
  }
  static HighCrit() : EquipmentProperty {
    return new EquipmentProperty(EquipmentProperties.HighCrit, 2, 'Critical hits with this weapon roll two armor checks.')
    .setAllowedOn('WEAPON')
    .setAllowedOn('MOUNT');
  }
  static TwoHanded() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.TwoHanded,
      -2,
      'Melee weapons with this trait must be used in two hands. No other equipment may be used in the off hand.',
    )
    .setAllowedOn('WEAPON')
    .setKryptonite(EquipmentProperties.DualWield);
  }
  static Light() : EquipmentProperty {
    return new EquipmentProperty(EquipmentProperties.Light, 2, 'Can use either PHY or DEX to attack with this weapon')
    .setAllowedOn('WEAPON');
  }
  static Reach() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.Reach,
      4,
      'Can attack characters up to one inch away. Can reach over allies up to the max range. This can be added to a weapon multiple times.',
    )
    .setAllowedOn('WEAPON')
    .setAddEffect((weapon) => (weapon.AdjustRange(1)))
    .setRemoveEffect((weapon) => (weapon.AdjustRange(-1)))
    .AllowMultiple();
  }
  static DualWield() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.DualWield,
      3,
      'Add one to this weapon’s speed. Incompatible with the 2-handed property. When added to a weapon, this “doubles” the weapon. For example, a knife has a SPD of 3; a knife with Dual Wield will increase a character’s weapon SPD to 4, as well as occupy the character’s off-hand. This represents a character carrying one weapon in each hand and being trained to use them both at the same time. In addition to this, a character using dual wielded weapons can perform a defensive posture long action attack that reduces this weapon’s SPD by 1 but increases their armor against melee attacks by 1. This effect lasts until another order is spent on them or until they are knocked unconscious. Using a standard action while outside melee combat, this character can enter the same defensive state.',
    )
      .setAllowedOn('WEAPON')
      .setAddEffect((weapon) => (weapon.AdjustSpeed(1)))
      .setRemoveEffect((weapon) => (weapon.AdjustSpeed(-1)))
      .setKryptonite(EquipmentProperties.TwoHanded);
  }
  static MoraleBoosting() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.MoraleBoosting,
      3,
      'Adds 1 to any bravery checks performed within 3 inches. This can be added to weapons, armor or equipment. ',
    )
    .setAllowedOn('WEAPON')
    .setAllowedOn('ARMOUR')
    .setAllowedOn('MISC');
  }
  static Versatile() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.Versatile,
      2,
      'Ranged weapons with this property may use DEX instead of PHY when attacking and reacting in melee combat. This property only costs 1 point if the weapon also has the low ammo property.',
    )
      .setAllowedOn('WEAPON')
      .setAddEffect((weapon: CanAttack, weaponProperty: EquipmentProperty, selectedWeaponStat: WeaponStat[]) => {
        if (weapon.Properties.find((p: EquipmentProperty) => p.Key === EquipmentProperties.LowAmmo)) {
          weaponProperty.AdjustPoints(-1);
        }
      })
      .setRemoveEffect((weapon: CanAttack, weaponProperty: EquipmentProperty, selectedWeaponStat: WeaponStat[]) => {
        if (weapon.Properties.find((p: EquipmentProperty) => p.Key === EquipmentProperties.LowAmmo)) {
          weaponProperty.AdjustPoints(1);
        }
      })
      .setPrerequisite(EquipmentProperties.Ranged);
  }
  static LowAmmo() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.LowAmmo,
      0,
      'This character carries a limited quantity of ammunition for this weapon into battle. Melee attacks with low ammo ranged weapons do not use its ammo; it is assumed you keep hold of the weapon you attacked with.',
    )
      .setAllowedOn('WEAPON')
      .setPrerequisite(EquipmentProperties.Ranged)
      .setAddEffect((weapon: CanAttack, weaponProperty: EquipmentProperty, numberOfShots: 1 | 2 | 3 | 4) => {
        weaponProperty.AdjustPoints(numberOfShots - 5);
      })
      .setRemoveEffect((weapon: CanAttack, weaponProperty: EquipmentProperty, numberOfShots: 1 | 2 | 3 | 4) => {
        weaponProperty.AdjustPoints(-(numberOfShots - 5));
      });
  }
  static LowDurability() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.LowDurability,
      0,
      'When applied to melee weapons this represents an improvised, fragile, or poorly made item being used with each swing reducing its overall durability until it breaks.',
    )
      .setAllowedOn('WEAPON')
      .setKryptonite(EquipmentProperties.Ranged)
      .setAddEffect((weapon: CanAttack, weaponProperty: EquipmentProperty, numberOfShots: 1 | 2 | 3 | 4) => {
        weaponProperty.AdjustPoints(numberOfShots - 5);
      })
      .setRemoveEffect((weapon: CanAttack, weaponProperty: EquipmentProperty, numberOfShots: 1 | 2 | 3 | 4) => {
        weaponProperty.AdjustPoints(-(numberOfShots - 5));
      });
  }
  static SlowToLoad() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.SlowToLoad,
      -2,
      'Once fired the weapon is in an unloaded state. It must be loaded before being fired again. During an order the player can declare they are reloading. Move action speed is cut in half and you must subtract 2 from any dodge rolls performed in this order.',
    )
    .setAllowedOn('WEAPON')
    .setPrerequisite(EquipmentProperties.Ranged);
  }
  static OneHanded() : EquipmentProperty {
    return new EquipmentProperty(
      EquipmentProperties.OneHanded,
      5,
      'This ranged weapon can be used one handed, freeing up the other hand.',
    )
    .setAllowedOn('WEAPON')
    .setPrerequisite(EquipmentProperties.Ranged);
  }
} 
