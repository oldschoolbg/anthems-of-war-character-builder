import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Mind extends CharacterStat {
  constructor() {
    super('MND', 0, phyDexMndPointcost)
  }
}
