import {
  Armour, ArmourType 
} from '../objects/armour'

test('None static', () => {
  expect(Armour.None().PointsCost).toBe(0);
  expect(Armour.None().Key).toBe('No Armour');
});

test('Light static', () => {
  expect(Armour.LightArmour().PointsCost).toBe(3);
  expect(Armour.LightArmour().Key).toBe('Light Armour');
});

test('Medium static', () => {
  expect(Armour.MediumArmour().PointsCost).toBe(5);
  expect(Armour.MediumArmour().Key).toBe('Medium Armour');
});

test('Heavy static', () => {
  expect(Armour.HeavyArmour().PointsCost).toBe(8);
  expect(Armour.HeavyArmour().Key).toBe('Heavy Armour');
});