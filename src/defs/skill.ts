import { Character } from '..';
import { IsCommander, Keyed, Magicable } from '../interfaces';
import { CharacterClass } from './character_class';
import { Trait, Traits } from './trait';

export enum Skills {
  ArmorTraining = "Armor Training",
  Avenger = "Avenger",
  Backstab = "Backstab",
  BattleThrill = "Battle Thrill",
  BeserkerRage = "Beserker Rage",
  Bodyguard = "Bodyguard",
  DefensivePosture = "Defensive Posture",
  Duelist = "Duelist",
  Eager = "Eager",
  EscapeArtist = "Escape Artist",
  ExpertAim = "Expert Aim",
  Fearless = "Fearless",
  FocusedAttacker = "Focused Attacker",
  FormationFighter = "Formation Fighter",
  GiantsGrip = "Giant's Grip",
  Grappler = "Grappler",
  Interceptor = "Interceptor",
  Jumper = "Jumper",
  LongShot = "Long Shot",
  Lucky = "Lucky",
  Medic = "Medic",
  MountedWarrior = "Mounted Warrior",
  NeverTellMeTheOdds = "Never Tell Me The Odds",
  NimbleAttacker = "Nimble Attacker",
  PowerAttack = "Power Attack",
  QuickDraw = "Quick Draw",
  Reinforcements = "Reinforcements",
  RendArmor = "Rend Armor",
  Scout = "Scout",
  SeasonedVeteran = "Seasoned Veteran",
  ShieldSacrifice = "Shield Sacrifice",
  Skirmisher = "Skirmisher",
  Sniper = "Sniper",
  Stealthy = "Stealthy",
  Stubborn = "Stubborn",
  Survivalist = "Survivalist",
  Swap = "Swap",
  TerrainExpert = "Terrain Expert",
  ThirstForBlood = "Thirst For Blood",
  TrainedSprinter = "Trained Sprinter",
  Trample = "Trample",
  TwoWeaponSpecialist = "Two Weapon Specialist",
  UncannyReactionTime = "Uncanny Reaction Time",
  VengefulSpirit = "Vengeful Spirit",
  WeaponMaster = "Weapon Master",
  ZenDodger = "Zen Dodger",
  // Spell Caster Skills
  Apprenticeship = "Apprenticeship",
  LatentSpellcaster = "Latent Spellcaster",
  MultiSchoolSpellcaster = "Multi School Spellcaster",
  PreparedIllusions = "Prepared Illusions",
  SpellVampire = "Spell Vampire",
  VersatileSpellcaster = "Versatile Spellcaster",
  // Advanced Skills
  Ambusher = "Ambusher",
  FearlessPresence = "Fearless Presence",
  ForceOfWill = "Force Of Will",
  SquadLeader = "Squad Leader",
  WitchHunter = "Witch Hunter",
  // Squad Skills
  Barrage = "Barrage",
  BattleDrills = "Battle Drills",
  BeastMaster = "Beast Master",
  CoordinatedCharge = "Coordinated Charge",
  DefensiveFormation = "Defensive Formation",
  ShieldWall = "Shield Wall"
}

export class Skill implements Keyed {
  constructor(key: Skills, description: string, shortDescription?: string) {
    this._key = key;
    this._description = description;
    this._shortDescription = shortDescription;
  }

