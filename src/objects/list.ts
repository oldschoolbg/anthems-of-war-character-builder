
import { Character } from "./character";

export class List {
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
    let leaderCost = 0;
    if (this._leader !== undefined) {
      leaderCost = this._leader.PointsCost;
    }
    return leaderCost
          + this._members.map(m => m.PointsCost).reduce((a, b) => a + b, 0);
  }

  public get TotalAllowedSkillSlots(): number {
    return Math.floor(this._targetPointsCost / 50)
  }
  public get TotalUsedSkillSlots(): number {
    return this._members.map(m => m.Skills.length).reduce((a, b) => a + b, 0);
  }

  public AddMember(character: Character): List {
    this._members.push(character);
    return this;
  }
  public RemoveMember(character: Character): List {
    const index = this._members.findIndex(m => m.Name === character.Name);
    if (index !== -1) {
      this._members = this._members.splice(index, 1);
    }
    return this;
  }

  private constructor(targetPointsCost: number) {
    this._targetPointsCost = targetPointsCost;
  }

  static create(targetPointsCost: number): List {
    return new List(targetPointsCost);
  }

  static FromFile(stringInput: string): List {
    const input = JSON.parse(stringInput);
    const result = List.create(input.TargetPointsCost);
    result.Name = input.Name;
    result.Leader = Character.FromJson(input.Leader);
    input.Members.map((m: string) => result.AddMember(Character.FromJson(m)))
    return result;
  }
  ToFile(): string {
    return JSON.stringify({
      Name: this.Name,
      Leader: this.Leader,
      TargetPointsCost: this.TargetPointsCost,
      Members: this.Members
    });
  }
}
