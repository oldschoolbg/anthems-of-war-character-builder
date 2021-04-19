import { Army } from '../index';
import { Character } from '../objects';

test('Invalid Army', () => {
  expect(() => { new Army(0, Character.Instinct()).PointsCost }).toThrowError('This Character cannot be your leader');
});
test('Empty Army', () => {
  expect(new Army(300, Character.Leader()).PointsCost).toBe(15);
});

test('Empty Army Allowed Skills', () => {
  expect(new Army(300, Character.Leader()).TotalAllowedSkillSlots).toBe(6);
});