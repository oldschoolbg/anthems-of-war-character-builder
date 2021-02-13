import { Keyed } from "../../interfaces";


export class SpellCircle implements Keyed {
  private constructor(key: string, sort_order: number) {
    this._key = key;
    this._sort_order = sort_order;
  }
  private _key: string;
  get Key(): string { return this._key; }
  private _sort_order: number;
  get SortOrder(): number { return this._sort_order; }

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
