import { Addable, Key, Keyed, Magicable, Moveable, Multiple, ValidityResponse } from "../interfaces";
import { Character } from "../objects";
import { Skills } from "./skill";

export enum Traits {
  Fast = "Fast",
  Flying = "Flying",
  Huge = "Huge",
  Large = "Large",
  Slow = "Slow",
  Spellcaster = "Spellcaster",
  Strong = "Strong"
}

export class Trait implements Keyed, Multiple, Addable {
  constructor(key: Traits, pointsCost: number, description: string, shortDescription?: string) {
    this._pointsCost = pointsCost;
    this._key = key;
    this._description = description;
    this._shortDescription = shortDescription;
  }

  static get Options(): Trait[] {
    return [
      Trait.Fast(),
      Trait.Flying(),
      Trait.Huge(),
      Trait.Large(),
      Trait.Slow(),
      Trait.Spellcaster(),
      Trait.Strong()
    ]
  }

  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost * this._quantity; }
  private _key: Traits;
  get Key(): Traits { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _shortDescription: string | undefined;
  get ShortDescription(): string | undefined { return this._shortDescription; }
  private _multipleAllowed = false;
  get MultipleAllowed(): boolean { return this._multipleAllowed; };
  private _quantity = 1;
  get Quantity(): number {
    return this._quantity;
  }
  private _kryptonite: Key[] = [];
  // parent cannot have both self and self.Kryptonite
  get Kryptonite(): Key[] { return this._kryptonite; }
  private _addEffect: (char: Moveable | Magicable) => void = (char: Moveable | Magicable) => {
    return;
  };
  get AddEffect() : (char: Moveable | Magicable) => void { return this._addEffect; }
  private _removeEffect: (char: Moveable | Magicable) => void = (char: Moveable | Magicable) => {
    return;
  };
  get RemoveEffect() : (char: Moveable | Magicable) => void { return this._removeEffect; }

  AddOne(): Trait {
    this._quantity += 1;
    return this;
  }
  RemoveOne(): Trait {
    if (this._quantity > 0) {
      this._quantity -= 1;
    }
    return this;
  }

  setAddEffect(addEffect: (char: Moveable | Magicable) => void): Trait {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (char: Moveable | Magicable) => void): Trait {
    this._removeEffect = removeEffect;
    return this;
  }
  setKryptonite(key: Key): Trait {
    if (!this._kryptonite.find((p: Key) => p === key)) {
      this._kryptonite.push(key);
    }
    return this;
  }
  removeKryptonite(key: Key): Trait {
    this._kryptonite = this._kryptonite.filter((p: Key) => p !== key);
    return this;
  }
  
  AllowMultiple(): Trait {
    this._multipleAllowed = true;
    return this;
  }

  private _checkAddValidity(character: Character): ValidityResponse {
    if (this._kryptonite.length > 0) {
      const skillKryptonite = character.Skills.filter((s: Keyed) => {
        return this._kryptonite.find(k => k === s.Key) !== undefined;
      });
      if (skillKryptonite.length > 0) {
        return ValidityResponse.Errored(
          `Cannot add ${this.Key} as Character has the ${skillKryptonite.map(
            (p) => p.Key,
          ).join(', ')} Skill.`
        );
      }
      const traitKryptonite = character.Traits.filter((s: Keyed) => {
        return this._kryptonite.find(k => k === s.Key) !== undefined;
      });
      if (traitKryptonite.length > 0) {
        return ValidityResponse.Errored(
          `Cannot add ${this.Key} as Character has the ${traitKryptonite.map(
            (p) => p.Key,
          ).join(', ')} Trait.`
        );
      }
    }
    const index = character.Traits.findIndex((e: Keyed) => this.Key === e.Key);
    return ValidityResponse.Checked(
      (this.MultipleAllowed === true) || (index === -1),
      index
    );
  }

  ValidForAdding(character: Character): boolean {
    return this._checkAddValidity(character).IsValid;
  }

  CanAdd(character: Character): ValidityResponse {
    const result = this._checkAddValidity(character);
    if (result.ErrorMessage !== undefined) {
      throw new Error(result.ErrorMessage);
    }
    return result;
  }

  private _checkRemoveValidity(character: Character): ValidityResponse {
    if (this.Quantity === 1) {
      const skillsThatDependOnThis = character.Skills.filter(s => s.TraitPrerequisites.find(sp => sp.Key === this.Key) !== undefined);
      if (skillsThatDependOnThis.length > 0) {
        return ValidityResponse.Errored(
          `Cannot remove ${this.Key} as Character has the following skills that depend on it: ${skillsThatDependOnThis.map(
            (p) => p.Key,
          ).join(', ')}.`
        );
      }
    }
    return ValidityResponse.Checked(true);
  }
  
  ValidForRemoving(character: Character): boolean {
    return this._checkRemoveValidity(character).IsValid;
  }

  CanRemove(character: Character): ValidityResponse {
    const result = this._checkRemoveValidity(character);
    if (result.ErrorMessage !== undefined) {
      throw new Error(result.ErrorMessage);
    }
    return result;
  }

  static Strong() : Trait {
    return new Trait(
      Traits.Strong,
      2,
      'This character rolls critical hits with weapon attacks on a 19 or 20',
    );
  }
  static Large() : Trait {
    return new Trait(
      Traits.Large,
      0,
      'Add 2 to this character’s weapon strength but also add 1 to attack rolls from smaller foes. Characters with this trait are usually represented on a larger base.',
    );
  }
  static Slow() : Trait {
    return new Trait(Traits.Slow, -2, 'Subtract 1 from character’s MOV value. Can be applied multiple times')
    .setAddEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(-1);
    })
    .setRemoveEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(1);
    })
    .setKryptonite(Traits.Fast)
    .AllowMultiple();
  }
  static Fast() : Trait {
    return new Trait(Traits.Fast, 2, 'Add 1 to character’s MOV value. Can be applied multiple times')
    .setAddEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(1);
    })
    .setRemoveEffect((char: Moveable | Magicable) => {
      (char as Moveable).MOV.AdjustBy(-1);
    })
    .setKryptonite(Traits.Slow)
    .AllowMultiple();
  }
  static Flying() : Trait {
    return new Trait(
      Traits.Flying,
      4,
      'This character is able to fly as part of their move action. Flying creatures ignore difficult terrain and obstructing obstacles while moving and can move in any direction, even vertically. They cannot end movement over impassable terrain. Archers targeting this character while it is flying add 2 to their roll. Characters with this trait can choose to land at any time.',
    );
  }
  static Spellcaster() : Trait {
    return new Trait(
      Traits.Spellcaster,
      8,
      'This character can cast spells from one chosen school of magic.',
    )
    .setKryptonite(Skills.LatentSpellcaster)
    .setKryptonite(Skills.WitchHunter)
    .setAddEffect((char: Moveable | Magicable) => {
      (char as Magicable).SetSpellcastingSchoolsLimit(1);
    })
    .setRemoveEffect((char: Moveable | Magicable) => {
      (char as Magicable).SetSpellcastingSchoolsLimit(0);
    });;
  }
  static Huge() : Trait {
    return new Trait(
      Traits.Huge,
      4,
      "Add 4 to this character's weapon strength but also add 2 to attacks rolls from smaller foes. Characters with this trait are usually represented on even larger bases than those with the Large trait",
    );
  }
}