  static get Options(): Skill[] {
    return [
      Skill.ArmorTraining(),
      Skill.Avenger(),
      Skill.Backstab(),
      Skill.BattleThrill(),
      Skill.BeserkerRage(),
      Skill.Bodyguard(),
      Skill.DefensivePosture(),
      Skill.Duelist(),
      Skill.Eager(),
      Skill.EscapeArtist(),
      Skill.ExpertAim(),
      Skill.Fearless(),
      Skill.FocusedAttacker(),
      Skill.FormationFighter(),
      Skill.GiantsGrip(),
      Skill.Grappler(),
      Skill.Interceptor(),
      Skill.Jumper(),
      Skill.LongShot(),
      Skill.Lucky(),
      Skill.Medic(),
      Skill.MountedWarrior(),
      Skill.NeverTellMeTheOdds(),
      Skill.NimbleAttacker(),
      Skill.PowerAttack(),
      Skill.QuickDraw(),
      Skill.Reinforcements(),
      Skill.RendArmor(),
      Skill.Scout(),
      Skill.SeasonedVeteran(),
      Skill.ShieldSacrifice(),
      Skill.Skirmisher(),
      Skill.Sniper(),
      Skill.Stealthy(),
      Skill.Stubborn(),
      Skill.Survivalist(),
      Skill.Swap(),
      Skill.TerrainExpert(),
      Skill.ThirstForBlood(),
      Skill.TrainedSprinter(),
      Skill.Trample(),
      Skill.TwoWeaponSpecialist(),
      Skill.UncannyReactionTime(),
      Skill.VengefulSpirit(),
      Skill.WeaponMaster(),
      Skill.ZenDodger(),
  // Spell Caster Skills
    Skill.Apprenticeship(),
    Skill.LatentSpellcaster(),
    Skill.MultiSchoolSpellcaster(),
    Skill.PreparedIllusions(),
    Skill.SpellVampire(),
    Skill.VersatileSpellcaster(),
  // Advanced Skills
    Skill.Ambusher(),
    Skill.FearlessPresence(),
    Skill.ForceOfWill(),
    Skill.SquadLeader(),
    Skill.WitchHunter(),
  // Squad Skills
    Skill.Barrage(),
    Skill.BattleDrills(),
    Skill.BeastMaster(),
    Skill.CoordinatedCharge(),
    Skill.DefensiveFormation(),
    Skill.ShieldWall()
    ]
  }

  private _onlyCommander: boolean = false;
  get OnlyCommander(): boolean {
    return this._onlyCommander;
  }
  private _commanderOverride: boolean = false;
  get CommanderOverride(): boolean {
    return this._commanderOverride;
  }
  private _pointsCost: number = 4;
  get PointsCost(): number {
    return this._pointsCost;
  }
  private _key: Skills;
  get Key(): Skills {
    return this._key;
  }
  private _description: string;
  get Description(): string {
    return this._description;
  }
  private _shortDescription: string | undefined;
  get ShortDescription(): string | undefined { return this._shortDescription; }

  private _skillPrerequisites: Keyed[] = [];
  // character must have all these skills or you cannot add this skill
  get SkillPrerequisites(): Keyed[] {
    return this._skillPrerequisites;
  }
  private _traitPrerequisites: Keyed[] = [];
  // character must have all these traits or you cannot add this skill
  get TraitPrerequisites(): Keyed[] {
    return this._traitPrerequisites;
  }
  private _characterClassPrequisite: Keyed[] = [];
  // character must have all these classes or you cannot add this skill
  get CharacterClassPrerequisites(): Keyed[] {
    return this._characterClassPrequisite;
  }
  AdjustPointsCost(by: number) {
    this._pointsCost += by;
  }
  
  private _kryptonite: string[] = [];
  // character cannot have both self and self.Kryptonite
  get Kryptonite(): string[] { return this._kryptonite; }

  private _addEffect: (char: Magicable | IsCommander, skill?: Skill) => void = (char: Magicable | IsCommander, skill?: Skill) => {
    return;
  };
  get AddEffect() : (char:  Magicable | IsCommander, skill?: Skill) => void { return this._addEffect; }
  private _removeEffect: (char: Magicable | IsCommander, skill?: Skill) => void = (char: Magicable | IsCommander) => {
    return;
  };
  get RemoveEffect() : (char: Magicable | IsCommander, skill?: Skill) => void { return this._removeEffect; }

  setAddEffect(addEffect: (char: Magicable | IsCommander, skill?: Skill) => void): Skill {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (char: Magicable | IsCommander, skill?: Skill) => void): Skill {
    this._removeEffect = removeEffect;
    return this;
  }
  
  setSkillPrerequisite(prop: Keyed): Skill {
    if (!this._skillPrerequisites.find((p: Keyed) => p.Key === prop.Key)) {
      this._skillPrerequisites.push(prop);
    }
    return this;
  }
  removeSkillPrerequisite(prop: Keyed): Skill {
    this._skillPrerequisites = this._skillPrerequisites.filter((p: Keyed) => p.Key !== prop.Key);
    return this;
  }
  
