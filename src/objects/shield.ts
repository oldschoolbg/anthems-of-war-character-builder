import { Keyed } from "../interfaces";

export enum Shields {
  None = 'No Shield',
  Shield = 'Shield'
}

export class Shield implements Keyed  {
  constructor(key: Shields, description: string, pointsCost: number) {
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  private _key: Shields;
  get Key(): Shields { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }

  static get Options(): Shield[] {
    return [
      Shield.None(),
      Shield.Shield()
    ];
  }

  static None() : Shield {
    return new Shield(Shields.None, '', 0);
  }

  static Shield() : Shield {
    return new Shield(Shields.Shield, '+1 to armor checks when held. Can not use 2-Handed weapons', 2);
  }
}
