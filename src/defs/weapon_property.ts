import { Weapon } from '../objects/weapon';
import { WeaponStat } from './weapons_stat';

export class WeaponProperty {
  constructor(key: string, points: number, description: string) {
    this._points = points;
    this._key = key;
    this._description = description;
  }
  private _points: number;
  get Points(): number { return this._points; };
  private _key: string;
  get Key(): string { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _multipleAllowed: boolean = false;
  get MultipleAllowed(): boolean { return this._multipleAllowed; };
  private _addEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void = (
    weapon: Weapon,
    property: WeaponProperty,
    ...props: any[]
  ) => {
    return;
  };
  get AddEffect() { return this._addEffect; }
  private _removeEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void = (
    weapon: Weapon,
    property: WeaponProperty,
    ...props: any[]
  ) => {
    return;
  };
  get RemoveEffect() { return this._removeEffect; }
  private _prerequisites: WeaponProperty[] = []
  // weapon must have all these properties or you cannot add this property
  get Prerequisites(): WeaponProperty[] { return this._prerequisites; } 
  private _kryptonite?: WeaponProperty
  // weapon must have only one of these properties
  get Kryptonite(): WeaponProperty | undefined { return this._kryptonite; }

  setMultiple(): WeaponProperty {
    this._multipleAllowed = !this._multipleAllowed;
    return this;
  }
  setAddEffect(addEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void): WeaponProperty {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void): WeaponProperty {
    this._removeEffect = removeEffect;
    return this;
  }
  setPrerequisite(prop: WeaponProperty): WeaponProperty {
    if (!this._prerequisites.find((p: WeaponProperty) => p.Key === prop.Key)) {
      this._prerequisites.push(prop);
    }
    return this;
  }
  removePrerequisite(prop: WeaponProperty): WeaponProperty {
    this._prerequisites = this._prerequisites.filter((p: WeaponProperty) => p.Key !== prop.Key);
    return this;
  }
  AdjustPoints(by: number) {
    this._points += by;
  }

  static Ranged() : WeaponProperty {
    return new WeaponProperty(
      'Ranged',
      2,
      '+3 inches range for each time this is applied to the weapon. Must be applied at least once to ranged weapons.',
    ).setMultiple();
  }
  static HighCrit() : WeaponProperty {
    return new WeaponProperty('High Crit', 2, 'Critical hits with this weapon roll two armor checks.');
  }
  static TwoHanded() : WeaponProperty {
    return new WeaponProperty(
      '2-handed',
      -2,
      'Melee weapons with this trait must be used in two hands. No other equipment may be used in the off hand.',
    );
  }
  static Light() : WeaponProperty {
    return new WeaponProperty('Light', 2, 'Can use either Physique or Dexterity to attack with this weapon');
  }
  static Reach() : WeaponProperty {
    return new WeaponProperty(
      'Reach',
      4,
      'Can attack characters up to 1 inch away. Can reach over allies up to the max range. This can be added to a weapon multiple times.',
    ).setMultiple();
  }
  static DualWield() : WeaponProperty {
    return new WeaponProperty(
      'Dual Wield',
      4,
      'Add +1 to the weapon speed. It is assumed you have two of this weapon or two weapons of a similar damage potential. Can not be used with the two-handed property and can not be used with something else in the off hand.',
    )
      .setAddEffect((weapon) => (weapon.AdjustSpeed(1)))
      .setRemoveEffect((weapon) => (weapon.AdjustSpeed(-1)));
  }
  static MoraleBoosting() : WeaponProperty {
    return new WeaponProperty(
      'Morale Boosting',
      3,
      'Adds +1 to any bravery checks performed within 3 inches. This can be added to weapons, armor or equipment. ',
    );
  }
  static LowAmmo() : WeaponProperty {
    return new WeaponProperty(
      'Low Ammo',
      0,
      'Only a limited number of attacks can be done with this weapon. This could either be because of the quality of the weapon or that you are carrying less into battle.',
    )
      .setAddEffect((weapon: Weapon, weaponProperty: WeaponProperty, numberOfShots: 1 | 2 | 3 | 4) => {
        weaponProperty.AdjustPoints(numberOfShots - 5);
      })
      .setRemoveEffect((weapon: Weapon, weaponProperty: WeaponProperty, numberOfShots: 1 | 2 | 3 | 4) => {
        weaponProperty.AdjustPoints(-(numberOfShots - 5));
      });
  }
  static Melee() : WeaponProperty {
    return new WeaponProperty(
      'Melee',
      0,
      'This ranged weapon has some melee capability. Add the melee cost for the strength and speed to the weapon cost -1. This costs 2 points less if the weapon has the low ammo property.',
    )
      .setAddEffect((weapon, weaponProperty: WeaponProperty, selectedWeaponStat: WeaponStat[]) => {
        if (!selectedWeaponStat || selectedWeaponStat.length === 0) {
          throw new Error('No Weapon Stat provided');
        }
        let points = selectedWeaponStat[0].PointsCost - 1;
        if (weapon.Properties.find((p: WeaponProperty) => p.Key === 'Low Ammo')) {
          points = points - 2;
        }
        weaponProperty.AdjustPoints(weaponProperty.Points + points);
      })
      .setRemoveEffect((weapon, weaponProperty: WeaponProperty, selectedWeaponStat: WeaponStat[]) => {
        if (!selectedWeaponStat || selectedWeaponStat.length === 0) {
          throw new Error('No Weapon Stat provided');
        }
        let points = selectedWeaponStat[0].PointsCost - 1;
        if (weapon.Properties.find((p: WeaponProperty) => p.Key === 'Low Ammo')) {
          points = points - 2;
        }
        weaponProperty.AdjustPoints(-points);
      })
      .setPrerequisite(WeaponProperty.Ranged());
  }
  static SlowToLoad() : WeaponProperty {
    return new WeaponProperty(
      'Slow to Load',
      -2,
      'Once fired the weapon is in an unloaded state. It must be loaded before being fired again. During an order the player can declare they are reloading. Move action speed is cut in half and dodge rolls made during this order take a -2 penalty to the dice roll.',
    ).setPrerequisite(WeaponProperty.Ranged());
  }
  static OneHanded() : WeaponProperty {
    return new WeaponProperty(
      '1-handed',
      5,
      'This ranged weapon can be used one handed, freeing up the other hand.',
    ).setPrerequisite(WeaponProperty.Ranged());
  }
} 
