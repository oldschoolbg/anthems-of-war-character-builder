import { Magicable, Moveable } from "../interfaces";

export enum Traits {
  Strong = "Strong",
  Large = "Large",
  Slow = "Slow",
  Fast = "Fast",
  Flying = "Flying",
  Spellcaster = "Spellcaster",
  Huge = "Huge"
}

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
  private _addEffect: (char: Moveable | Magicable) => void = (char: Moveable | Magicable) => {
    return;
  };
  get AddEffect() : (char: Moveable | Magicable) => void { return this._addEffect; }
  private _removeEffect: (char: Moveable | Magicable) => void = (char: Moveable | Magicable) => {
    return;
  };
  get RemoveEffect() : (char: Moveable | Magicable) => void { return this._removeEffect; }

  setAddEffect(addEffect: (char: Moveable | Magicable) => void): Trait {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (char: Moveable | Magicable) => void): Trait {
    this._removeEffect = removeEffect;
    return this;
  }

  static Get(trait: Traits): Trait {
    switch(trait) {
      case Traits.Fast:
        return Trait.Fast();
      case Traits.Flying:
        return Trait.Flying();
      case Traits.Huge:
        return Trait.Huge();
      case Traits.Large:
        return Trait.Large();
      case Traits.Slow:
        return Trait.Slow();
      case Traits.Spellcaster:
        return Trait.Spellcaster();
      case Traits.Strong:
        return Trait.Strong();
      default:
        throw new Error(`This is an unsupported Trait: ${trait}`);
    }
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
      'Add 2 to this character’s weapon strength but also add 1 to attack rolls from smaller foes. Characters with this trait are usually represented on a larger base.',
    );
  }
  static Slow() : Trait {
    return new Trait('Slow', -2, 'Subtract 1 tfrom character’s MOV value. Can be applied multiple times')
    .setAddEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(-1);
    })
    .setRemoveEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(1);
    });
  }
  static Fast() : Trait {
    return new Trait('Fast', 2, 'Add 1 to character’s MOV value. Can be applied multiple times')
    .setAddEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(1);
    })
    .setRemoveEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(-1);
    });
  }
  static Flying() : Trait {
    return new Trait(
      'Flying',
      4,
      'This character is able to fly as part of their move action. Flying creatures ignore difficult terrain and obstructing obstacles while moving and can move in any direction, even vertically. They cannot end movement over impassable terrain. Archers targeting this character while it is flying add 2 to their roll. Characters with this trait can choose to land at any time.',
    );
  }
  static Spellcaster() : Trait {
    return new Trait(
      'Spellcaster',
      8,
      'This character can cast spells from one chosen school of magic.',
    )
    .setAddEffect((char: Moveable | Magicable) => {
      (char as Magicable).SetSpellcastingSchoolsLimit(1);
    })
    .setRemoveEffect((char: Moveable | Magicable) => {
      (char as Magicable).SetSpellcastingSchoolsLimit(0);
    });;
  }
  static Huge() : Trait {
    return new Trait(
      'Huge',
      4,
      "Add 4 to this character's weapon strength but also add 2 to attacks rolls from smaller foes. Characters with this trait are usually represented on even larger bases than those with the Large trait",
    );
  }
}
