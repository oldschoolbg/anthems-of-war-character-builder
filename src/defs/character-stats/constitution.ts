import { CharacterStat } from './character-stat';
import { conPointcost } from '../point_costs';

export class Constitution extends CharacterStat {
  constructor(initalValue?: number) {
    if (initalValue === undefined) {
      initalValue = 1;
    }
    super('CON', initalValue, conPointcost);
  }
}
