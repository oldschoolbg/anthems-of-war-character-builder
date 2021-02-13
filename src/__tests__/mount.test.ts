import { Mount } from "../objects/mount";

test('Horse cost', () => {
  expect(Mount.Horse().PointsCost).toBe(8);
});

test('Horse Move', () => {
  expect(Mount.Horse().MOV.Value).toBe(6);
});

test('Wolf cost', () => {
  expect(Mount.Wolf().PointsCost).toBe(9);
});
test('Wolf Move', () => {
  expect(Mount.Wolf().MOV.Value).toBe(5);
});

test('Griffin cost', () => {
  expect(Mount.Griffin().PointsCost).toBe(10);
});
test('Griffin move', () => {
  expect(Mount.Griffin().MOV.Value).toBe(5);
});

test('Bear cost', () => {
  expect(Mount.Bear().PointsCost).toBe(11);
});
test('Bear move', () => {
  expect(Mount.Bear().MOV.Value).toBe(4);
});

test('Drake cost', () => {
  expect(Mount.Drake().PointsCost).toBe(13);
});
test('Drake move', () => {
  expect(Mount.Drake().MOV.Value).toBe(5);
});

test('Dragon cost', () => {
  expect(Mount.Dragon().PointsCost).toBe(28);
});
test('Dragon move', () => {
  expect(Mount.Dragon().MOV.Value).toBe(5);
});