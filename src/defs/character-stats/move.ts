import { CharacterStat } from './character-stat';

export class Move extends CharacterStat {
  constructor(initalValue?: number) {
    if (initalValue === undefined) {
      initalValue = 4;
    }
    super('MOV', initalValue)
  }
}
