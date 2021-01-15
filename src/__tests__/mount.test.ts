import { Mount } from "../objects/mount";

test('Horse cost', () => {
  expect(Mount.Horse().PointsCost).toBe(8);
});

test('Wolf cost', () => {
  expect(Mount.Wolf().PointsCost).toBe(9);
});

test('Griffin cost', () => {
  expect(Mount.Griffin().PointsCost).toBe(10);
});

test('Bear const', () => {
  expect(Mount.Bear().PointsCost).toBe(11);
})