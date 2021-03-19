import { EquipmentProperties, EquipmentProperty } from "../defs";
import { CanHaveMagicalCharges, Key, Keyed, SpellCharge } from "../interfaces";
import { CanHaveProperties } from "./shared_implementations/can_have_properties";

export enum ArmourType {
  None = 'No Armour',
  LightArmour = 'Light Armour',
  MediumArmour = 'Medium Armour',
  HeavyArmour = 'Heavy Armour'
}

export class Armour extends CanHaveProperties implements Keyed, CanHaveMagicalCharges  {
  constructor(key: ArmourType | string, description: string, pointsCost: number) {
    super('ARMOUR');
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  static get Options(): Armour[] {
    return [
      Armour.None(),
      Armour.LightArmour(),
      Armour.MediumArmour(),
      Armour.HeavyArmour()
    ]
  }

  private _key: ArmourType | string;
  get Key(): ArmourType | string { return this._key; }
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

  AddProperty(key: EquipmentProperties, ...props: any[]): Armour {
    super.AddProperty(key, props);
    return this;
  }

  RemoveProperty(key: EquipmentProperties, ...props: any[]): Armour {
    super.RemoveProperty(key, props);
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

  static None() : Armour {
    return new Armour(ArmourType.None, '', 0);
  }
  static LightArmour() : Armour {
    return new Armour(ArmourType.LightArmour, '+2 to armor checks', 3);
  }
  static MediumArmour() : Armour {
    return new Armour(ArmourType.MediumArmour, '+4 to armor checks -1 to checks involving dex (including armor checks)', 5);
  }
  static HeavyArmour() : Armour {
    return new Armour(ArmourType.HeavyArmour, '+7 to armor checks -2 to checks involving dex (including armor checks)', 8);
  }
}
