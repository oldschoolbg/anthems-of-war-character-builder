import {
  Unarmed,
  Knife,
  OneHandedHandSwordAxeSpear,
  Staff,
  TwoHandedAxeHammerSword,
  TwoHandedPolearm,
  Longbow,
  Shortbow,
  HandCrossbow,
  Dagger,
  Whip,
  Javelin,
  Sling,
  ThrowingKnife,
  Pike,
  DoubleSword,
  WarBanner,
} from '../objects/weapon';

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
test('Dagger cost', () => {
  expect(Dagger.PointsCost()).toBe(5);
});
test('Whip cost', () => {
  expect(Whip.PointsCost()).toBe(2);
});
test('Javelin cost', () => {
  expect(Javelin.PointsCost()).toBe(5);
});
test('Sling cost', () => {
  expect(Sling.PointsCost()).toBe(4);
});
test('Throwing Knife cost', () => {
  expect(ThrowingKnife.PointsCost()).toBe(4);
});
test('Pike cost', () => {
  expect(Pike.PointsCost()).toBe(7);
});
test('Double Sword cost', () => {
  expect(DoubleSword.PointsCost()).toBe(7);
});
test('War Banner cost', () => {
  expect(WarBanner.PointsCost()).toBe(5);
});
