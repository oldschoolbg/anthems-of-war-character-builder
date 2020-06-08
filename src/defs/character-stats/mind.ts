import { CharacterStat } from './character-stat';
import { phyDexMndPointcost } from '../point_costs';

export class Mind implements CharacterStat {
  Key: string = 'MND';
  Value: number = 0;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 0 || to > 8) {
      throw new Error('Must be between zero and eight');
    }
    this.Value = to;
    this.PointsCost = phyDexMndPointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}
