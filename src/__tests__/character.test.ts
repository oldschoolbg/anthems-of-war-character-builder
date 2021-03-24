import { Character } from '../index';
import { Trait, Traits } from '../defs/trait';
import { Potion, Potions } from '../objects/potion';
import { Armour, ArmourType, Weapon, Weapons } from '../objects';
import { MiscellaneousEquipment, MiscellaneousEquipments } from '../objects/miscellaneous_equipment';
import { Shield, Shields } from '../objects/shield';
import { EquipmentProperties, EquipmentProperty } from '../defs';

test('Instinct Character', () => {
  expect(Character.Instinct().PointsCost).toBe(10);
});
test('Regular Character', () => {
  expect(Character.Regular().PointsCost).toBe(15);
});

test('Increase Default PHY', () => {
  const char = Character.Instinct();
  char.PHY.Value = 3;
  expect(char.PointsCost).toBe(16);
});

test('Add Slow to Character', () => {
  const char = Character.Instinct();
  char.AddTrait(Traits.Slow);
  expect(char.Traits.length).toBe(1);
  expect(char.MOV.Value).toBe(3);
});

test('Add Fast to Character', () => {
  const char = Character.Instinct();
  char.AddTrait(Traits.Fast);
  expect(char.Traits.length).toBe(1);
  expect(char.MOV.Value).toBe(5);
  char.AddTrait(Traits.Fast);
  expect(char.MOV.Value).toBe(6);
  expect(char.Traits.find(t => t.Key === Traits.Fast)?.Quantity).toBe(2);
  char.RemoveTrait(Traits.Fast);
  expect(char.Traits.find(t => t.Key === Traits.Fast)?.Quantity).toBe(1);
  char.RemoveTrait(Traits.Fast);
  expect(char.Traits.find(t => t.Key === Traits.Fast)).toBeUndefined();
});

test('Add Slow and Fast to Character', () => {
  const char = Character.Instinct();
  char.AddTrait(Traits.Slow);
  char.AddTrait(Traits.Fast);
  expect(char.Traits.length).toBe(1);
  expect(char.MOV.Value).toBe(5);
});

test('Add and remove Fast from Character', () => {
  const char = Character.Instinct();
  char.AddTrait(Traits.Fast);
  expect(char.Traits.length).toBe(1);
  expect(char.MOV.Value).toBe(5);
  char.RemoveTrait(Traits.Fast);
  expect(char.Traits.length).toBe(0);
  expect(char.MOV.Value).toBe(4);
});

test('Default Character with a Potion', () => {
  const char = Character.Instinct()
  .AddPotion(Potions.Blue);
  expect(char.PointsCost).toBe(12);
  char
  .AddPotion(Potions.Blue)
  .AddPotion(Potions.Purple)
  expect(char.PointsCost).toBe(18);
  char.RemovePotion(Potions.Blue);
  
  expect(char.PointsCost).toBe(16);
});

