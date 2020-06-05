import { Character } from '../index';
import { Traits } from '../objects/trait';

test('Default Character', () => {
  expect(new Character().PointsCost()).toBe(0);
  expect(new Character().Traits[0].Key).toBe('Instinct');
});

test('Increase Default PHY', () => {
  const char = new Character();
  char.PHY.SetValue(3);
  expect(char.PointsCost()).toBe(6);
})

test('Set Character to Regular', () => {
  const char = new Character();
  char.AddTrait(Traits.Regular);
  expect(char.Traits[0].Key).toBe('Regular');
  expect(char.Traits.length).toBe(1);
})

test('Add Slow to Character', () => {
  const char = new Character();
  char.AddTrait(Traits.Slow);
  expect(char.Traits.length).toBe(2);
  expect(char.MOV.Value).toBe(3);
})

test('Add Fast to Character', () => {
  const char = new Character();
  char.AddTrait(Traits.Fast);
  expect(char.Traits.length).toBe(2);
  expect(char.MOV.Value).toBe(5);
})

test('Add Slow and Fast to Character', () => {
  const char = new Character();
  char.AddTrait(Traits.Slow);
  char.AddTrait(Traits.Fast);
  expect(char.Traits.length).toBe(3);
  expect(char.MOV.Value).toBe(4);
})

test('Add and remove Fast from Character', () => {
  const char = new Character();
  char.AddTrait(Traits.Fast);
  expect(char.Traits.length).toBe(2);
  expect(char.MOV.Value).toBe(5);
  char.RemoveTrait(Traits.Fast);
  expect(char.Traits.length).toBe(1);
  expect(char.MOV.Value).toBe(4);
})