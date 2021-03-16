
export abstract class CharacterStat {
  protected _costArray: number[] | undefined;

  protected constructor(key: string, initialValue?: number, costArray?: number[]) {
    this.Key = key;
    this._costArray = costArray;
    if (initialValue !== undefined) {
      this.Value = initialValue;
    }
  }
  Key: string;
  protected _value: number = 0;
  get Value(): number {
    return this._value;
  }
  set Value(to: number) {
    if (to < 0 || to > 8) {
      throw new Error('Must be between zero and eight');
    }
    this._value = to;
    if (this._costArray !== undefined) {
      this._pointsCost = this._costArray[to];
    }
  }
  protected _pointsCost = 0;
  get PointsCost(): number {
    return this._pointsCost;
  }

  AdjustBy(amount: number): void {
    this.Value = this._value + amount;
  };
}
