
import { CharacterClasses } from "../defs";
import { Character } from "./character";

export class Army {
  get IsValid(): boolean {
    return this.Name !== undefined;
  }
  Name: string | undefined;
  private _leader!: Character;
  public get Leader(): Character {
    return this._leader;
  }
  public set Leader(value: Character) {
    if (!value.IsCommander) {
      throw new Error('This Character cannot be your leader')
    }
    this._leader = value;
  }

  private _members: Character[] = [];
  public get Members(): Character[] {
    return this._members
  }

  private _targetPointsCost: number;
  public get TargetPointsCost(): number {
    return this._targetPointsCost;
  }
  public set TargetPointsCost(value: number) {
    this._targetPointsCost = value;
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

  public addMember(character: Character): Army {
    this._members.push(character);
    return this;
  }

  constructor(targetPointsCost: number, leader: Character) {
    this.Leader = leader;
    this._targetPointsCost = targetPointsCost;
  }
}
