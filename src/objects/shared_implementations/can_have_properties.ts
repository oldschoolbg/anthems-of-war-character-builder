import { EquipmentProperties, EquipmentProperty } from "../../defs";

export type PropertyType = 'WEAPON' | 'ARMOUR' | 'MOUNT' | 'MISC';

export abstract class CanHaveProperties {
  private _propertyType: PropertyType;
  public get PropertyType(): PropertyType {
    return this._propertyType
  }
  protected _properties: EquipmentProperty[] = [];
  get Properties(): EquipmentProperty[] { return this._properties; };

  get PropertiesString(): string {
    return this._properties
      .map(p => p.Key)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join(', ');
  }

  constructor(propertyType: PropertyType) {
    this._propertyType = propertyType;
  }

  AddProperty(key: EquipmentProperties, ...props: any[]): any {
    const equipmentProperty = EquipmentProperty.Options.find(o => o.Key === key);
    if (equipmentProperty === undefined ||
      (!equipmentProperty.MultipleAllowed && this._properties.find((p: EquipmentProperty) => p.Key === equipmentProperty.Key))) {
      return equipmentProperty;
    }
    if (!equipmentProperty.IsAllowed(this._propertyType)) {
      throw new Error(
        `Cannot add ${equipmentProperty.Key} to ${this._propertyType}`,
      );
    }
    if (equipmentProperty.Prerequisites.some((wp) => !this._properties.find((p: EquipmentProperty) => p.Key === wp))) {
      throw new Error(
        `Cannot add ${equipmentProperty.Key} as Equipment must already have ${equipmentProperty.Prerequisites.map(
          (p) => p,
        ).join(', ')}.`,
      );
    }
    const kryptonite = this._properties.filter(i => equipmentProperty.Kryptonite.includes(i.Key));
    if (kryptonite.length > 0) {
      for (let i = 0; i < kryptonite.length; i++) {
        this.RemoveProperty(kryptonite[i].Key);
      }
    }
    this._properties.push(equipmentProperty);
    return equipmentProperty;
  }

  RemoveProperty(key: EquipmentProperties, ...props: any[]): any {
    const equipmentProperty = EquipmentProperty.Options.find(o => o.Key === key);
    if (equipmentProperty !== undefined) {
      // TODO: is this a prerequisite for other properties? If so, remove those as well or warn? TBC
      const index = this._properties.findIndex((p: EquipmentProperty) => p.Key === equipmentProperty.Key);
      this._properties.splice(index, 1);
    }
    return equipmentProperty;
  }
}
