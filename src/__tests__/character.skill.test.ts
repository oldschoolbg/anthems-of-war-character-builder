import { Character } from "..";
import { Traits } from "../defs";
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