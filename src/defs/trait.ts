import { Character } from '../objects/character';

export class Trait {
  constructor(key: string, points: number, description: string) {
    this.Points = points;
    this.Key = key;
    this.Description = description;
  }
  Points: number;
  Key: string;
  Description: string;
  AddEffect: (char: Character) => void = (char: Character) => {
    return;
  };
  RemoveEffect: (char: Character) => void = (char: Character) => {
    return;
  };

  setAddEffect(addEffect: (char: Character) => void): Trait {
    this.AddEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (char: Character) => void): Trait {
    this.RemoveEffect = removeEffect;
    return this;
  }
}

export const Instinct: Trait = new Trait(
  'Instinct',
  10,
  'Allows the character to generate instinct orders. This is not compatible with the Regular trait.',
);
export const Regular: Trait = new Trait(
  'Regular',
  15,
  'Allows the character to generate regular orders. This is not compatible with the Instinct trait',
);
export const Strong: Trait = new Trait(
  'Strong',
  2,
  'This character rolls critical hits with weapon attacks on a 19 or 20',
);
export const Large: Trait = new Trait(
  'Large',
  0,
  'Add a +2 to this character’s weapon strength but also add +1 to attack rolls attempting to hit this character by characters smaller than it. Characters with this trait are usually represented on a larger base.',
);
export const Slow: Trait = new Trait('Slow', -2, '-1 to character MOV value. Can be applied multiple times')
  .setAddEffect((char: Character) => {
    char.MOV.AdjustBy(-1);
  })
  .setRemoveEffect((char: Character) => {
    char.MOV.AdjustBy(1);
  });
export const Fast: Trait = new Trait('Fast', 2, '+1 to character MOV value. Can be applied multiple times')
  .setAddEffect((char: Character) => {
    char.MOV.AdjustBy(1);
  })
  .setRemoveEffect((char: Character) => {
    char.MOV.AdjustBy(-1);
  });
export const Flying: Trait = new Trait(
  'Flying',
  4,
  'As part of a move action this character can choose to fly. Flying creatures ignore difficult terrain and obstructing obstacles while moving and can move in any direction, even vertically. They can not end movement over impassable terrain. +2 bonus to archers targeting this character while it is flying. Characters with this trait can choose to land at any time.',
);
export const Spellcaster: Trait = new Trait(
  'Spellcaster',
  8,
  'This character can cast spells from one chosen school of magic.',
);
export const Huge: Trait = new Trait(
  'Huge',
  4,
  "Add a +4 to this character's weapon strength but also add +1 to attack rolls attempting to hit this character by characters smaller than it. Characters with this trait are usually represented on bases bigger than those with the Large trait",
);
