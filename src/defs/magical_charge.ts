export class MagicalCharge {
  constructor(key: string, points: number) {
    this._points = points;
    this._key = key;
  }
  private _points: number;
  get PointsCost(): number { return this._points; };
  private _key: string;
  get Key(): string { return this._key; }

  static FirstCircle() : MagicalCharge {
    return new MagicalCharge('1st Circle', 3);
  }
  static SecondCircle() : MagicalCharge {
    return new MagicalCharge('2nd Circle', 6);
  }
  static ThirdCircle() : MagicalCharge {
    return new MagicalCharge('3rd Circle', 9);
  }
  static FourthCircle() : MagicalCharge {
    return new MagicalCharge('4th Circle', 12);
  }
}