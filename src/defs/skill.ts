import { Character } from '..';
import { Addable, IsCommander, Keyed, Magicable, ValidityResponse } from '../interfaces';
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
  GiantSlayer = "Giant Slayer",
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

export class Skill implements Keyed, Addable {
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
      Skill.GiantGrip(),
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

  private _checkAddValidity(character: Character): ValidityResponse {
    const index = character.Skills.findIndex((e: Keyed) => this.Key === e.Key);
    if (index !== -1) {
      return ValidityResponse.Errored(
        `Cannot add ${this.Key} as this Character already has it`
      );
    }
    if (this._traitPrerequisites.some((wp) => !character.Traits.find((p: Keyed) => p.Key === wp.Key))) {
      return ValidityResponse.Errored(
        `Cannot add ${this.Key} as Character must have ${this._traitPrerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`
      );
    }
    if (this._skillPrerequisites.some((wp) => !character.Skills.find((p: Keyed) => p.Key === wp.Key))) {
      return ValidityResponse.Errored(
        `Cannot add ${this.Key} as Character must have ${this._skillPrerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`
      );
    }
    if (this._characterClassPrequisite.length > 0 &&
      !this._characterClassPrequisite.some((wp) => character.CharacterClass.Key === wp.Key)) {
      return ValidityResponse.Errored(
        `Cannot add ${this.Key} as Character must be ${this._characterClassPrequisite.map(
          (p) => p.Key,
        ).join(', ')}.`
      );
    }
    if (this.OnlyCommander && !character.IsCommander) {
      return ValidityResponse.Errored(
        `Cannot add ${this.Key} as this Character is not a Commander`
      );
    }
    if (this.Kryptonite.length > 0) {
      const skillKrptonite = character.Skills.filter((s: Keyed) => {
        return this.Kryptonite.find(k => k === s.Key) !== undefined;
      });
      if (skillKrptonite.length > 0) {
        return ValidityResponse.Errored(
          `Cannot add ${this.Key} as Character has the ${skillKrptonite.map(
            (p) => p.Key,
          ).join(', ')} Skill.`
        );
      }
      const traitKryptonite = character.Traits.filter((s: Keyed) => {
        return this.Kryptonite.find(k => k === s.Key) !== undefined;
      });
      if (traitKryptonite.length > 0) {
        return ValidityResponse.Errored(
          `Cannot add ${this.Key} as Character has the ${traitKryptonite.map(
            (p) => p.Key,
          ).join(', ')} Trait.`
        );
      }
    }
    return ValidityResponse.Checked(true);
  }

  ValidForAdding(character: Character): boolean {
    return this._checkAddValidity(character).IsValid;
  }

  CanAdd(character: Character): ValidityResponse {
    const result = this._checkAddValidity(character);
    if (result.ErrorMessage !== undefined) {
      throw new Error(result.ErrorMessage);
    }
    return result;
  }

  private _checkRemoveValidity(character: Character): ValidityResponse {
    const skillsThatDependOnThis = character.Skills.filter(s => s.SkillPrerequisites.find(sp => sp.Key === this.Key) !== undefined);
    if (skillsThatDependOnThis.length > 0) {
      return ValidityResponse.Errored(
        `Cannot remove ${this.Key} as Character has the following skills that depend on it: ${skillsThatDependOnThis.map(
          (p) => p.Key,
        ).join(', ')}.`
      );
    }
    return ValidityResponse.Checked(true);
  }
  
  ValidForRemoving(character: Character): boolean {
    return this._checkRemoveValidity(character).IsValid;
  }

  CanRemove(character: Character): ValidityResponse {
    const result = this._checkRemoveValidity(character);
    if (result.ErrorMessage !== undefined) {
      throw new Error(result.ErrorMessage);
    }
    return result;
  }

  static ArmorTraining(): Skill {
    return new Skill(
      Skills.ArmorTraining,
      'The DEX penalty for wearing medium or heavy armor is reduced by 1',
      'Reduce the dexterity penalty for wearing medium or heavy armor'
    );
  };

