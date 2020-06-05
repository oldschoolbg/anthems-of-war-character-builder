import { CharacterStat } from "./character-stat";

export class Move implements CharacterStat {
  Key: string = "MOV";
  Value: number = 4;
  PointsCost: number = 0;
  SetValue(to: number): void {
    this.Value = to;
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}