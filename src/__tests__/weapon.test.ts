import { Unarmed, Knife, OneHandedHandSwordAxeSpear, Staff, TwoHandedAxeHammerSword, TwoHandedPolearm, Longbow, Shortbow, HandCrossbow } from "../objects/weapon";

test('Unarmed cost', () => {
  expect(Unarmed.PointsCost()).toBe(0);
});
test('Knife cost', () => {
  expect(Knife.PointsCost()).toBe(3);
});
test('Sword cost', () => {
  expect(OneHandedHandSwordAxeSpear.PointsCost()).toBe(5);
});
test('Staff cost', () => {
  expect(Staff.PointsCost()).toBe(5);
});
test('Two handed weapon cost', () => {
  expect(TwoHandedAxeHammerSword.PointsCost()).toBe(7);
});
test('Two handed polearm cost', () => {
  expect(TwoHandedPolearm.PointsCost()).toBe(9);
});
test('Longbow cost', () => {
  expect(Longbow.PointsCost()).toBe(7);
});
test('Shortbow cost', () => {
  expect(Shortbow.PointsCost()).toBe(5);
});
test('Crossbow cost', () => {
  expect(Shortbow.PointsCost()).toBe(5);
});
test('Hand Crossbow cost', () => {
  expect(HandCrossbow.PointsCost()).toBe(2);
});