  setTraitPrerequisite(prop: Keyed): Skill {
    if (!this._traitPrerequisites.find((p: Keyed) => p.Key === prop.Key)) {
      this._traitPrerequisites.push(prop);
    }
    return this;
  }
  removeTraitPrerequisite(prop: Keyed): Skill {
    this._traitPrerequisites = this._traitPrerequisites.filter((p: Keyed) => p.Key !== prop.Key);
    return this;
  }
  
  setCharacterClassPrerequisite(prop: Keyed): Skill {
    if (!this._characterClassPrequisite.find((p: Keyed) => p.Key === prop.Key)) {
      this._characterClassPrequisite.push(prop);
    }
    return this;
  }
  removeCharacterClassPrerequisite(prop: Keyed): Skill {
    this._characterClassPrequisite = this._characterClassPrequisite.filter((p: Keyed) => p.Key !== prop.Key);
    return this;
  }

  setKryptonite(key: string): Skill {
    if (!this._kryptonite.find((p: string) => p ===key)) {
      this._kryptonite.push(key);
    }
    return this;
  }
  removeKryptonite(key: string): Skill {
    this._kryptonite = this._kryptonite.filter((p: string) => p !== key);
    return this;
  }

  setOnlyCommander(): Skill {
    this._onlyCommander = !this._onlyCommander;
    return this;
  }

  /** If this is set, commanders can ignore pre-requisites */
  setCommanderOverride(): Skill {
    this._commanderOverride = !this._commanderOverride;
    return this;
  }

  private _checkValidity(character: Character): string | undefined {
    const index = character.Skills.findIndex((e: Keyed) => this.Key === e.Key);
    if (index !== -1) {
      return `Cannot add ${this.Key} as this Character already has it`;
    }
    if (this._traitPrerequisites.some((wp) => !character.Traits.find((p: Keyed) => p.Key === wp.Key))) {
      return `Cannot add ${this.Key} as Character must have ${this._traitPrerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`;
    }
    if (this._skillPrerequisites.some((wp) => !character.Skills.find((p: Keyed) => p.Key === wp.Key))) {
      return `Cannot add ${this.Key} as Character must have ${this._skillPrerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`;
    }
    if (this._characterClassPrequisite.length > 0 &&
      !this._characterClassPrequisite.some((wp) => character.CharacterClass.Key === wp.Key)) {
      return `Cannot add ${this.Key} as Character must be ${this._characterClassPrequisite.map(
          (p) => p.Key,
        ).join(', ')}.`;
    }
    if (this.OnlyCommander && !character.IsCommander) {
      return `Cannot add ${this.Key} as this Character is not a Commander`;
    }
    if (this.Kryptonite.length > 0) {
      const skillKrptonite = character.Skills.filter((s: Keyed) => {
        return this.Kryptonite.find(k => k === s.Key) !== undefined;
      });
      if (skillKrptonite.length > 0) {
        return `Cannot add ${this.Key} as Character has the ${skillKrptonite.map(
            (p) => p.Key,
          ).join(', ')} Skill.`;
      }
      const traitKryptonite = character.Traits.filter((s: Keyed) => {
        return this.Kryptonite.find(k => k === s.Key) !== undefined;
      });
      if (traitKryptonite.length > 0) {
        return `Cannot add ${this.Key} as Character has the ${traitKryptonite.map(
            (p) => p.Key,
          ).join(', ')} Trait.`;
      }
    }
    return undefined;
  }

  ValidFor(character: Character): boolean {
    return this._checkValidity(character) === undefined;
  }

  CanAdd(character: Character): boolean {
    const errorMessage = this._checkValidity(character);
    if (errorMessage !== undefined) {
      throw new Error(errorMessage);
    }
    return true;
  }

  static ArmorTraining(): Skill {
    return new Skill(
      Skills.ArmorTraining,
      ''
    );
  };

  static Avenger(): Skill {
    return new Skill(
      Skills.Avenger,
      ''
    );
  };

  static Backstab(): Skill {
    return new Skill(
      Skills.Backstab,
      ''
    );
  };

  static BattleThrill(): Skill {
    return new Skill(
      Skills.BattleThrill, 
      ''
    );
  };

  static BeserkerRage(): Skill {
    return new Skill(
      Skills.BeserkerRage,
      'Add a +1 bonus to weapon strength when alone in melee combat with more than one enemy.',
    );
  }

