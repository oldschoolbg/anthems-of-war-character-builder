import { EquipmentProperties, EquipmentProperty } from "../defs";
import { CanHaveMagicalCharges, Key, Keyed, SpellCharge } from "../interfaces";
import { CanHaveProperties } from "./shared_implementations/can_have_properties";

export enum ArmorType {
  None = 'No Armor',
  LightArmor = 'Light Armor',
  MediumArmor = 'Medium Armor',
  HeavyArmor = 'Heavy Armor'
}

export class Armor extends CanHaveProperties implements Keyed, CanHaveMagicalCharges  {
  constructor(key: ArmorType | string, description: string, pointsCost: number) {
    super('ARMOUR');
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  static get Options(): Armor[] {
    return [
      Armor.None(),
      Armor.LightArmor(),
      Armor.MediumArmor(),
      Armor.HeavyArmor()
    ]
  }

  private _key: ArmorType | string;
  get Key(): ArmorType | string { return this._key; }
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

  AddProperty(key: EquipmentProperties, ...props: any[]): Armor {
    super.AddProperty(key, props);
    return this;
  }

  RemoveProperty(key: EquipmentProperties, ...props: any[]): Armor {
    super.RemoveProperty(key, props);
    return this;
  }
  AddSpellCharge(spellCharge: SpellCharge): Armor {
    const found = this._spellCharges.findIndex(sp => sp.Spell.Key === spellCharge.Spell.Key);
    if (found !== -1) {
      spellCharge.NumberOfCharges += this._spellCharges[found].NumberOfCharges;
      this._spellCharges[found] = spellCharge;
    } else {
      this._spellCharges.push(spellCharge);
    }
    return this;
  }

  static None() : Armor {
    return new Armor(ArmorType.None, '+0 to armor checks', 0);
  }
  static LightArmor() : Armor {
    return new Armor(ArmorType.LightArmor, '+2 to armor checks', 3);
  }
  static MediumArmor() : Armor {
    return new Armor(ArmorType.MediumArmor, '+4 to armor checks -1 to checks involving dex (including armor checks)', 5);
  }
  static HeavyArmor() : Armor {
    return new Armor(ArmorType.HeavyArmor, '+7 to armor checks -2 to checks involving dex (including armor checks)', 8);
  }
}
