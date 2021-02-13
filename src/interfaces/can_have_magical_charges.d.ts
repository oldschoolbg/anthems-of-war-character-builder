import { Spell } from "../objects/magic";

export interface CanHaveMagicalCharges {
  SpellCharges: Array<SpellCharge>;
  AddSpellCharge(spellCharge: SpellCharge): any;
}

export interface SpellCharge {
  Spell: Spell;
  NumberOfCharges: number;
}