  static Bodyguard(): Skill {
    return new Skill(
      Skills.Bodyguard,
      ''
    );
  };

  static DefensivePosture(): Skill {
    return new Skill(
      Skills.DefensivePosture,
      ''
    );
  };

  static Duelist(): Skill {
    return new Skill(
      Skills.Duelist,
      ''
    );
  };

  static Eager(): Skill {
    return new Skill(
      Skills.Eager,
      ''
    );
  };

  static EscapeArtist(): Skill {
    return new Skill(
      Skills.EscapeArtist,
      ''
    );
  };

  static ExpertAim(): Skill {
    return new Skill(
      Skills.ExpertAim,
      ''
    )
  }

  static Fearless(): Skill {
    return new Skill(
      Skills.Fearless,
      ''
    )
  }
  static FocusedAttacker(): Skill {
    return new Skill(
      Skills.FocusedAttacker,
      ''
    )
  }
  static FormationFighter(): Skill {
    return new Skill(
      Skills.FormationFighter,
      ''
    )
  }
  static GiantsGrip(): Skill {
    return new Skill(
      Skills.GiantsGrip,
      ''
    )
  }
  static Grappler(): Skill {
    return new Skill(
      Skills.Grappler,
      ''
    )
  }
  static Interceptor(): Skill {
    return new Skill(
      Skills.Interceptor,
      ''
    )
  }
  static Jumper(): Skill {
    return new Skill(
      Skills.Jumper,
      ''
    )
  }
  static LongShot(): Skill {
    return new Skill(
      Skills.LongShot,
      ''
    )
  }
  static Lucky(): Skill {
    return new Skill(
      Skills.Lucky,
      ''
    )
  }
  static Medic(): Skill {
    return new Skill(
      Skills.Medic,
      ''
    )
  }
  static MountedWarrior(): Skill {
    return new Skill(
      Skills.MountedWarrior,
      ''
    )
  }
  static NeverTellMeTheOdds(): Skill {
    return new Skill(
      Skills.NeverTellMeTheOdds,
      ''
    )
  }
  static NimbleAttacker(): Skill {
    return new Skill(
      Skills.NimbleAttacker,
      ''
    )
  }
  static PowerAttack(): Skill {
    return new Skill(
      Skills.PowerAttack,
      ''
    )
  }
  static QuickDraw(): Skill {
    return new Skill(
      Skills.QuickDraw,
      ''
    )
  }
  static Reinforcements(): Skill {
    return new Skill(
      Skills.Reinforcements,
      ''
    )
  }
  static RendArmor(): Skill {
    return new Skill(
      Skills.RendArmor,
      ''
    )
  }
  static Scout(): Skill {
    return new Skill(
      Skills.Scout,
      ''
    )
  }
  static SeasonedVeteran(): Skill {
    return new Skill(
      Skills.SeasonedVeteran,
      ''
    )
  }
  static ShieldSacrifice(): Skill {
    return new Skill(
      Skills.ShieldSacrifice,
      ''
    )
  }
  static Skirmisher(): Skill {
    return new Skill(
      Skills.Skirmisher,
      ''
    )
  }
  static Sniper(): Skill {
    return new Skill(
      Skills.Sniper,
      ''
    )
  }
  static Stealthy(): Skill {
    return new Skill(
      Skills.Stealthy,
      ''
    )
  }
  static Stubborn(): Skill {
    return new Skill(
      Skills.Stubborn,
      ''
    )
  }
  static Survivalist(): Skill {
    return new Skill(
      Skills.Survivalist,
      ''
    )
  }
  static Swap(): Skill {
    return new Skill(
      Skills.Swap,
      ''
    )
  }
  static TerrainExpert(): Skill {
    return new Skill(
      Skills.TerrainExpert,
      ''
    )
  }
  static ThirstForBlood(): Skill {
    return new Skill(
      Skills.ThirstForBlood,
      ''
    )
  }
  static TrainedSprinter(): Skill {
    return new Skill(
      Skills.TrainedSprinter,
      ''
    )
  }
  static Trample(): Skill {
    return new Skill(
      Skills.Trample,
      ''
    )
  }
  static TwoWeaponSpecialist(): Skill {
    return new Skill(
      Skills.TwoWeaponSpecialist,
      ''
    )
  }
  static UncannyReactionTime(): Skill {
    return new Skill(
      Skills.UncannyReactionTime,
      ''
    )
  }
  static VengefulSpirit(): Skill {
    return new Skill(
      Skills.VengefulSpirit,
      ''
    )
  }
  static WeaponMaster(): Skill {
    return new Skill(
      Skills.WeaponMaster,
      ''
    )
  }
  static ZenDodger(): Skill {
    return new Skill(
      Skills.ZenDodger,
      ''
    )
  }

