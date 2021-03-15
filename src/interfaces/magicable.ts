import { Character } from "../objects";
import { Elemental } from "../objects/magic";

export interface Magicable {
  SpellPoolLimit: number;
  SetSpellcastingSchoolsLimit(to: number): Character;
  SetSpellcastingSlotsLimit(to: number): Character;
  SetSpellPoolLimit(to: number): Character;

  AddElemental(elemental: Elemental): Character;
  RemoveElemental(elemental: Elemental): Character;
}
