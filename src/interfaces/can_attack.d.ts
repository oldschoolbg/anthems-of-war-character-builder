import { WeaponProperty } from "../defs/weapon_property";

export interface CanAttack {
  Speed: number;
  Strength: number;
  Properties: WeaponProperty[];
  AdjustSpeed(by: number) : void;
  AdjustStrength(by: number) : void;
}