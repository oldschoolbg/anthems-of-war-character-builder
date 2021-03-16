import { CharacterStat } from './character-stat';
import { conPointcost } from '../point_costs';

export class Constitution extends CharacterStat {
  constructor() {
    super('CON', 1, conPointcost);
  }
}
