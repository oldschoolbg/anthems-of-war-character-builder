import { EquipmentProperties, EquipmentProperty } from '../defs';
import {
  Weapon,
} from '../objects/weapon';

test('Invalid strength and speed', () => {
  expect(() => { new Weapon('invalid', 1, 1); }).toThrowError('Invalid Weapon invalid - Speed and Strength provided are not a valid combination: speed: 1. strength: 1');
});
test('Adding Two Handed to Dual Wield', () => {
  const dualWield = new Weapon('dual wield', 2, 3)
  .AddProperty(EquipmentProperties.DualWield)
  .AddProperty(EquipmentProperties.TwoHanded);
  expect(dualWield.Properties.find(p => p.Key === EquipmentProperties.DualWield)).toBeUndefined();
});
test('Adding Dual Wield to Two Handed', () => {
  const twoHanded = new Weapon('2-handed', 2, 3)
  .AddProperty(EquipmentProperties.TwoHanded)
  .AddProperty(EquipmentProperties.DualWield);
  expect(twoHanded.Properties.find(p => p.Key === EquipmentProperties.TwoHanded)).toBeUndefined();
});