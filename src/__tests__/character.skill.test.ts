import { Character } from "..";
import { CharacterClasses, Traits } from "../defs";
import { Skills } from "../defs";

test('Add Squad Leader to Instinct Character', () => {
  expect(() => { Character.Instinct().AddSkill(Skills.SquadLeader) }).toThrowError('Cannot add Squad Leader as Character must be Regular');
});

test('Add Witchhunter to Character with Spellcaster Trait', () => {
  expect(() => { 
    Character.Regular()
      .AddTrait(Traits.Spellcaster)
      .AddSkill(Skills.WitchHunter) 
    }).toThrowError('Cannot add Witch Hunter as Character has the Spellcaster Trait');
});
test('Add Latent Spellcaster to Character with Spellcaster Trait', () => {
  expect(() => { 
    Character.Regular()
      .AddTrait(Traits.Spellcaster)
      .AddSkill(Skills.LatentSpellcaster) 
    }).toThrowError('Cannot add Latent Spellcaster as Character has the Spellcaster Trait');
});
test('Remove Commander from a Character that has the Fearless Presence Skill', () => {
  expect(() => { 
    Character.Leader()
      .AddSkill(Skills.FearlessPresence)
      .IsCommander = false;
    }).toThrowError('Cannot remove Commander from this Character as it has these Commander only Skills: Fearless Presence.');
});
test('Set Instinct on a Character that has the SquadLeader Skill', () => {
  expect(() => { 
    Character.Regular()
      .AddSkill(Skills.SquadLeader)
      .SetCharacterClass(CharacterClasses.Instinct);
    }).toThrowError('You cannot set this character to Instinct as it has the following Skills that require Regular: Squad Leader.');
});