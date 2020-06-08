import { Mount } from "../objects/mount";

test('Horse cost', () => {
  expect(Mount.Horse().PointsCost).toBe(6);
});

test('Griffin cost', () => {
  expect(Mount.Griffin().PointsCost).toBe(8);
});

test('Bear const', () => {
  expect(Mount.Bear().PointsCost).toBe(9);
})