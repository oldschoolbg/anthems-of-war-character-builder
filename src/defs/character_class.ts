import { Keyed } from "../interfaces";

export enum CharacterClasses {
  Instinct = "Instinct",
  Regular = "Regular"
}

export class CharacterClass implements Keyed {
  constructor(key: CharacterClasses, pointsCost: number, description: string) {
    this._pointsCost = pointsCost;
    this._key = key;
    this._description = description;
  }

  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }
  private _key: CharacterClasses;
  get Key(): CharacterClasses { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }

  static get Options(): CharacterClass[] {
    return [
      CharacterClass.Instinct(),
      CharacterClass.Regular()
    ]
  }

  static Instinct() : CharacterClass {
    return new CharacterClass(
      CharacterClasses.Instinct,
      10,
      'Allows the character to generate instinct orders.',
    );
  }
  static Regular() : CharacterClass {
    return new CharacterClass(
      CharacterClasses.Regular,
      15,
      'Allows the character to generate regular orders.',
    )
  }
}