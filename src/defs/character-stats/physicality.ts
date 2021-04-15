import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Physicality extends CharacterStat {
  constructor(initalValue?: number) {
    if (initalValue === undefined) {
      initalValue = 0;
    }
    super('PHY', initalValue, phyDexMndPointcost)
  }
}
