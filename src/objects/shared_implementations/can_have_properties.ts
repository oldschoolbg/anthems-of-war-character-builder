import { EquipmentProperty } from "../../defs";

export type PropertyType = 'WEAPON' | 'ARMOUR' | 'MOUNT' | 'MISC';

export abstract class CanHaveProperties {
  private _propertyType: PropertyType;
  public get PropertyType(): PropertyType {
    return this._propertyType
  }
  protected _properties: EquipmentProperty[] = [];
  get Properties(): EquipmentProperty[] { return this._properties; };

  constructor(propertyType: PropertyType) {
    this._propertyType = propertyType;
  }

  AddProperty(equipmentProperty: EquipmentProperty, ...props: any[]): any {
    if (!equipmentProperty.MultipleAllowed && this._properties.find((p: EquipmentProperty) => p.Key === equipmentProperty.Key)) {
      return this;
    }
    if (!equipmentProperty.IsAllowed(this._propertyType)) {
      throw new Error(
        `Cannot add ${equipmentProperty.Key} to ${this._propertyType}`,
      );
    }
    if (equipmentProperty.Prerequisites.some((wp) => !this._properties.find((p: EquipmentProperty) => p.Key === wp.Key))) {
      throw new Error(
        `Cannot add ${equipmentProperty.Key} as Equipment must already have ${equipmentProperty.Prerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`,
      );
    }
    const kryptonite = this._properties.filter(i => equipmentProperty.Kryptonite.includes(i.Key));
    if (kryptonite.length > 0) {
      throw new Error(
        `Cannot add ${equipmentProperty.Key} as Equipment already has ${equipmentProperty.Kryptonite.map(
          (p) => p,
        ).join(', ')}.`,
      );
    }
    this._properties.push(equipmentProperty);
    return this;
  }

  RemoveProperty(equipmentProperty: EquipmentProperty, ...props: any[]): any {
    // TODO: is this a prerequisite for other properties? If so, remove those as well or warn? TBC
    const index = this._properties.findIndex((p: EquipmentProperty) => p.Key === equipmentProperty.Key);
    this._properties.splice(index, 1);
    return this;
  }
}
