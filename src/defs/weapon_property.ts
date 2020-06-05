import { Weapon } from '../objects/weapon';
import { WeaponStat } from './weapons_stat';

export class WeaponProperty {
  constructor(key: string, points: number, description: string) {
    this.Points = points;
    this.Key = key;
    this.Description = description;
  }
  Points: number;
  Key: string;
  Description: string;
  MultipleAllowed: boolean = false;
  AddEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void = (
    weapon: Weapon,
    property: WeaponProperty,
    ...props: any[]
  ) => {
    return;
  };
  RemoveEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void = (
    weapon: Weapon,
    property: WeaponProperty,
    ...props: any[]
  ) => {
    return;
  };
  Prerequisites: WeaponProperty[] = []; // weapon must have all these properties or you cannot add this property
  Kryptonite?: WeaponProperty; // weapon must have only one of these properties

  setMultiple(): WeaponProperty {
    this.MultipleAllowed = !this.MultipleAllowed;
    return this;
  }
  setAddEffect(addEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void): WeaponProperty {
    this.AddEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (weapon: Weapon, property: WeaponProperty, ...props: any[]) => void): WeaponProperty {
    this.RemoveEffect = removeEffect;
    return this;
  }
  setPrerequisite(prop: WeaponProperty) : WeaponProperty {
    if (!this.Prerequisites.find((p: WeaponProperty) => p.Key === prop.Key)) {
      this.Prerequisites.push(prop);
    }
    return this;
  }
  removePrerequisite(prop: WeaponProperty) : WeaponProperty {
    this.Prerequisites = this.Prerequisites.filter((p: WeaponProperty) => p.Key !== prop.Key);
    return this;
  }
}

export const Ranged = new WeaponProperty(
  'Ranged',
  2,
  '+3 inches range for each time this is applied to the weapon. Must be applied at least once to ranged weapons.',
).setMultiple();
export const HighCrit = new WeaponProperty('High Crit', 2, 'Critical hits with this weapon roll two armor checks.');
export const TwoHanded = new WeaponProperty(
  '2-handed',
  -2,
  'Melee weapons with this trait must be used in two hands. No other equipment may be used in the off hand.',
);
export const Light = new WeaponProperty('Light', 2, 'Can use either Physique or Dexterity to attack with this weapon');
export const Reach = new WeaponProperty(
  'Reach',
  4,
  'Can attack characters up to 1 inch away. Can reach over allies up to the max range. This can be added to a weapon multiple times.',
).setMultiple();
export const DualWield = new WeaponProperty(
  'Dual Wield',
  4,
  'Add +1 to the weapon speed. It is assumed you have two of this weapon or two weapons of a similar damage potential. Can not be used with the two-handed property and can not be used with something else in the off hand.',
)
  .setAddEffect((weapon) => (weapon.Speed = weapon.Speed + 1))
  .setRemoveEffect((weapon) => (weapon.Speed = weapon.Speed - 1));
export const MoraleBoosting = new WeaponProperty(
  'Morale Boosting',
  3,
  'Adds +1 to any bravery checks performed within 3 inches. This can be added to weapons, armor or equipment. ',
);
export const LowAmmo = new WeaponProperty(
  'Low Ammo (1 shots)',
  0,
  'Only a limited number of attacks can be done with this weapon. This could either be because of the quality of the weapon or that you are carrying less into battle.',
)
  .setAddEffect((weapon: Weapon, weapon_property: WeaponProperty, number_of_shots: 1 | 2 | 3 | 4) => {
    weapon_property.Points += number_of_shots - 5;
  })
  .setRemoveEffect((weapon: Weapon, weapon_property: WeaponProperty, number_of_shots: 1 | 2 | 3 | 4) => {
    weapon_property.Points -= number_of_shots - 5;
  });
export const Melee = new WeaponProperty(
  'Melee',
  0,
  'This ranged weapon has some melee capability. Add the melee cost for the strength and speed to the weapon cost -1. This costs 2 points less if the weapon has the low ammo property.',
)
  .setAddEffect((weapon, weapon_property: WeaponProperty, selected_weapon_stat: WeaponStat) => {
    let points = selected_weapon_stat.points_cost - 1;
    if (weapon.Properties.find((p: WeaponProperty) => p.Key === 'Low Ammo')) {
      points = points - 2;
    }
    weapon_property.Points += points;
  })
  .setRemoveEffect((weapon, weapon_property: WeaponProperty, selected_weapon_stat: WeaponStat) => {
    let points = selected_weapon_stat.points_cost - 1;
    if (weapon.Properties.find((p: WeaponProperty) => p.Key === 'Low Ammo')) {
      points = points - 2;
    }
    weapon_property.Points -= points;
  })
  .setPrerequisite(Ranged);
export const SlowToLoad = new WeaponProperty(
  'Slow to Load',
  -2,
  'Once fired the weapon is in an unloaded state. It must be loaded before being fired again. During an order the player can declare they are reloading. Move action speed is cut in half and dodge rolls made during this order take a -2 penalty to the dice roll.',
)
.setPrerequisite(Ranged);
export const OneHanded = new WeaponProperty(
  '1-handed',
  5,
  'This ranged weapon can be used one handed, freeing up the other hand.',
)
.setPrerequisite(Ranged);
