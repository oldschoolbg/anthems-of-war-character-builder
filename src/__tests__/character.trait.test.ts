import { Character } from "..";
import { Traits } from "../defs";
import { Skills } from "../defs/skill";

test('Add Spellcaster to Character with WitchHunter Skill', () => {
  expect(() => { 
    Character.Regular()
      .AddSkill(Skills.WitchHunter) 
      .AddTrait(Traits.Spellcaster)
    }).toThrowError('Cannot add Spellcaster as Character has the Witch Hunter Skill');
});
test('Add Witchhunter to Character with Latent Spellcaster Trait', () => {
  expect(() => { 
    Character.Regular()
      .AddSkill(Skills.LatentSpellcaster) 
      .AddTrait(Traits.Spellcaster)
    }).toThrowError('Cannot add Spellcaster as Character has the Latent Spellcaster Skill');
});