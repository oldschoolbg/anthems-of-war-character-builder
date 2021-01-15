import { Character } from '../index';
import { Trait } from '../defs/trait';
import { Potion } from '../objects/potion';
import { Armour, Weapon } from '../objects';
import { MiscellaneousEquipment } from '../objects/miscellaneous_equipment';
import { Shield } from '../objects/shield';
import { EquipmentProperty } from '../defs';

test('Default Character', () => {
  expect(new Character().PointsCost).toBe(10);
  expect(new Character().Traits[0].Key).toBe('Instinct');
});

test('Increase Default PHY', () => {
  const char = new Character();
  char.PHY.SetValue(3);
  expect(char.PointsCost).toBe(16);
});

test('Set Character to Regular', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  expect(char.Traits[0].Key).toBe('Regular');
  expect(char.Traits.length).toBe(1);
});

test('Add Slow to Character', () => {
  const char = new Character();
  char.AddTrait(Trait.Slow());
  expect(char.Traits.length).toBe(2);
  expect(char.MOV.Value).toBe(3);
});

test('Add Fast to Character', () => {
  const char = new Character();
  char.AddTrait(Trait.Fast());
  expect(char.Traits.length).toBe(2);
  expect(char.MOV.Value).toBe(5);
});

test('Add Slow and Fast to Character', () => {
  const char = new Character();
  char.AddTrait(Trait.Slow());
  char.AddTrait(Trait.Fast());
  expect(char.Traits.length).toBe(3);
  expect(char.MOV.Value).toBe(4);
});

test('Add and remove Fast from Character', () => {
  const char = new Character();
  char.AddTrait(Trait.Fast());
  expect(char.Traits.length).toBe(2);
  expect(char.MOV.Value).toBe(5);
  char.RemoveTrait(Trait.Fast());
  expect(char.Traits.length).toBe(1);
  expect(char.MOV.Value).toBe(4);
});

test('Default Character with a Potion', () => {
  const char = new Character()
  .AddPotion(Potion.Blue());
  expect(char.PointsCost).toBe(12);
  char
  .AddPotion(Potion.Blue())
  .AddPotion(Potion.Purple())
  expect(char.PointsCost).toBe(18);
  char.RemovePotion(Potion.Blue());
  
  expect(char.PointsCost).toBe(16);
});

test('Ratfolk Slingers', () => {
  const char = new Character();
  char.DEX.SetValue(2);
  char.AddTrait(Trait.Regular());
  char.AddWeapon(Weapon.Sling());
  expect(char.PointsCost).toBe(22);
});
test('Ratfolk Warrior', () => {
  const char = new Character();
  char.PHY.SetValue(2);
  char.AddTrait(Trait.Regular());
  char.AddWeapon(Weapon.OneHandedSpear());
  char.AddArmour(Armour.LightArmour());
  expect(char.PointsCost).toBe(26);
});
test('Ratfolk Brute', () => {
  const char = new Character();
  char.PHY.SetValue(3);
  char.CON.SetValue(2);
  char.AddWeapon(Weapon.TwoHandedAxeHammerSword());
  char.AddTrait(Trait.Large());
  char.AddTrait(Trait.Strong());
  expect(char.PointsCost).toBe(33);
});
test('Ratfolk Assassin', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.DEX.SetValue(4);
  char.PHY.SetValue(1);
  char.AddWeapon(Weapon.DualWeildDaggers());
  char.AddTrait(Trait.Fast());
  expect(char.PointsCost).toBe(36);
});
test('Halfling Militia Archer', () => {
  const char = new Character();
  char.DEX.SetValue(3);
  char.AddWeapon(Weapon.Shortbow());
  char.AddArmour(Armour.LightArmour());
  expect(char.PointsCost).toBe(24);
});
test('Halfling Militia Spear', () => {
  const char = new Character();
  char.PHY.SetValue(3);
  char.DEX.SetValue(1);
  char.AddWeapon(Weapon.OneHandedSpear());
  char.AddArmour(Armour.LightArmour());
  expect(char.PointsCost).toBe(25);
});
test('Bandit Archer', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.PHY.SetValue(1);
  char.DEX.SetValue(3);
  char.AddWeapon(Weapon.Shortbow());
  expect(char.PointsCost).toBe(27);
});
test('Bandit Warrior', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.PHY.SetValue(3);
  char.DEX.SetValue(1);
  char.AddWeapon(Weapon.OneHandedSpear());
  char.AddShield(Shield.Shield());
  expect(char.PointsCost).toBe(29);
});
test('Bandit Cutthroat', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.PHY.SetValue(1);
  char.DEX.SetValue(3);
  char.AddWeapon(Weapon.Dagger());
  expect(char.PointsCost).toBe(27);
});
test('Dark Elf Assassin', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.PHY.SetValue(1);
  char.DEX.SetValue(4);
  char.AddWeapon(Weapon.Dagger());
  char.AddWeapon(Weapon.HandCrossbow());
  expect(char.PointsCost).toBe(33);
});
test('Knight Errant', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.PHY.SetValue(4);
  char.DEX.SetValue(2);
  char.CON.SetValue(2);
  char.AddWeapon(Weapon.OneHandedSpear());
  char.AddArmour(Armour.MediumArmour());
  char.AddShield(Shield.Shield());
  expect(char.PointsCost).toBe(48);
});
test('Wooden Construct', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.DEX.SetValue(3);
  char.CON.SetValue(2);
  const doubleHandCrossbow = new Weapon('Double Hand Crossbow', 2, 3)
    .AddProperty(EquipmentProperty.Ranged())
    .AddProperty(EquipmentProperty.OneHanded());
  expect(doubleHandCrossbow.PointsCost).toBe(6);
  char.AddWeapon(doubleHandCrossbow);
  char.AddArmour(Armour.LightArmour());
  expect(char.PointsCost).toBe(38);
});
test('Wandering Seer', () => {
  const char = new Character();
  char.AddTrait(Trait.Regular());
  char.AddTrait(Trait.Spellcaster());
  char.PHY.SetValue(2);
  char.CON.SetValue(2);
  char.MND.SetValue(2);
  char.AddWeapon(Weapon.Staff());
  char.AddEquipment(MiscellaneousEquipment.MedicalSupplies());
  char.AddEquipment(MiscellaneousEquipment.Familiar());
  expect(char.PointsCost).toBe(47);
});