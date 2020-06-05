
export interface CharacterStat {
  Key: string;
  Value: number;
  PointsCost: number;

  SetValue(to: number) : void;
  AdjustBy(amount: number) : void;
}