test('Ratfolk Slingers', () => {
  const char = Character.Regular();
  char.DEX.Value = 2;
  char.AddWeapon(Weapons.Sling);
  expect(char.PointsCost).toBe(22);
});
test('Ratfolk Warrior', () => {
  const char = Character.Regular();
  char.PHY.Value = 2;
  char.AddWeapon(Weapons.OneHandedSpear);
  char.SetArmour(ArmourType.LightArmour);
  expect(char.PointsCost).toBe(26);
});
test('Ratfolk Brute', () => {
  const char = Character.Instinct();
  char.PHY.Value = 3;
  char.CON.Value = 2;
  char.AddWeapon(Weapons.TwoHandedAxe);
  char.AddTrait(Traits.Large);
  char.AddTrait(Traits.Strong);
  expect(char.PointsCost).toBe(33);
});
test('Ratfolk Assassin', () => {
  const char = Character.Regular();
  char.DEX.Value = 4;
  char.PHY.Value = 1;
  char.AddWeapon(Weapons.DualWieldDaggers);
  char.AddTrait(Traits.Fast);
  expect(char.PointsCost).toBe(36);
});
test('Halfling Militia Archer', () => {
  const char = Character.Instinct();
  char.DEX.Value = 3;
  char.AddWeapon(Weapons.Shortbow);
  char.SetArmour(ArmourType.LightArmour);
  expect(char.PointsCost).toBe(24);
});
test('Halfling Militia Spear', () => {
  const char = Character.Instinct();
  char.PHY.Value = 3;
  char.DEX.Value = 1;
  char.AddWeapon(Weapons.OneHandedSpear);
  char.SetArmour(ArmourType.LightArmour);
  expect(char.PointsCost).toBe(25);
});
test('Bandit Archer', () => {
  const char = Character.Regular();
  char.PHY.Value = 1;
  char.DEX.Value = 3;
  char.AddWeapon(Weapons.Shortbow);
  expect(char.PointsCost).toBe(27);
});
test('Bandit Warrior', () => {
  const char = Character.Regular();
  char.PHY.Value = 3;
  char.DEX.Value = 1;
  char.AddWeapon(Weapons.OneHandedSpear);
  char.SetShield(Shields.Shield);
  expect(char.PointsCost).toBe(29);
});
test('Bandit Cutthroat', () => {
  const char = Character.Regular();
  char.PHY.Value = 1;
  char.DEX.Value = 3;
  char.AddWeapon(Weapons.Dagger);
  expect(char.PointsCost).toBe(27);
});
test('Dark Elf Assassin', () => {
  const char = Character.Regular();
  char.PHY.Value = 1;
  char.DEX.Value = 4;
  char.AddWeapon(Weapons.Dagger);
  char.AddWeapon(Weapons.HandCrossbow);
  expect(char.PointsCost).toBe(33);
});
test('Knight Errant', () => {
  const char = Character.Regular();
  char.PHY.Value = 4;
  char.DEX.Value = 2;
  char.CON.Value = 2;
  char.AddWeapon(Weapons.OneHandedSpear);
  char.SetArmour(ArmourType.MediumArmour);
  char.SetShield(Shields.Shield);
  expect(char.PointsCost).toBe(48);
});
test('Wooden Construct', () => {
  const char = Character.Regular();
  char.DEX.Value = 3;
  char.CON.Value = 2;
  const doubleHandCrossbow = new Weapon('Double Hand Crossbow', 2, 3)
    .AddProperty(EquipmentProperties.Ranged)
    .AddProperty(EquipmentProperties.OneHanded);
  expect(doubleHandCrossbow.PointsCost).toBe(6);
  char.AddWeapon(doubleHandCrossbow);
  char.SetArmour(ArmourType.LightArmour);
  expect(char.PointsCost).toBe(38);
});
test('Wandering Seer', () => {
  const char = Character.Regular();
  char.AddTrait(Traits.Spellcaster);
  char.PHY.Value = 2;
  char.CON.Value = 2;
  char.MND.Value = 2;
  char.AddWeapon(Weapons.Staff);
  char.AddEquipment(MiscellaneousEquipments.MedicalSupplies);
  char.AddEquipment(MiscellaneousEquipments.Familiar);
  expect(char.PointsCost).toBe(47);
});


test('Wandering Seer Multiple Familiars', () => {
  const char = Character.Regular();
  char.AddTrait(Traits.Spellcaster);
  char.PHY.Value = 2;
  char.CON.Value = 2;
  char.MND.Value = 2;
  char.AddWeapon(Weapons.Staff);
  char.AddEquipment(MiscellaneousEquipments.MedicalSupplies);
  char.AddEquipment(MiscellaneousEquipments.Familiar);
  char.AddEquipment(MiscellaneousEquipments.Familiar);
  expect(char.PointsCost).toBe(50);
  expect(char.Equipment.find(e => e.Key === MiscellaneousEquipments.Familiar)?.Quantity).toBe(2);
  char.RemoveEquipment(MiscellaneousEquipments.Familiar);
  expect(char.Equipment.find(e => e.Key === MiscellaneousEquipments.Familiar)?.Quantity).toBe(1);
  char.RemoveEquipment(MiscellaneousEquipments.Familiar);
  expect(char.Equipment.find(e => e.Key === MiscellaneousEquipments.Familiar)).toBeUndefined();
});