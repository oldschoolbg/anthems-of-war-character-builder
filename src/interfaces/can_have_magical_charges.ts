import { Spell } from "../objects/magic";

export interface CanHaveMagicalCharges {
  SpellCharges: SpellCharge[];
  AddSpellCharge(spellCharge: SpellCharge): any;
}

export interface SpellCharge {
  Spell: Spell;
  NumberOfCharges: number;
}