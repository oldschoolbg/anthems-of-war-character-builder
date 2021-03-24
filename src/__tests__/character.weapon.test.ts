import { Character } from "..";
import { Weapons } from "../objects";

test('Default Regular Character', () => {
  expect(Character.Regular().Weapons.length).toBe(1);
  expect(Character.Regular().Weapons.find(w => w.Key === Weapons.Unarmed)).not.toBeUndefined();
});
test('Add Knife to Default Regular Character', () => {
  const character = Character.Regular().AddWeapon(Weapons.Knife);
  expect(character.Weapons.length).toBe(1);
  expect(character.Weapons.find(w => w.Key === Weapons.Unarmed)).toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)).not.toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)?.Quantity).toBe(1);
});
test('Add two Knives to Default Regular Character', () => {
  const character = Character.Regular()
    .AddWeapon(Weapons.Knife)
    .AddWeapon(Weapons.Knife);
  expect(character.Weapons.length).toBe(1);
  expect(character.Weapons.find(w => w.Key === Weapons.Unarmed)).toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)).not.toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)?.Quantity).toBe(2);
});
test('Add two Knives and a Dagger to Default Regular Character', () => {
  const character = Character.Regular()
    .AddWeapon(Weapons.Knife)
    .AddWeapon(Weapons.Knife)
    .AddWeapon(Weapons.Dagger);
  expect(character.Weapons.length).toBe(2);
  expect(character.Weapons.find(w => w.Key === Weapons.Unarmed)).toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)).not.toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)?.Quantity).toBe(2);
  expect(character.Weapons.find(w => w.Key === Weapons.Dagger)).not.toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Dagger)?.Quantity).toBe(1);
});
test('Add two Knives and a Dagger then remove the Dagger to Default Regular Character', () => {
  const character = Character.Regular()
    .AddWeapon(Weapons.Knife)
    .AddWeapon(Weapons.Knife)
    .AddWeapon(Weapons.Dagger)
    .RemoveWeapon(Weapons.Dagger);
  expect(character.Weapons.length).toBe(1);
  expect(character.Weapons.find(w => w.Key === Weapons.Unarmed)).toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)).not.toBeUndefined();
  expect(character.Weapons.find(w => w.Key === Weapons.Knife)?.Quantity).toBe(2);
  expect(character.Weapons.find(w => w.Key === Weapons.Dagger)).toBeUndefined();
});