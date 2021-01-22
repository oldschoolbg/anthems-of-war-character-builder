import { Character } from "../objects";

export interface Magicable {
  SpellPoolLimit: number;
  SetSpellcastingSchoolsLimit(to: number): Character;
  SetSpellcastingSlotsLimit(to: number): Character;
  SetSpellPoolLimit(to: number): Character;
}