  // SPELLCASTING SKILLS
  static Apprenticeship(): Skill {
    return new Skill(
      Skills.Apprenticeship,
      ''
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setCommanderOverride();
  }
  static LatentSpellcaster(): Skill {
    return new Skill(
      Skills.LatentSpellcaster,
      ''
    )
    .setKryptonite(Traits.Spellcaster)
    .setKryptonite(Skills.MultiSchoolSpellcaster)
    .setKryptonite(Skills.VersatileSpellcaster)
    .setAddEffect((char: Magicable | IsCommander) => {
      (char as Magicable).SetSpellPoolLimit(1);
      (char as Magicable).SetSpellcastingSchoolsLimit(1);
    });;
  }
  static MultiSchoolSpellcaster(): Skill {
    return new Skill(
      Skills.MultiSchoolSpellcaster,
      'This character can pick spells from two spellcasting schools instead of one.',
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setAddEffect((char: Magicable | IsCommander) => (char as Magicable).SetSpellcastingSchoolsLimit(2));
  }
  static PreparedIllusions(): Skill {
    return new Skill(
      Skills.PreparedIllusions,
      ''
    )
    .setTraitPrerequisite(Trait.Spellcaster());
  }
  static SpellVampire(): Skill {
    return new Skill(
      Skills.SpellVampire,
      ''
    )
    .setTraitPrerequisite(Trait.Spellcaster());
  }
  static VersatileSpellcaster(): Skill {
    return new Skill(
      Skills.VersatileSpellcaster,
      'The character knows two extra spells.',
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setAddEffect((char: Magicable | IsCommander) => (char as Magicable).SetSpellPoolLimit((char as Magicable).SpellPoolLimit + 2));
  }

  // ADVANCED SKILLS
  static Ambusher(): Skill {
    return new Skill(
      Skills.Ambusher,
      ''
    )
    .setSkillPrerequisite(Skill.Scout());
  }
  static FearlessPresence(): Skill {
    return new Skill(
      Skills.FearlessPresence,
      ''
    )
    .setOnlyCommander();
  }
  static ForceOfWill(): Skill {
    return new Skill(
      Skills.ForceOfWill,
      ''
    )
    .setOnlyCommander()
  }
  static SquadLeader(): Skill {
    return new Skill(
      Skills.SquadLeader,
      ''
    )
    .setCharacterClassPrerequisite(CharacterClass.Regular())
    .setAddEffect(
      (char: Magicable | IsCommander, skill?: Skill) => {
       if ((char as IsCommander).IsCommander) {
         skill?.AdjustPointsCost(-2);
       }   
      });
  }
  static WitchHunter(): Skill {
    return new Skill(
      Skills.WitchHunter,
      ''
    )
    .setKryptonite(Trait.Spellcaster().Key)
    .setKryptonite(Skill.LatentSpellcaster().Key)
  }
  
  // SQUAD SKILLS
  static Barrage(): Skill {
    return new Skill(
      Skills.Barrage,
      ''
    )
  }
  static BattleDrills(): Skill {
    return new Skill(
      Skills.BattleDrills,
      ''
    )
  }
  static BeastMaster(): Skill {
    return new Skill(
      Skills.BeastMaster,
      ''
    )
    .setSkillPrerequisite(Skill.SquadLeader());
  }
  static CoordinatedCharge(): Skill {
    return new Skill(
      Skills.CoordinatedCharge,
      ''
    )
  }
  static DefensiveFormation(): Skill {
    return new Skill(
      Skills.DefensiveFormation,
      ''
    )
  }
  static ShieldWall(): Skill {
    return new Skill(
      Skills.ShieldWall,
      ''
    )
  }
}
