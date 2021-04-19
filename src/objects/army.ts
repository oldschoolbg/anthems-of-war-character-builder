
import { CharacterClasses } from "../defs";
import { Character } from "./character";

export class Army {
  Name: string | undefined;
  private _leader: Character;
  public get Leader(): Character {
    return this._leader;
  }

  private _members: Character[] = [];
  public get Members(): Character[] {
    return this._members
  }

  private _targetPointsCost: number;
  public get TargetPointsCost(): number {
    return this._targetPointsCost;
  }

  public get PointsCost(): number {
    return this._leader.PointsCost
          + this._members.map(m => m.PointsCost).reduce((a, b) => a + b, 0);
  }

  public get TotalAllowedSkillSlots(): number {
    return Math.floor(this._targetPointsCost / 50)
  }
  public get TotalUsedSkillSlots(): number {
    return this._members.map(m => m.Skills.length).reduce((a, b) => a + b, 0);
  }

  constructor(targetPointsCost: number, leader: Character) {
    if (leader.CharacterClass.Key === CharacterClasses.Instinct) {
      throw new Error('The Leader of an Army cannot have the Instinct Trait')
    }
    this._targetPointsCost = targetPointsCost;
    this._leader = leader;
  }
  get IsValid(): boolean {
    return this.Name !== undefined;
  }
}
