export class WeaponStat {
  constructor(speed: number, strength: number, pointsCost: number) {
    this.Speed = speed;
    this.Strength = strength;
    this.PointsCost = pointsCost;
  }
  Strength: number;
  Speed: number;
  PointsCost: number;

  static null(): WeaponStat {
    return new WeaponStat(0, 0, 0);
  }
}

export const WeaponMatrix: WeaponStat[] = [
  new WeaponStat(1, 3, -5),
  new WeaponStat(1, 4, -2),
  new WeaponStat(1, 5, 1),
  new WeaponStat(1, 6, 4),
  new WeaponStat(1, 7, 7),
  new WeaponStat(1, 8, 10),
  new WeaponStat(1, 9, 13),
  new WeaponStat(1, 10, 16),

  new WeaponStat(2, 2, -4),
  new WeaponStat(2, 3, -1),
  new WeaponStat(2, 4, 2),
  new WeaponStat(2, 5, 5),
  new WeaponStat(2, 6, 8),
  new WeaponStat(2, 7, 11),
  new WeaponStat(2, 8, 14),
  new WeaponStat(2, 9, 17),
  new WeaponStat(2, 10, 20),

  new WeaponStat(3, 1, -1),
  new WeaponStat(3, 2, 0),
  new WeaponStat(3, 3, 3),
  new WeaponStat(3, 4, 6),
  new WeaponStat(3, 5, 9),
  new WeaponStat(3, 6, 12),
  new WeaponStat(3, 7, 15),
  new WeaponStat(3, 8, 18),
  new WeaponStat(3, 9, 21),
  new WeaponStat(3, 10, 24),

  new WeaponStat(4, 1, 1),
  new WeaponStat(4, 2, 4),
  new WeaponStat(4, 3, 7),
  new WeaponStat(4, 4, 10),
  new WeaponStat(4, 5, 13),
  new WeaponStat(4, 6, 16),
  new WeaponStat(4, 7, 19),
  new WeaponStat(4, 8, 22),
  new WeaponStat(4, 9, 25),
  new WeaponStat(4, 10, 28),

  new WeaponStat(5, 1, 5),
  new WeaponStat(5, 2, 8),
  new WeaponStat(5, 3, 11),
  new WeaponStat(5, 4, 14),
  new WeaponStat(5, 5, 17),
  new WeaponStat(5, 6, 20),
  new WeaponStat(5, 7, 23),
  new WeaponStat(5, 8, 26),
  new WeaponStat(5, 9, 29),
  new WeaponStat(5, 10, 32),
];
