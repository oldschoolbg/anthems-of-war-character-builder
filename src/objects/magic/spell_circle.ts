import { Keyed } from "../../interfaces";


export class SpellCircle implements Keyed {
  private constructor(key: string, sortOrder: number) {
    this._key = key;
    this._sortOrder = sortOrder;
  }
  private _key: string;
  get Key(): string { return this._key; }
  private _sortOrder: number;
  get SortOrder(): number { return this._sortOrder; }

  static FirstCircle() {
    return new SpellCircle('First Circle', 1);
  }
  static SecondCircle() {
    return new SpellCircle('Second Circle', 2);
  }
  static ThirdCircle() {
    return new SpellCircle('Third Circle', 3);
  }
  static FourthCircle() {
    return new SpellCircle('Fourth Circle', 4);
  }
}
