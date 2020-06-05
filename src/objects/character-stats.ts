import { PHY_DEX_MND_pointcost, CON_pointcost } from "../rules/point_costs";

export interface CharacterStat {
  Key: string;
  Value: number;
  PointsCost: number;

  SetValue(to: number) : void;
  AdjustBy(amount: number) : void;
}


export class MOV implements CharacterStat {
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

export class PHY implements CharacterStat {
  Key: string = "PHY";
  Value: number = 0;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 0 || to > 8) {
      throw new Error("Must be between zero and eight");
    }
    this.Value = to;
    this.PointsCost = PHY_DEX_MND_pointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}

export class DEX implements CharacterStat {
  Key: string = "DEX";
  Value: number = 0;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 0 || to > 8) {
      throw new Error("Must be between zero and eight");
    }
    this.Value = to;
    this.PointsCost = PHY_DEX_MND_pointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}

export class MND implements CharacterStat {
  Key: string = "MND";
  Value: number = 0;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 0 || to > 8) {
      throw new Error("Must be between zero and eight");
    }
    this.Value = to;
    this.PointsCost = PHY_DEX_MND_pointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}


export class CON implements CharacterStat {
  Key: string = "CON";
  Value: number = 1;
  PointsCost: number = 0;
  SetValue(to: number): void {
    if (to < 1 || to > 8) {
      throw new Error("Must be between one and eight");
    }
    this.Value = to;
    this.PointsCost = CON_pointcost[to];
  }
  AdjustBy(by: number): void {
    this.Value += by;
  }
}
