import { ArmorType, Elementals, MiscellaneousEquipments, Mounts, Potions, Shields, SpellSchools, Weapons } from "../objects";
import { CharacterClasses, EquipmentProperties, Traits } from "../defs"
import { Skills } from "../defs/skill";

export type Key = Traits | 
                  Skills |
                  CharacterClasses |
                  MiscellaneousEquipments |
                  Weapons |
                  Mounts |
                  EquipmentProperties |
                  Elementals |
                  SpellSchools | 
                  ArmorType |
                  Potions |
                  Shields |
                  string

export class ObjectKey {
  Key: Key;
  CustomKey?: string;
  constructor(key: Key, customKey?: string) {
    this.Key = key;
    this.CustomKey = customKey;
  }
}

export interface Keyed {
  Key: Key;
}