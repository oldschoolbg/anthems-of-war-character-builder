import { Keyed } from "../interfaces";

export enum Shields {
  None = 'None',
  Shield = 'Shield'
}

export class Shield implements Keyed  {
  constructor(key: string, description: string, pointsCost: number) {
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  private _key: string;
  get Key(): string { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }

  Get(shield: Shields): Shield {
    switch (shield) {
      case Shields.None:
        return Shield.None();
      case Shields.Shield:
        return Shield.Shield();
      default:
        throw new Error(`This is an unsupported Shield: ${shield}`);
    }
  }

  static None() : Shield {
    return new Shield('No Shield', '', 0);
  }

  static Shield() : Shield {
    return new Shield('Shield', '+1 to armor checks when held. Can not use 2-Handed weapons', 2);
  }
}
