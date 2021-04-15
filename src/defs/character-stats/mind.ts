import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Mind extends CharacterStat {
  constructor(initalValue?: number) {
    if (initalValue === undefined) {
      initalValue = 0;
    }
    super('MND', initalValue, phyDexMndPointcost)
  }
}
