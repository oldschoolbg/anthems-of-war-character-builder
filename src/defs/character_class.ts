import { Keyed } from "../interfaces";

export enum CharacterClasses {
  Instinct = "Instinct",
  Regular = "Regular"
}

export class CharacterClass implements Keyed {
  constructor(key: string, pointsCost: number, description: string) {
    this._pointsCost = pointsCost;
    this._key = key;
    this._description = description;
  }

  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }
  private _key: string;
  get Key(): string { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }

  static Get(characterClass: CharacterClasses): CharacterClass {
    switch (characterClass) {
      case CharacterClasses.Instinct:
        return CharacterClass.Instinct();
      case CharacterClasses.Regular:
        return CharacterClass.Regular();
      default:
        throw new Error(`This is an unsupported Character Class: ${characterClass}`);
    }
  }

  static Instinct() : CharacterClass {
    return new CharacterClass(
      'Instinct',
      10,
      'Allows the character to generate instinct orders.',
    );
  }
  static Regular() : CharacterClass {
    return new CharacterClass(
      'Regular',
      15,
      'Allows the character to generate regular orders.',
    )
  }
}