  static Avenger(): Skill {
    return new Skill(
      Skills.Avenger,
      'Add 1 to attack rolls against enemies who have wounded or killed an ally.',
      'Bonus to attack rolls against enemies who have killed or wounded an ally'
    );
  };

  static Backstab(): Skill {
    return new Skill(
      Skills.Backstab,
      'Special long action attack that increases the strength of the weapon used by 2 when melee attacking in an enemy’s rear 180 degree arc.',
      'Special melee long attack action used from behind a target'
    );
  };

  static BattleThrill(): Skill {
    return new Skill(
      Skills.BattleThrill, 
      'Add a bonus of 2 to bravery checks while in melee combat.',
      'Bonus to bravery while in melee combat'
    );
  };

  static BeserkerRage(): Skill {
    return new Skill(
      Skills.BeserkerRage,
      'Add a +1 bonus to weapon strength when alone in melee combat with more than one enemy.',
      'Bonus to weapon strength while alone in melee combat with multiple enemies'
    );
  }

  static Bodyguard(): Skill {
    return new Skill(
      Skills.Bodyguard,
      'When an ally in base contact with a character with the Bodyguard trait is hit with an attack, and before the armor check has been rolled, you may choose for this character to automatically swap positions with that ally and roll an armor check instead.',
      'Swap positions with an ally in base contact and perform an armor check in their place'
    );
  };

  static DefensivePosture(): Skill {
    return new Skill(
      Skills.DefensivePosture,
      'This character gains the Defensive Posture melee long action. This long action reduces a character’s weapon’s speed by 1 but increases their armor against melee attacks by 1. This effect lasts until another order is spent on this character or until they are knocked unconscious. Using a standard action while outside melee combat allows this character to enter the same defensive state.',
      'Take up a defensive posture against weapon attacks'
    );
  };

  static Duelist(): Skill {
    return new Skill(
      Skills.Duelist,
      'Add a bonus of 1 to melee attack rolls when targeting an enemy that does not have an ally within one inch of it.',
      'Bonus to melee attack rolls against enemies that are alone in combat.'
    );
  };

  static Eager(): Skill {
    return new Skill(
      Skills.Eager,
      'Add a bonus of 2 to this character’s MOV while moving towards the enemy deployment zone if they have not yet attacked or cast a spell.',
      'Increased movement towards enemies before this character has attacked or cast a spell'
    );
  };

  static EscapeArtist(): Skill {
    return new Skill(
      Skills.EscapeArtist,
      'This character can move up to 2 inches as part of an Attack and Retreat long action.',
      'Increased movement during Attack and Retreat long actions'
    );
  };

  static ExpertAim(): Skill {
    return new Skill(
      Skills.ExpertAim,
      'This character can fire into melee from range without the regular penalty.',
      'Fire into melee combat without the regular penalty'
    )
  }

