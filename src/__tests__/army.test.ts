import { Army } from '../index';
import { Character } from '../objects';

test('Invalid Army', () => {
  const army = Army.create(0);
  expect(() => { army.Leader = Character.Instinct() }).toThrowError('This Character cannot be your leader');
});
test('Empty Army', () => {
  const army = Army.create(300);
  army.Leader = Character.Leader();
  expect(army.PointsCost).toBe(15);
});

test('Empty Army Allowed Skills', () => {
  const army = Army.create(300);
  army.Leader = Character.Leader();
  expect(army.TotalAllowedSkillSlots).toBe(6);
});