import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Dexterity extends CharacterStat {
  constructor(initalValue?: number) {
    if (initalValue === undefined) {
      initalValue = 0;
    }
    super('DEX', initalValue, phyDexMndPointcost)
  }
}