  static Fearless(): Skill {
    return new Skill(
      Skills.Fearless,
      'This character always passes non-magical bravery checks.',
      'Always pass non-magical bravery checks'
    )
  }
  static FocusedAttacker(): Skill {
    return new Skill(
      Skills.FocusedAttacker,
      'Each time you attack an enemy, add 1 to your roll against that enemy. This stacks until the character dies, flees the battlefield, or you attack another enemy.',
      'Increasing attack bonuses every time you attack a specific enemy'
    )
  }
  static FormationFighter(): Skill {
    return new Skill(
      Skills.FormationFighter,
      'Add 1 to melee attack rolls when in base contact with another ally or when in this character and another ally are both in base contact with the same enemy.',
      'Bonuses to melee attack rolls while in combat with allies'
    )
  }
  static GiantSlayer(): Skill {
    return new Skill(
      Skills.GiantSlayer,
      'Melee attack reactions can be performed at full weapon speed without applying the normal roll penalties.',
      'Melee attack reactions can use full weapon speed without penalty'
    )
  }
  static GiantsGrip(): Skill {
    return new Skill(
      Skills.GiantsGrip,
      'This character can wield two-handed weapons in one hand. Add 1 to a two-handed weapon’s strength if this character chooses to use this weapon with two hands.',
      'Wield two handed weapons in a single hand'
    )
  }
  static Grappler(): Skill {
    return new Skill(
      Skills.Grappler,
      'If this character has at least one hand free while in melee combat they can use the Grapple long action melee attack. Roll a weapon attack and if you roll a success the enemy is grabbed. For an enemy to free itself from a grapple, they or one of their allies must hit the character with an attack. While grabbed, the enemy cannot use the Attack and Retreat or Attack and Sidestep actions and has a penalty of 2 to attack rolls against this character and must subtract 4 from attack rolls against other characters. This character can move at half speed while the enemy is grabbed and bring the enemy with it, moving that enemy anywhere in its 180-degree front arc after the movement is complete. At any point when an order is spent on the character they can use the Attack and Push long action and the push portion of the action is always successful, even if the attack misses. \nA character with this skill can use a standard action to bring an unconscious character into a grappled state without rolling. They can choose not to do damage when using the ability in this way and they do not receive a movement penalty while the character is unconscious.',
      'Allows a character to grapple with enemies when they have a hand free'
    )
  }
  static Interceptor(): Skill {
    return new Skill(
      Skills.Interceptor,
      'A character may react to move and intercept an enemy if that enemy moves within half of your character’s MOV value and if your character is not already in melee combat. This stops the enemy at a point of your choosing within that half MOV distance and puts your character in base contact with them. This character can then perform a SPD 1 attack using their weapon against the target.',
      'Move to intercept an enemy moving nearby as a reaction'
    )
  }
  static Jumper(): Skill {
    return new Skill(
      Skills.Jumper,
      'When attempting a Jump roll, the character may choose to add up to two inches to their jump if they roll higher than 15.',
      'This character is capable of jumping further than normal'
    )
  }
  static LongShot(): Skill {
    return new Skill(
      Skills.LongShot,
      'Only affects ranged attacks. Allows you to increase the range of an attack by 3, sacrificing 1 STR from the attack’s damage.',
      'Increase the range of a ranged attack, sacrificing some of the weapon’s damage potential'
    )
  }
  static Lucky(): Skill {
    return new Skill(
      Skills.Lucky,
      'When this character has their CON reduced to 0, roll a d20. On a 15 or higher their CON remains at 1. This may only be used three times per game.',
      'This character is lucky and has a chance to avoid fatal damage'
    )
  }
  static Medic(): Skill {
    return new Skill(
      Skills.Medic,
      'Using a standard action, this character can stabilize a gravely injured character. The target character’s CON score remains at 0. \nA character with the medic skill and medical supplies can use a long action and roll a d20. On a roll of 11 or higher they restore 1 CON and the injured character is no longer unconscious and can return to the fight. This long action can be interrupted by reactions.',
      'This character can use medical supplies to heal injured characters'
    )
  }
  static MountedWarrior(): Skill {
    return new Skill(
      Skills.MountedWarrior,
      'This character can use both their mount’s attack and movement as part of a move action.',
      'Use both the mount’s attack and movement as part of a move action'
    )
  }
  static NeverTellMeTheOdds(): Skill {
    return new Skill(
      Skills.NeverTellMeTheOdds,
      'If this character uses a weapon with a speed greater than 1 they may choose to distribute their attack dice amongst enemies within range. Roll all attack dice together and assign successes to the enemies of your choice. The movement aspect or any bonuses from long action attacks split up in this way only affect one character out of those that were targeted.',
      'This character may spread their attacks across multiple characters'
    )
  }
  static NimbleAttacker(): Skill {
    return new Skill(
      Skills.NimbleAttacker,
      'This character can place themselves in any area around the enemy character when they perform an Attack and Sidestep attack. When determining if the character comes into contact with any other enemies, assume that the character either moved around the target in an arc or travelled directly through the target. Enemies hit this way can only turn 90 degrees towards the character’s new location.',
      'Move this character to any position around an enemy when using an attack and sidestep long action'
    )
  }
  static PowerAttack(): Skill {
    return new Skill(
      Skills.PowerAttack,
      'Long action melee attack that increases the strength of the weapon used by 1 for this attack.',
      'A melee long action attack that hits with increased strength'
    )
  }
  static QuickDraw(): Skill {
    return new Skill(
      Skills.QuickDraw,
      'If this character is equipped with two one-handed ranged weapons, like hand crossbows, they may use them both in the same attack action by applying a penalty of 2 to their rolls. You may use the aimed shot long action to negate this penalty. You can target different characters with each weapon. This character may also react to enemy characters with both of these weapons at the same time. They must apply the same penalty of 2 to the reaction attack rolls and the weapon speed for each weapon must be reduced to 1 as normal for ranged attack reactions. ',
      'Use multiple one-handed ranged weapons at the same time with a small penalty'
    )
  }
  static Reinforcements(): Skill {
    return new Skill(
      Skills.Reinforcements,
      'This character deploys later in the game at the choice of the player. They can deploy anywhere along the side of the board as long as it is not in the enemy deployment zone. Characters not yet deployed do not generate orders and characters deployed outside of the start phase do not generate orders until your next turn, but may still have orders spent on them. If the character has the flying trait, is riding a mount with the flying trait, or if the character’s army has a spellcaster trained in the Chronomancy or Arcane Magic spell schools, the character with this skill can magically deploy anywhere on the table.You cannot deploy characters inside the enemy deployment zone, in the sphere of awareness of an enemy (unless another ally is within that sphere), or in areas specifically mentioned in a scenario. The spellcaster does not need to be deployed yet for a character with this skill to deploy magically, but if the spellcaster is killed before characters with the Reinforcements skill attempt to deploy, reinforcements can only enter the battlefield along table edges.\nCharacters with this skill may also deploy as if they were brought onto the field magically if they have an item with the Windstep, Sending, Arcane Portal, Blink, Transmute Body, Levitate or Misty Jaunt spells. \nInformation about this character other than its point cost is hidden from the opposing player until it is deployed.',
      'This character may deploy later in the game'
    )
  }
  static RendArmor(): Skill {
    return new Skill(
      Skills.RendArmor,
      'A melee special attack. A powerful blow rends the enemy armor, reducing their armor value by 1 until they leave melee combat.',
      'A melee attack that reduces the target armor'
    )
  }
  static Scout(): Skill {
    return new Skill(
      Skills.Scout,
      'This character has detached from the main force to scout ahead. During the player’s deployment they can deploy anywhere on their half of the table in most games. Scenarios may describe alternate deployment areas or off-limits deployment areas for this skill. Before the first turn of the game, this character can roll a hide check to see if they are hidden when the game starts. If they are out of line of sight of all enemy characters when they deploy, they can choose to be automatically hidden.',
      'This character can deploy stealthily outside the regular deployment zone'
    )
  }
  static SeasonedVeteran(): Skill {
    return new Skill(
      Skills.SeasonedVeteran,
      'Add a bonus of 3 to bravery rolls.',
      'Bonus to all bravery rolls'
    )
  }
  static ShieldSacrifice(): Skill {
    return new Skill(
      Skills.ShieldSacrifice,
      'Sacrifice a shield you have equipped to avoid potential damage. After this character is hit with an attack and before their armor check has been rolled, you may choose to remove a shield the character is currently wielding from their profile and cancel out one of the incoming attacks. The shield is destroyed and the character’s armor should be adjusted to reflect this for the rest of the battle.',
      'Sacrifice this character’s shield to avoid damage'
    )
  }
  static Skirmisher(): Skill {
    return new Skill(
      Skills.Skirmisher,
      'This character treats difficult terrain as cover. This does not apply to difficult terrain created by players during the course of the game.',
      'Treat difficult terrain as cover'
    )
  }
  static Sniper(): Skill {
    return new Skill(
      Skills.Sniper,
      'Add a bonus of 1 to ranged attack rolls when targeting an enemy that does not have another enemy within one inch of it.',
      'Bonus to ranged attacks against enemies with no ally nearby'
    )
  }
  static Stealthy(): Skill {
    return new Skill(
      Skills.Stealthy,
      'This character gains a bonus of 2 to Hide and Sneak rolls. Characters targeting this character with a Spot Hidden check receive a penalty of 2 to their rolls.',
      'Bonuses to hide and sneak rolls'
    )
  }
  static Stubborn(): Skill {
    return new Skill(
      Skills.Stubborn,
      'This character is hard to kill. Once per game, ignore one failed armor check that would reduce them to 0 CON.',
      'Ignore a single failed armor check that would reduce the character to 0 constitution'
    )
  }
  static Survivalist(): Skill {
    return new Skill(
      Skills.Survivalist,
      'Add 1 to a character’s armor when equipped with a melee weapon and positioned more than 3 inches away from any other allies.',
      'Increase armor when away from other allies'
    )
  }
  static Swap(): Skill {
    return new Skill(
      Skills.Swap,
      'A melee special attack long action. Along with their attack, the character also swaps places with the enemy. Turn the character to face the enemy’s new position after this attack. The enemy may choose to turn towards the attacker or stay facing the direction they were facing originally.',
      'A melee long action that swaps positions with an enemy as part of an attack'
    )
  }
  static TerrainExpert(): Skill {
    return new Skill(
      Skills.TerrainExpert,
      'Add 5 to any difficult terrain check this character rolls.',
      'Bonuses to difficult terrain checks'
    )
  }
  static ThirstForBlood(): Skill {
    return new Skill(
      Skills.ThirstForBlood,
      'Allows the use of a SPD 1, STR 3 melee attack long action. On a successful wound, gain 1 CON as you drain the target of blood. A character may exceed their starting CON score in this way, but only by one point. This extra CON lasts until the end of your next turn unless the character only has 1 CON remaining at that point.',
      'A melee attack long action that attempts to siphon life energy from the target'
    )
  }
  static TrainedSprinter(): Skill {
    return new Skill(
      Skills.TrainedSprinter,
      'This character does not need to subtract from their attack rolls after using a double move action.',
      'Ignore penalties to attack rolls after using a double move action'
    )
  }
  static Trample(): Skill {
    return new Skill(
      Skills.Trample,
      'If mounted, or if the character has the Large or Huge trait, they can use a long action to move through an enemy and perform a weapon attack. If the character comes in contact with more than one enemy during movement, the enemy being trampled is larger than the trampler (a Large character attempted to trample a Huge character, for example), or if the enemy is the same size and also mounted, the move is unsuccessful and the character stops in base contact with the enemy.',
      'Mounted, large or huge characters may move through an enemy while performing a melee attack.'
    )
  }
  static TwoWeaponSpecialist(): Skill {
    return new Skill(
      Skills.TwoWeaponSpecialist,
      'This character increases the armor bonus for the Defensive Posture long action to 2. In addition they also gain 1 additional armor against ranged and magical attacks while in this state.',
      'Bonus armor while using the defensive posture action, including against ranged and magical attacks'
    )
  }
  static UncannyReactionTime(): Skill {
    return new Skill(
      Skills.UncannyReactionTime,
      'This character receives a bonus of 2 to dodge rolls and may perform dodge rolls in melee combat against melee or ranged weapon attacks. They may even leave combat in this way.',
      'Bonuses to dodge rolls and may perform dodges in melee combat'
    )
  }
  static VengefulSpirit(): Skill {
    return new Skill(
      Skills.VengefulSpirit,
      'A character with this skill may perform one final 1 SPD attack with their weapon if they are reduced to 0 CON in melee combat.',
      'May perform a single melee weapon attack when reduced to 0 constitution'
    )
  }
  static WeaponMaster(): Skill {
    return new Skill(
      Skills.WeaponMaster,
      'Add a bonus of 1 to melee attack rolls when alone in combat.',
      'Bonus to melee attack rolls while alone in melee combat'
    )
  }
  static ZenDodger(): Skill {
    return new Skill(
      Skills.ZenDodger,
      'This character may roll two dodge rolls instead of one and choose the higher result. If they roll a critical on any of these rolls they may make a single attack against one of the characters that attacked them with a weapon strength equal to the weapon strength of the incoming attack. The dodging character snatches the projectile out of the air and hurls it back at their foe.',
      'Bonus to dodge rolls with a chance to return the incoming attack back at the attacker'
    )
  }

