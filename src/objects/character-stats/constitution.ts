import { CharacterStat } from "./character-stat";
import { con_pointcost } from "../../defs/point_costs";

export class Constitution implements CharacterStat {
  Key: string = "CON";
  Value: number = 1;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 1 || to > 8) {
      throw new Error("Must be between one and eight");
    }
    this.Value = to;
    this.PointsCost = con_pointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}
