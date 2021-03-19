import { EquipmentProperties, EquipmentProperty } from '../defs';
import {
  Weapon,
} from '../objects/weapon';

test('Invalid strength and speed', () => {
  expect(() => { new Weapon('invalid', 1, 1); }).toThrowError('Invalid Weapon invalid - Speed and Strength provided are not a valid combination: speed: 1. strength: 1');
});
test('Adding Two Handed to Dual Wield', () => {
  const dualWield = new Weapon('dual wield', 2, 3)
  .AddProperty(EquipmentProperties.DualWield);
  expect(() => { dualWield.AddProperty(EquipmentProperties.TwoHanded); }).toThrowError('Cannot add Two Handed as Equipment already has Dual Wield.');
});
test('Adding Dual Wield to Two Handed', () => {
  const twoHanded = new Weapon('2-handed', 2, 3)
  .AddProperty(EquipmentProperties.TwoHanded);
  expect(() => { twoHanded.AddProperty(EquipmentProperties.DualWield); }).toThrowError('Cannot add Dual Wield as Equipment already has Two Handed.');
});