import { Character } from "..";
import { Skills } from "../defs/skill";

test('Add Squad Leader to Instinct Character', () => {
  expect(() => { Character.Instinct().AddSkill(Skills.SquadLeader) }).toThrowError('Cannot add Squad Leader as Character must be Regular');
});