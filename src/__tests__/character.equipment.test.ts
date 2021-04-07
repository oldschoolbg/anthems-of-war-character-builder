import { Character } from "..";
import { Traits } from "../defs";
import {  MiscellaneousEquipments } from "../objects";

test('Add Spellcasting Implement to Character with Spellcaster Trait', () => {
  expect(() => { 
    Character.Regular()
      .AddTrait(Traits.Spellcaster)
      .AddEquipment(MiscellaneousEquipments.SpellcastingImplement)
    }).not.toThrowError('Cannot add Spellcaster as Character has the Witch Hunter Skill');
});
test('Add Spellcasting Implement to Character without Spellcaster Trait', () => {
  expect(() => { 
    Character.Regular()
    .AddEquipment(MiscellaneousEquipments.SpellcastingImplement)
    }).toThrowError('Cannot add Spellcasting Implement as Character must have Spellcaster.');
});