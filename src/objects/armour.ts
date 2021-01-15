import { EquipmentProperty } from "../defs";
import { Keyed } from "../interfaces";
import { CanHaveProperties } from "./shared_implementations/can_have_properties";

export class Armour extends CanHaveProperties implements Keyed  {
  constructor(key: string, description: string, pointsCost: number) {
    super('ARMOUR');
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  private _key: string;
  get Key(): string { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }

  AddProperty(property: EquipmentProperty, ...props: any[]): Armour {
    super.AddProperty(property, props);
    return this;
  }

  RemoveProperty(property: EquipmentProperty, ...props: any[]): Armour {
    super.RemoveProperty(property, props);
    return this;
  }

  static None() : Armour {
    return new Armour('No Armour', '', 0);
  }
  static LightArmour() : Armour {
    return new Armour('Light Armour', '+2 to armor checks', 3);
  }
  static MediumArmour() : Armour {
    return new Armour('Medium Armour', '+4 to armor checks -1 to checks involving dex (including armor checks)', 5);
  }
  static HeavyArmour() : Armour {
    return new Armour('Heavy Armour', '+7 to armor checks -2 to checks involving dex (including armor checks)', 8);
  }
}
