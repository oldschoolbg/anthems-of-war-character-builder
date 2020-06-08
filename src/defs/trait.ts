import { Moveable } from "../interfaces";

export class Trait {
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
  private _addEffect: (char: Moveable) => void = (char: Moveable) => {
    return;
  };
  get AddEffect() : (char: Moveable) => void { return this._addEffect; }
  private _removeEffect: (char: Moveable) => void = (char: Moveable) => {
    return;
  };
  get RemoveEffect() : (char: Moveable) => void { return this._removeEffect; }

  setAddEffect(addEffect: (char: Moveable) => void): Trait {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (char: Moveable) => void): Trait {
    this._removeEffect = removeEffect;
    return this;
  }

  static Instinct() : Trait {
    return new Trait(
      'Instinct',
      10,
      'Allows the character to generate instinct orders. This is not compatible with the Regular trait.',
    );
  }
  static Regular() : Trait {
    return new Trait(
      'Regular',
      15,
      'Allows the character to generate regular orders. This is not compatible with the Instinct trait',
    )
  }
  static Strong() : Trait {
    return new Trait(
      'Strong',
      2,
      'This character rolls critical hits with weapon attacks on a 19 or 20',
    );
  }
  static Large() : Trait {
    return new Trait(
      'Large',
      0,
      'Add a +2 to this character’s weapon strength but also add +1 to attack rolls attempting to hit this character by characters smaller than it. Characters with this trait are usually represented on a larger base.',
    );
  }
  static Slow() : Trait {
    return new Trait('Slow', -2, '-1 to character MOV value. Can be applied multiple times')
    .setAddEffect((char: Moveable) => {
      char.MOV.AdjustBy(-1);
    })
    .setRemoveEffect((char: Moveable) => {
      char.MOV.AdjustBy(1);
    });
  }
  static Fast() : Trait {
    return new Trait('Fast', 2, '+1 to character MOV value. Can be applied multiple times')
    .setAddEffect((char: Moveable) => {
      char.MOV.AdjustBy(1);
    })
    .setRemoveEffect((char: Moveable) => {
      char.MOV.AdjustBy(-1);
    });
  }
  static Flying() : Trait {
    return new Trait(
      'Flying',
      4,
      'As part of a move action this character can choose to fly. Flying creatures ignore difficult terrain and obstructing obstacles while moving and can move in any direction, even vertically. They can not end movement over impassable terrain. +2 bonus to archers targeting this character while it is flying. Characters with this trait can choose to land at any time.',
    );
  }
  static Spellcaster() : Trait {
    return new Trait(
      'Spellcaster',
      8,
      'This character can cast spells from one chosen school of magic.',
    );
  }
  static Huge() : Trait {
    return new Trait(
      'Huge',
      4,
      "Add a +4 to this character's weapon strength but also add +1 to attack rolls attempting to hit this character by characters smaller than it. Characters with this trait are usually represented on bases bigger than those with the Large trait",
    );
  }
}
