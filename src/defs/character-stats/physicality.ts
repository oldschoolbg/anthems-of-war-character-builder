import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Physicality extends CharacterStat {
  constructor() {
    super('PHY', 0, phyDexMndPointcost)
  }
}
