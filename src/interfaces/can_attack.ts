import { EquipmentProperty } from "../defs";

export interface CanAttack {
  Speed: number;
  Strength: number;
  AdjustSpeed(by: number) : void;
  AdjustStrength(by: number) : void;
  Properties: EquipmentProperty[];
  // MakeMagical(...)
}