  // SPELLCASTING SKILLS
  static Apprenticeship(): Skill {
    return new Skill(
      Skills.Apprenticeship,
      'Prerequisite: Spellcaster trait OR character designated as the Army Commander. \nCan create a smaller two-character squad with this character as the squad leader. This squad follows all the regular squad creation criteria but does not count towards the one squad maximum for your army.',
      'This character may form a small squad with a spellcaster or the army commander'
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setCommanderOverride();
  }
  static LatentSpellcaster(): Skill {
    return new Skill(
      Skills.LatentSpellcaster,
      'This character knows and can cast a single spell, even if they do not have the spellcaster trait. Calculate their spell capacity as normal using their MND score. This skill cannot be combined with the spellcaster trait or the Versatile Spellcaster or Multi School Spellcaster skills.',
      'This character knows and can cast a single spell'
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
      'Prerequisite: Spellcaster trait. \nThis character can pick spells from two spellcasting schools instead of one.',
      'This spellcaster may choose spells from two spell schools'
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setAddEffect((char: Magicable | IsCommander) => (char as Magicable).SetSpellcastingSchoolsLimit(2));
  }
  static PreparedIllusions(): Skill {
    return new Skill(
      Skills.PreparedIllusions,
      'If this character is trained in the Illusion school of magic they can use the Mirror Image or Greater Mirror Image spells during deployment and sacrifice one fewer order. Alternatively, you can choose to cast the disguise spell twice during deployment, disguising the caster and one other character from your forces.',
      'An illusion spellcaster with this trait may cast spells during deployment with reduced order penalty'
    )
    .setTraitPrerequisite(Trait.Spellcaster());
  }
  static SpellVampire(): Skill {
    return new Skill(
      Skills.SpellVampire,
      'This character can use a reaction to attempt to absorb the magical energy of a spell cast within line of sight and within 6 inches. Roll a d20 and add the character’s MND score; if the roll is over 20 you absorb the spell, ending its casting prematurely and gaining 1 CON. A character may exceed their starting CON score in this way but only by one point. This extra CON lasts until the end of your next turn unless the character only has 1 CON remaining at that point.',
      'This character can attempt to absorb a spell being cast nearby'
    )
    .setTraitPrerequisite(Trait.Spellcaster());
  }
  static VersatileSpellcaster(): Skill {
    return new Skill(
      Skills.VersatileSpellcaster,
      'Prerequisite: Spellcaster trait. \nThis character knows two extra spells.',
      'This character knows extra spells'
    )
    .setTraitPrerequisite(Trait.Spellcaster())
    .setAddEffect((char: Magicable | IsCommander) => (char as Magicable).SetSpellPoolLimit((char as Magicable).SpellPoolLimit + 2));
  }

  // ADVANCED SKILLS
  static Ambusher(): Skill {
    return new Skill(
      Skills.Ambusher,
      'Prerequisite: Scout \nThis character has moved ahead of the main force and hidden themselves so well that the enemy is unable to detect them by mundane means. During the player’s deployment, pick a spot to deploy the character and write it down. This information, and the information about the character (other than their points cost) is hidden from the opposing player until the character is revealed. This area must be outside the enemy deployment zone and in an area they would normally be able to access with movement actions. Scenarios may describe alternate deployment areas or off-limits deployment areas for this skill. \nThis character does not generate orders and is not placed on the board while it is hidden. At any point, the controlling player can decide to reveal this character, placing them on the board in the spot they wrote down. If this happens during an opponent’s order, the hidden character can only react at the very end of that order. If revealed in the starting phase of your turn this character generates orders as normal. If revealed later in your turn they do not generate an order until your next turn but may still have orders spent on them.\nChronomancers can detect characters deployed in this manner using the scry spell and Arcane spellcasters can detect characters hidden this way within their sphere of awareness if they cast or have the mage sight spell active.',
      'This character can deploy completely hidden ahead of the rest of the army'
    )
    .setSkillPrerequisite(Skill.Scout());
  }
  static FearlessPresence(): Skill {
    return new Skill(
      Skills.FearlessPresence,
      'Prerequisite: Character designated as the Army Commander. \nThe bonus to bravery checks from being in proximity to the army commander is applied to all allies within twelve inches of the commander instead of the regular six.',
      'This army commander provides bonuses to bravery at a further range than normal'
    )
    .setOnlyCommander();
  }
  static ForceOfWill(): Skill {
    return new Skill(
      Skills.ForceOfWill,
      'Prerequisite: Character designated as the Army Commander. \nThis commander can use his special order on instinct trait characters within twelve inches instead of the regular six.',
      'This army commander can use their additional order on a nearby instinct character'
    )
    .setOnlyCommander()
  }
  static SquadLeader(): Skill {
    return new Skill(
      Skills.SquadLeader,
      'Prerequisite: Regular trait. \nThis character has the ability to lead squads. If a character is an army commander, the cost of purchasing this skill (if applicable) is halved.',
      'This character can lead a squad'
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
      'Prerequisite: Must not have the Spellcaster trait or Latent Spellcaster skill.\nThis character gains a bonus of 2 to attacks against characters with the ability to cast spells. This does not apply to characters who can only cast spells because they are equipped with magic items.',
      'This character has bonuses to attack against spellcasters'
    )
    .setKryptonite(Trait.Spellcaster().Key)
    .setKryptonite(Skill.LatentSpellcaster().Key)
  }
  
  // SQUAD SKILLS
  static Barrage(): Skill {
    return new Skill(
      Skills.Barrage,
      'When in a squad with ranged characters, all characters equipped with ranged weapons can fire them at the same time. This is a long action that can only be used once per squad per turn. Each character can target a different enemy if they so choose.',
      'Ranged characters in a squad with this character may all fire their weapons at the same time'
    )
  }
  static BattleDrills(): Skill {
    return new Skill(
      Skills.BattleDrills,
      'Once per turn while in a squad, as a melee long action, this character can perform a basic attack and all other squad members can perform a SPD 1 melee attack with their weapon.',
      'Squad members in melee combat with this character may perform an attack together.'
    )
  }
  static BeastMaster(): Skill {
    return new Skill(
      Skills.BeastMaster,
      'Prerequisite: Squad Leader. \nThis character can lead a squad with characters that have the instinct trait. They may treat the instinct orders generated by squad members as regular orders as long as those orders are being spent to activate members of the squad. If the character with this skill is rendered unconscious or is killed the squad disbands unless there is another character with the beastmaster skill within the squad that can take over as leader.',
      'This character may lead instinct characters as part of their squad.'
    )
    .setSkillPrerequisite(Skill.SquadLeader());
  }
  static CoordinatedCharge(): Skill {
    return new Skill(
      Skills.CoordinatedCharge,
      'While in a squad, the entire group can perform a basic move and attack as part of a single order to enter melee combat.',
      'Allies in a squad with this character may enter melee combat and attack as a single action'
    )
  }
  static DefensiveFormation(): Skill {
    return new Skill(
      Skills.DefensiveFormation,
      'While in base contact with allies in a squad, add 1 to each ally’s armor against melee attacks when the enemies first move into melee combat. If the squad is already in melee combat when another enemy joins the fight, they do not get this bonus a second time.',
      'Allies in a squad with this character gain armor when enemies move into melee combat'
    )
  }
  static ShieldWall(): Skill {
    return new Skill(
      Skills.ShieldWall,
      'While in a squad, equipped with a shield, and in base contact with squad members who also have a shield, add 1 to each ally’s armor against ranged and magical attacks. Magical attacks that do no damage ignore this bonus. This bonus increases by 1 for each additional character in the squad in base contact with the rest of the formation as long as they have a shield. If multiple characters in the squad have this skill, it does not stack.',
      'Allies in a squad with this character gain increased armor while in a formation with shields'
    )
  }
}
