import { IsCommander, Keyed, Magicable } from '../interfaces';
import { CharacterClass } from './character_class';
import { Trait } from './trait';

export enum Skills {
  ArmourTraining = "Armour Training",
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
  GiantsGrip = "Giants Grip",
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
  WeaponMaster = "Weapon Master",
  ZenDodger = "Zen Dodger"
}

export enum SpellCasterSkills {
  Apprenticeship = "Apprenticeship",
  LatentSpellcaster = "Latent Spellcaster",
  MultiSchoolSpellcaster = "Multi School Spellcaster",
  PreparedIllusions = "Prepared Illusions",
  SpellVampire = "Spell Vampire",
  VersatileSpellcaster = "Versatile Spellcaster"
}

export enum AdvancedSkills {
  Ambusher = "Ambusher",
  FearlessPresence = "Fearless Presence",
  ForceOfWill = "Force Of Will",
  SquadLeader = "Squad Leader",
  WitchHunter = "Witch Hunter"
}

export class Skill implements Keyed {
  constructor(key: string, description: string) {
    this._key = key;
    this._description = description;
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
  private _key: string;
  get Key(): string {
    return this._key;
  }
  private _description: string;
  get Description(): string {
    return this._description;
  }

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

  static ArmourTraining(): Skill {
    return new Skill(
      'Armour Training',
      ''
    );
  };

  static Avenger(): Skill {
    return new Skill(
      'Avenger',
      ''
    );
  };

  static Backstab(): Skill {
    return new Skill(
      'Backstab',
      ''
    );
  };

  static BattleThrill(): Skill {
    return new Skill(
      'Battle Thrill', 
      ''
    );
  };

  static BeserkerRage(): Skill {
    return new Skill(
      'Berserker Rage',
      'Add a +1 bonus to weapon strength when alone in melee combat with more than one enemy.',
    );
  }

  static Bodyguard(): Skill {
    return new Skill(
      'Bodyguard',
      ''
    );
  };

  static DefensivePosture(): Skill {
    return new Skill(
      'Defensive Posture',
      ''
    );
  };

  static Duelist(): Skill {
    return new Skill(
      'Duelist',
      ''
    );
  };

  static Eager(): Skill {
    return new Skill(
      'Eager',
      ''
    );
  };

  static EscapeArtist(): Skill {
    return new Skill(
      'Escape Artist',
      ''
    );
  };

  static ExpertAim(): Skill {
    return new Skill(
      'Expert Aim',
      ''
    )
  }

  static Fearless(): Skill {
    return new Skill(
      'Fearless',
      ''
    )
  }
  static FocusedAttacker(): Skill {
    return new Skill(
      'Focused Attacker',
      ''
    )
  }
  static FormationFighter(): Skill {
    return new Skill(
      'Formation Fighter',
      ''
    )
  }
  static GiantsGrip(): Skill {
    return new Skill(
      "Giant's Grip",
      ''
    )
  }
  static Grappler(): Skill {
    return new Skill(
      'Grappler',
      ''
    )
  }
  static Interceptor(): Skill {
    return new Skill(
      'Interceptor',
      ''
    )
  }
  static Jumper(): Skill {
    return new Skill(
      'Jumper',
      ''
    )
  }
  static LongShot(): Skill {
    return new Skill(
      'Long Shot',
      ''
    )
  }
  static Lucky(): Skill {
    return new Skill(
      'Lucky',
      ''
    )
  }
  static Medic(): Skill {
    return new Skill(
      'Medic',
      ''
    )
  }
  static MountedWarrior(): Skill {
    return new Skill(
      'Mounted Warrior',
      ''
    )
  }
  static NeverTellMeTheOdds(): Skill {
    return new Skill(
      'Never Tell Me the Odds', 
      ''
    )
  }
  static NimbleAttacker(): Skill {
    return new Skill(
      'Nimble Attacker',
      ''
    )
  }
  static PowerAttack(): Skill {
    return new Skill(
      'Power Attack',
      ''
    )
  }
  static QuickDraw(): Skill {
    return new Skill(
      'Quick Draw',
      ''
    )
  }
  static Reinforcements(): Skill {
    return new Skill(
      'Reinforcements',
      ''
    )
  }
  static RendArmor(): Skill {
    return new Skill(
      'Rend Armor',
      ''
    )
  }
  static Scout(): Skill {
    return new Skill(
      'Scout',
      ''
    )
  }
  static SeasonedVeteran(): Skill {
    return new Skill(
      'Seasoned Veteran',
      ''
    )
  }
  static ShieldSacrifice(): Skill {
    return new Skill(
      'Shield Sacrifice',
      ''
    )
  }
  static Skirmisher(): Skill {
    return new Skill(
      'Skirmisher',
      ''
    )
  }
  static Sniper(): Skill {
    return new Skill(
      'Sniper',
      ''
    )
  }
  static Stealthy(): Skill {
    return new Skill(
      'Stealthy',
      ''
    )
  }
  static Stubborn(): Skill {
    return new Skill(
      'Stubborn',
      ''
    )
  }
  static Survivalist(): Skill {
    return new Skill(
      'Survivalist',
      ''
    )
  }
  static Swap(): Skill {
    return new Skill(
      'Swap',
      ''
    )
  }
  static TerrainExpert(): Skill {
    return new Skill(
      'Terrain Expert',
      ''
    )
  }
  static ThirstForBlood(): Skill {
    return new Skill(
      'Thirst for Blood',
      ''
    )
  }
  static TrainedSprinter(): Skill {
    return new Skill(
      'Trained Sprinter',
      ''
    )
  }
  static Trample(): Skill {
    return new Skill(
      'Trample',
      ''
    )
  }
  static TwoWeaponSpecialist(): Skill {
    return new Skill(
      'Two-weapon Specialist',
      ''
    )
  }
  static UncannyReactionTime(): Skill {
    return new Skill(
      'Uncanny Reaction Time',
      ''
    )
  }
  static VengefulSpirit(): Skill {
    return new Skill(
      'Vengeful Spirit',
      ''
    )
  }
  static WeaponMaster(): Skill {
    return new Skill(
      'Weapon Master',
      ''
    )
  }
  static ZenDodger(): Skill {
    return new Skill(
      'Zen Dodger',
      ''
    )
  }

  // SPELLCASTING SKILLS
  static Apprenticeship(): Skill {
    return new Skill(
      'Apprenticeship',
      ''
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setCommanderOverride();
  }
  static LatentSpellcaster(): Skill {
    return new Skill(
      'Latent Spellcaster',
      ''
    )
    .setKryptonite(Trait.Spellcaster().Key)
    .setKryptonite(Skill.MultiSchoolSpellcaster().Key)
    .setKryptonite(Skill.VersatileSpellcaster().Key)
    .setAddEffect((char: Magicable | IsCommander) => {
      (char as Magicable).SetSpellPoolLimit(1);
      (char as Magicable).SetSpellcastingSchoolsLimit(1);
    });;
  }
  static MultiSchoolSpellcaster(): Skill {
    return new Skill(
      'Multi School Spellcaster',
      'This character can pick spells from two spellcasting schools instead of one.',
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setAddEffect((char: Magicable | IsCommander) => (char as Magicable).SetSpellcastingSchoolsLimit(2));
  }
  static PreparedIllusions(): Skill {
    return new Skill(
      'Prepared Illusions',
      ''
    )
    .setTraitPrerequisite(Trait.Spellcaster());
  }
  static SpellVampire(): Skill {
    return new Skill(
      'Spell Vampire',
      ''
    )
    .setTraitPrerequisite(Trait.Spellcaster());
  }
  static VersatileSpellcaster(): Skill {
    return new Skill(
      'Versatile Spellcaster',
      'The character knows two extra spells.',
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setAddEffect((char: Magicable | IsCommander) => (char as Magicable).SetSpellPoolLimit((char as Magicable).SpellPoolLimit + 2));
  }

  // ADVANCED SKILLS
  static Ambusher(): Skill {
    return new Skill(
      'Ambusher',
      ''
    )
    .setSkillPrerequisite(Skill.Scout());
  }
  static FearlessPresence(): Skill {
    return new Skill(
      'Fearless Presence',
      ''
    )
    .setOnlyCommander();
  }
  static ForceOfWill(): Skill {
    return new Skill(
      'Force of Will',
      ''
    )
    .setOnlyCommander()
  }
  static SquadLeader(): Skill {
    return new Skill(
      'Squad Leader',
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
      'Witch Hunter',
      ''
    )
    .setKryptonite(Trait.Spellcaster().Key)
    .setKryptonite(Skill.LatentSpellcaster().Key)
  }
  
  // SQUAD SKILLS
  static Barrage(): Skill {
    return new Skill(
      'Barrage',
      ''
    )
  }
  static BattleDrills(): Skill {
    return new Skill(
      'Battle Drills',
      ''
    )
  }
  static BeastMaster(): Skill {
    return new Skill(
      'Beastmaster',
      ''
    )
    .setSkillPrerequisite(Skill.SquadLeader());
  }
  static CoordinatedCharge(): Skill {
    return new Skill(
      'Coordinated Charge',
      ''
    )
  }
  static DefensiveFormation(): Skill {
    return new Skill(
      'Defensive Formation',
      ''
    )
  }
  static ShieldWall(): Skill {
    return new Skill(
      'Shield Wall',
      ''
    )
  }
}
