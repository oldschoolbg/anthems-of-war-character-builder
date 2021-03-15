import { EquipmentProperty } from "../defs";
import { CanHaveMagicalCharges, Keyed, SpellCharge } from "../interfaces";
import { CanHaveProperties } from "./shared_implementations/can_have_properties";

export enum ArmourType {
  None = 'None',
  LightArmour = 'Light Armour',
  MediumArmour = 'Medium Armour',
  HeavyArmour = 'Heavy Armour'
}

export class Armour extends CanHaveProperties implements Keyed, CanHaveMagicalCharges  {
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
  get PointsCost(): number {
    return this._pointsCost
    + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0)
    + this._spellCharges.map((sc: SpellCharge) => sc.Spell.ChargeCost * sc.NumberOfCharges).reduce((a, b) => a + b, 0);
  }
  private _spellCharges: SpellCharge[] = [];
  get SpellCharges(): SpellCharge[] {
    return this._spellCharges;
  }

  AddProperty(property: EquipmentProperty, ...props: any[]): Armour {
    super.AddProperty(property, props);
    return this;
  }

  RemoveProperty(property: EquipmentProperty, ...props: any[]): Armour {
    super.RemoveProperty(property, props);
    return this;
  }
  AddSpellCharge(spellCharge: SpellCharge): Armour {
    const found = this._spellCharges.findIndex(sp => sp.Spell.Key === spellCharge.Spell.Key);
    if (found !== -1) {
      spellCharge.NumberOfCharges += this._spellCharges[found].NumberOfCharges;
      this._spellCharges[found] = spellCharge;
    } else {
      this._spellCharges.push(spellCharge);
    }
    return this;
  }

  static Get(armourType: ArmourType) : Armour {
    switch (armourType) {
      case ArmourType.None:
        return Armour.None();
      case ArmourType.LightArmour:
        return Armour.LightArmour();
      case ArmourType.MediumArmour:
        return Armour.MediumArmour();
      case ArmourType.HeavyArmour:
        return Armour.HeavyArmour();
      default:
        throw new Error(`This is an unsupported Armour Type: ${armourType}`);
    }
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
