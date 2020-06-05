import { Army } from '../index';

test('Empty Army', () => {
  expect(new Army().PointsCost()).toBe(0);
});
