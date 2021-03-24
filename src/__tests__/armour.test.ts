import {
  Armor 
} from '../objects/armour'

test('None static', () => {
  expect(Armor.None().PointsCost).toBe(0);
  expect(Armor.None().Key).toBe('No Armor');
});

test('Light static', () => {
  expect(Armor.LightArmor().PointsCost).toBe(3);
  expect(Armor.LightArmor().Key).toBe('Light Armor');
});

test('Medium static', () => {
  expect(Armor.MediumArmor().PointsCost).toBe(5);
  expect(Armor.MediumArmor().Key).toBe('Medium Armor');
});

test('Heavy static', () => {
  expect(Armor.HeavyArmor().PointsCost).toBe(8);
  expect(Armor.HeavyArmor().Key).toBe('Heavy Armor');
});