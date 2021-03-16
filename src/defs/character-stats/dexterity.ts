import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Dexterity extends CharacterStat {
  constructor() {
    super('DEX', 0, phyDexMndPointcost)
  }
}
