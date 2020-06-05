import { CharacterStat } from "./character-stat";
import { phy_dex_mnd_pointcost } from "../../defs/point_costs";

export class Dexterity implements CharacterStat {
  Key: string = "DEX";
  Value: number = 0;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 0 || to > 8) {
      throw new Error("Must be between zero and eight");
    }
    this.Value = to;
    this.PointsCost = phy_dex_mnd_pointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}