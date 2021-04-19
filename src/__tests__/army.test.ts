import { List } from '../index';
import { Character } from '../objects';

test('Invalid Army', () => {
  const army = List.create(0);
  expect(() => { army.Leader = Character.Instinct() }).toThrowError('This Character cannot be your leader');
});
test('Empty Army', () => {
  const army = List.create(300);
  army.Leader = Character.Leader();
  expect(army.PointsCost).toBe(15);
});

test('Empty Army Allowed Skills', () => {
  const army = List.create(300);
  army.Leader = Character.Leader();
  expect(army.TotalAllowedSkillSlots).toBe(6);
});