import { Keyed, Magicable } from "../../interfaces";
import { Elemental } from "./elemental";
import { SpellCircle } from "./spell_circle";

export type SpellRange = 'Self' | 'Touch' | number;

export class Spell implements Keyed {
  private constructor(key: string, description: string, range: SpellRange, type: string, circle: SpellCircle, strength?: number) {
    this._key = key;
    this._description = description;
    this._range = range;
    this._type = type;
    this._circle = circle;
    this._strength = strength;

    this._chargeCost = this._circle.SortOrder * 3;
  }

  private static FirstCircle(key: string, description: string, range: SpellRange, type: string, strength?: number): Spell {
    return new Spell(
      key,
      description,
      range,
      type,
      SpellCircle.FirstCircle(),
      strength
    );
  };
  private static SecondCircle(key: string, description: string, range: SpellRange, type: string, strength?: number): Spell {
    return new Spell(
      key,
      description,
      range,
      type,
      SpellCircle.SecondCircle(),
      strength
    );
  };
  private static ThirdCircle(key: string, description: string, range: SpellRange, type: string, strength?: number): Spell {
    return new Spell(
      key,
      description,
      range,
      type,
      SpellCircle.ThirdCircle(),
      strength
    );
  };
  private static FourthCircle(key: string, description: string, range: SpellRange, type: string, strength?: number): Spell {
    return new Spell(
      key,
      description,
      range,
      type,
      SpellCircle.FourthCircle(),
      strength
    );
  };

  private _key: string;
  get Key(): string { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _range: SpellRange;
  get Range(): SpellRange { return this._range; }
  private _type: string;
  get Type(): string { return this._type; }
  private _strength?: number;
  get Strength(): number | undefined { return this._strength; }
  private _maintainable: boolean = false;
  private _chargeCost: number;
  get ChargeCost(): number {
    return this._chargeCost;
  }
  get Maintainable(): boolean {
    return this._maintainable;
  }
  private _circle: SpellCircle;
  get Circle(): SpellCircle {
    return this._circle;
  }
  private _addEffect: (char: Magicable) => void = (char: Magicable) => {
    return;
  };
  get AddEffect() : (char:  Magicable) => void { return this._addEffect; }
  private _removeEffect: (char: Magicable) => void = (char: Magicable) => {
    return;
  };
  get RemoveEffect() : (char: Magicable) => void { return this._removeEffect; }

  setAddEffect(addEffect: (char: Magicable) => void): Spell {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (char: Magicable) => void): Spell {
    this._removeEffect = removeEffect;
    return this;
  }
  setMaintainable(): Spell {
    this._maintainable = !this._maintainable;
    return this;
  }
  
  static BanishElemental(): Spell {
    return Spell.FourthCircle(
      'Banish Elemental',
      'You destroy the target elemental, removing it from play. Elementals may not react to this spell.',
      6,
      'P'
    );
  };

  static DispelElemental(): Spell {
    return Spell.FourthCircle(
      'Dispel Elemental',
      'You destroy the target elemental, removing it from play. Elementals may not react to this spell.',
      3,
      'P'
    );
  };

  static Shock(): Spell {
    return Spell.FirstCircle(
      'Shock',
      'You gather the energy in the air around your foe and channel it into their vital organs.',
      6,
      'P',
      3
    );
  };
  static SwiftFoot(): Spell {
    return Spell.FirstCircle(
      'Swift Foot',
      'The target gains the aspect of the wind, pushing their strides even further. Add 1 to their movement speed until the end of your next turn.',
      3,
      'P',
    );
  };
  static Windstep(): Spell {
    return Spell.FirstCircle(
      'Windstep',
      'The target gains the aspect of the air, making them lighter than they appear. All jumps are treated as though the character has a running start. Add 2 to their jump distance until the end of your next turn.',
      3,
      'P',
    );
  };
  static SparkSpray(): Spell {
    return Spell.SecondCircle(
      'Spark Spray',
      'Characters inside the area of this ability have their armor reduced by 2 until the end of their player’s next full turn, even if the attack does not damage them.',
      3,
      'C',
      3
    );
  };
  static Shockwave(): Spell {
    return Spell.SecondCircle(
      'Shockwave',
      'Characters hit by this attack are forced back an inch directly away from the caster even if they pass their armor check. If the character is unable to move the full inch, it moves as far as it can and then is knocked prone. If the obstruction is another character, roll a STR 2 armor check against that second character, and if that same character fails they are also knocked prone but take no damage.',
      'Self',
      'B2',
      3
    );
  };
  static Gust(): Spell {
    return Spell.SecondCircle(
      'Gust',
      'If the spell overpowers your opponent’s armor, it does not do damage, but instead pushes the enemy two inches in the direction of your choice. If the character hits a piece of scenery, they are knocked prone. If they hit another character, roll an armor check for that character as well, and if that character fails it is also knocked prone but takes no damage. Movement stops if a character runs into an obstacle.',
      9,
      'P',
      8
    );
  };
  static ImbueWithWind(): Spell {
    return Spell.SecondCircle(
      'Imbue with Wind',
      'You touch a ranged weapon held by an ally. Until the end of your next turn, the range of that weapon increases by three inches.',
      'Touch',
      'P'
    );
  };
  static ShockingWeapon(): Spell {
    return Spell.SecondCircle(
      'Shocking Weapon',
      'You imbue an ally’s weapon with the power of storms. One weapon they carry gains 2 strength until the end of your next turn.',
      3,
      'P'
    );
  };
  static LightningBolt(): Spell {
    return Spell.SecondCircle(
      'Lightning Bolt',
      'A burst of pure electrical force jumps from your hands in a line, hitting all who are in its path.',
      6,
      'L0',
      4
    );
  };
  static ChainLightning(): Spell {
    return Spell.ThirdCircle(
      'Chain Lightning',
      'Lightning hits your target and then jumps between other characters. Roll a d20. On a 1-5 the bolt jumps to one extra character; on a 6-10, two characters; 11-15, three characters; and 16-20, four characters. The bolt jumps to the closest character within six inches and within line of sight of the original target and then jumps from that character to the closest character that hasn’t been struck, and so on until X characters have been struck. Allies can be accidentally hit in this way. Roll an armor check for each character hit.',
      6,
      'P',
      4
    );
  };
  static StormField(): Spell {
    return Spell.ThirdCircle(
      'Storm Field',
      'Characters drawing line of sight into or through this area treat enemies as if they are in cover unless that enemy is also within their sphere of awareness. If the target was already in cover, add that cover bonus again. Characters who move through the area as part of an order, or end their turn inside the area, must attempt a STR 0 armor check or take 1 point of CON damage. This effect lasts until the end of your next turn.',
      6,
      'B2'
    );
  };
  static WallOfStorms(): Spell {
    return Spell.ThirdCircle(
      'Wall of Storms',
      "Summon an inch-thick wall storm up to four inches long. The wall can be placed in any spot as long as part of it is touching the character’s base. It can not run through impassable terrain. If characters are in the wall's path they are moved to the closest side of the wall and must make a STR 2 armor check to avoid taking damage. When conjured, the wall is two inches tall and can not be climbed. It blocks line of sight. The wall can be moved through, but characters moving through it must pass a STR 2 armor check. The wall lasts until the end of your next turn.",
      'Self',
      'P'
    );
  };
  static SphereOfStorms(): Spell {
    return Spell.FourthCircle(
      'Sphere of Storms',
      'A ball of pure electrical energy travels across the battlefield, lashing out at all those in its path, ally and adversary alike.',
      9,
      'L3',
      5
    );
  };
  static SummonAirElemental(): Spell {
    return Spell.FourthCircle(
      'Summon Air Elemental',
      'Create an elemental under your control. The elemental has the Instinct trait but may have regular orders spent on it as well. Elementals are immune to fear and bravery based checks and can not be affected by spells that force them to attack allies or switch sides in battle.',
      3,
      'P'
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.AirElemental()))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.AirElemental()));
  };

  static IceShards(): Spell {
    return Spell.FirstCircle(
      'Ice Shards',
      'Throw a shard of magically frozen ice at the target.',
      9,
      'P',
      2
    );
  };
  static IceSheet(): Spell {
    return Spell.FirstCircle(
      'Ice Sheet',
      'The area counts as difficult terrain until the end of your next turn. If a character rolls 5 or less while performing a difficult terrain test in this area, they fall prone. If the area or part of it was already difficult terrain, characters traversing it must roll two difficult terrain tests and choose the lowest result.',
      4,
      'B2'
    );
  };
  static Chill(): Spell {
    return Spell.FirstCircle(
      'Chill',
      'This spell must beat the character’s armor to succeed but does no damage. The target is slowed until the end of your next turn.',
      12,
      'P',
      6
    );
  };
  static FreezingSpray(): Spell {
    return Spell.SecondCircle(
      'Freezing Spray',
      'Characters hit by this ability are slowed until the end of your next turn even if they do not take damage.',
      3,
      'C',
      3
    );
  };
  static FrostRay(): Spell {
    return Spell.SecondCircle(
      'Frost Ray',
      'A cerulean ray of ice cold energy extends from you in a line.',
      12,
      'L1',
      2
    );
  };
  static ImbueWithWater(): Spell {
    return Spell.SecondCircle(
      'Imbue with Water',
      'The next time this weapon hits a character, that character is slowed until the end of your next turn, even if the attack does no damage.',
      'Touch',
      'P'
    );
  };
  static Fog(): Spell {
    return Spell.SecondCircle(
      'Fog',
      'Characters drawing line of sight into or through this area treat enemies as if they are in cover unless that enemy is also within their sphere of awareness. If the target was already in cover, add that cover bonus again. This effect lasts until the end of your next turn.',
      12, 
      'B3',
    );
  };
  static Blizzard(): Spell {
    return Spell.ThirdCircle(
      'Blizzard',
      'Characters in the spell area are blinded and slowed until the start of your next turn even if they do not take damage.',
      9,
      'B3',
      3
    );
  };
  static DrivingRain(): Spell {
    return Spell.ThirdCircle(
      'Driving Rain',
      'The area of the spell effect counts as difficult terrain and attacks that either originate in the area or target characters in the area must subtract 2 from their rolls. Areas inside buildings or otherwise sheltered from the elements are not affected by this spell. This lasts until the end of your next turn.',
      12,
      'B6'
    );
  };
  static IceWall(): Spell {
    return Spell.ThirdCircle(
      'Ice Wall',
      'Summon an inch-thick wall of ice up to four inches long. The wall can be placed in any spot as long as part of it is touching the caster’s base. It can not run through terrain or other characters and must be in contact with the ground. When conjured, the wall can be either chest height, allowing it to be used as cover and allowing it to be moved across like a low wall; or the wall can be taller, treating it as impassable terrain that is too slick to climb. The wall lasts until the end of your next turn.',
      'Self',
      'P'
    );
  };
  static WaterSphere(): Spell {
    return Spell.ThirdCircle(
      'Water Sphere',
      'The L1 area this spell travels across freezes over and becomes difficult terrain until the end of your next turn. If a character rolls 5 or less while performing a difficult terrain test in this area, they fall prone. If part or all of the area was already difficult terrain, characters traversing it must roll two difficult terrain tests and choose the lowest result. Characters reduced to 0 CON by this spell do not fall prone, but are still considered gravely wounded and unconscious. These characters are frozen in place and may act as cover to other characters. If a character under the effects of this spell is healed or stabilized they fall prone and no longer act as cover. If they die, they remain on the table as a permanent piece of frozen cover.',
      9,
      'L1',
      5
    );
  };
  static Freeze(): Spell {
    return Spell.FourthCircle(
      'Freeze',
      'Roll an armor check for each point of CON this character has. This spell does damage equal to the number of failed checks. If reduced to 0 CON the character is killed outright. Any characters killed in this way stay in play as a piece of scenery that can be used as cover. They can not be affected by other spells or abilities. If a character is not killed by this spell they are slowed until the end of their next turn.',
      9,
      'P',
      6
    );
  };
  static SummonWaterElemental(): Spell {
    return Spell.FourthCircle(
      'Summon Water Elemental',
      'Create an elemental under your control. The elemental has the Instinct trait but may have regular orders spent on it as well. Elementals are immune to fear and bravery based checks and can not be affected by spells that force them to attack allies or switch sides in battle.',
      3,
      'P'
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.WaterElemental()))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.WaterElemental()));
  };

  static WitchBolt(): Spell {
    return Spell.FirstCircle(
      'Witch Bolt',
      'A bolt of purple arcane energy streaks towards your foe.',
      9,
      'P',
      2
    );
  };
  static EtherTorch(): Spell {
    return Spell.FirstCircle(
      'Ether Torch',
      'The character targeted by this spell will be treated as though they have a lantern or torch when determining their line of sight. This spell can also target terrain features and act in the same way as a dropped torch or lantern. This effect lasts until the end of your next turn if not maintained; if maintained, the spell will last indefinitely until you choose to cease maintenance, at which point it will end at the start of your enemy’s next turn.',
      12,
      'P'
    )
    .setMaintainable();
  };
  static DistractingCantrip(): Spell {
    return Spell.FirstCircle(
      'Distracting Cantrip',
      'While this spell is active, your foe subtracts 2 from all of their rolls. This effect lasts until the end of your next turn if not maintained; if maintained, the spell will last indefinitely until you choose to cease maintenance, at which point it will end at the start of your enemy’s next turn.',
      6,
      'P'
    )
    .setMaintainable();
  };
  static MageSight(): Spell {
    return Spell.FirstCircle(
      'Mage Sight',
      'This character adds 2 to Spot Hidden checks as well as adding 2 to reactions to magical effects. This includes attempts to dispel magical effects already in play. This character also ignores any battlefield effects like smoke, darkness, and fog of war that might affect their vision. This effect lasts until the end of your next turn if not maintained. If maintained, the spell will last indefinitely until you choose to cease maintenance, at which point it will end at the start of your enemy’s next turn.',
      'Self',
      'P'
    )
    .setMaintainable();
  };
  static ForceArrow(): Spell {
    return Spell.SecondCircle(
      'Force Arrow',
      'After hitting, even if the spell does not successfully wound the target, the arrow pushes them back one inch. If the enemy character is unable to move the full inch, it moves as far as it can and then is knocked prone. If the obstruction is another character, roll a STR 2 armor check against that second character, and if that character fails they are also knocked prone but take no damage.',
      9,
      'P',
      4
    );
  };
  static EnergyJavelin(): Spell {
    return Spell.SecondCircle(
      'Energy Javalin',
      'A streak of light flies from your hands, striking every foe it passes through.',
      9,
      'L1',
      3
    );
  };
  static MageArmor(): Spell {
    return Spell.SecondCircle(
      'Mage Armor',
      'This character adds 2 to their armor until the end of your next turn. This spell ends at the beginning of the enemy player’s next turn if it is not maintained after the turn it is cast.',
      'Self',
      'P'
    )
    .setMaintainable();
  };
  static EtherSheet(): Spell {
    return Spell.SecondCircle(
      'Ether Sheet',
      'A sheet of razor-thin arcane energy flies from your hands, cutting a path through an area in front of you.',
      3,
      'C',
      3
    );
  };
  static ArcaneSphere(): Spell {
    return Spell.ThirdCircle(
      'Aracane Sphere',
      'You force a sphere of pure arcane energy into existence and compress it into a fist-sized ball of unstable, magical chaos that travels in a straight line towards your foe, lashing out at all those who draw close.',
      9,
      'L1',
      6
    );
  };
  static ShimmeringBarrier(): Spell {
    return Spell.ThirdCircle(
      'Shimmering Barrier',
      "Summon an impossibly thin, shimmering barrier up to four inches long. The wall can be placed in any spot as long as part of it is touching the character’s base. It can not run through terrain or other characters and must be in contact with the ground. When conjured, the wall can be either chest-height, allowing it to be used as cover and to be moved across like a low wall, or the wall can be taller, treating it as impassable terrain that offers no handholds to climb. The wall can be maintained. This effect can only be maintained if the spellcaster is within three inches and in line of sight of the effect. This spell ends at the beginning of the enemy player’s next turn if it is not maintained after the turn it is cast.",
      'Self',
      'P'
    )
    .setMaintainable();
  };
  static Sending(): Spell {
    return Spell.ThirdCircle(
      'Sending',
      'You magically send a character to another location within six inches of their original location. This location must also be in line of sight of the caster. If the character is willing, no other rolls need to be made. If you are attempting to move an enemy character, roll a STR 4 armor check against them and if it is successful, you force the character into the new location. This must be a location that the character would have been able to reach naturally (not six inches up in the air, surrounded by walls, or in areas that would be otherwise inaccessible by move actions). If the caster uses this ability on themselves, they may move up to twelve inches instead.',
      6,
      'P'
    );
  };
  static ArcaneAura(): Spell {
    return Spell.ThirdCircle(
      'Arcane Aura',
      'You surround yourself with a two-inch area until the end of your next turn. While this spell is active, enemies treat this area as difficult terrain and all ranged attacks targeting allies inside the area subtract 2 from their rolls. This spell ends at the beginning of the enemy player’s next turn if it is not maintained after the turn it is cast.',
      'Self',
      'P'
    )
    .setMaintainable();
  };
  static ArcanePortal(): Spell {
    return Spell.FourthCircle(
      'Arcane Portal',
      "Pick a point in range and another within twelve inches of that point. Arcane portals open in each of these locations. While this spell is active, any character can move within one inch of either portal and be instantly transported to within one inch of the other. If a character has not finished its entire move action, it can do so on the other side of the portal. This effect lasts until the end of the player’s next turn. The caster must be within six inches of either portal and within line of sight when they declare the action to maintain the spell. This spell ends at the beginning of the enemy player’s next turn if it is not maintained after the turn it is cast.",
      1,
      'P'
    )
    .setMaintainable();
  };
  static EtherStorm(): Spell {
    return Spell.FourthCircle(
      'Ether Storm',
      'Characters caught in this spell will start to bleed from hundreds of tiny cuts. At the beginning of their next turn they must also roll a strength 0 armor check to avoid taking damage.',
      9,
      'B3',
      6
    );
  };

  static BarrageOfInsults(): Spell {
    return Spell.FirstCircle(
      'Barrage of Insults',
      'You hurl a magically infused string of insults at your foe, affecting them both emotionally and physically.',
      12,
      'P',
      1
    );
  }
  static Heckle(): Spell {
    return Spell.FirstCircle(
      'Heckle',
      'The target receives a -2 penalty to their next roll.',
      3,
      'P'
    );
  };
  static BlindingChord(): Spell {
    return Spell.FirstCircle(
      'Blinding Chord',
      'If the target fails its armor save, it does not take damage but is blinded instead. This effect lasts until the end of your next turn.',
      9,
      'P',
      5
    );
  };

  static CausticWords(): Spell {
    return Spell.SecondCircle(
      'Caustic Words',
      'The target’s armor is reduced by 2 for this attack and any subsequent attacks until the end of your next turn even if the spell does no damage during the initial attack.',
      6,
      'P',
      2
    );
  };
  static Guffaw(): Spell {
    return Spell.SecondCircle(
      'Guffaw',
      'The enemy is slowed and all of its targets are treated as if they are in cover until the end of your next turn.',
      6,
      'P'
    );
  };
  static SongOfBravery(): Spell {
    return Spell.SecondCircle(
      'Song of Bravery',
      'Allies within the area of the spell gain +2 to their rolls and have their movement speed increased by 1 when moving towards an enemy. They also receive a +2 bonus to bravery checks. These effects last until the end of your next turn and do not stack if cast multiple times.',
      'Self',
      'B2'
    );
  };
  static DiscordantNote(): Spell {
    return Spell.SecondCircle(
      'Discordant Note',
      'Characters in the area take -2 to their rolls until the end of your next turn if the attack beats their armor. This spell does not do damage.',
      6,
      'B3',
      7
    );
  };
  static VerseOfChaos(): Spell {
    return Spell.ThirdCircle(
      'Verse of Chaos',
      'Force all characters in the area to perform a speed 1 attack against the nearest character to them. This attack uses their weapon’s strength. If the enemy cannot attack anyone, they do nothing.',
      'Self',
      'B3'
    );
  };
  static BalladOfFramgmentation(): Spell {
    return Spell.ThirdCircle(
      'Ballad of Fragmentation',
      'Characters hit by this attack are forced 1 inch directly away from the center of the blast even if they pass their armor check. If the character is unable to move the full 1 inch, it moves as far as it can and then is knocked prone. If the obstruction is another character, roll a strength 2 armor check against that second character and if that character fails they are also knocked prone but take no additional damage.',
      8,
      'B2',
      4
    );
  };
  static CadenceOfTheWarFather(): Spell {
    return Spell.ThirdCircle(
      'Cadence of the War Father',
      'The character gains enhanced +1 movement speed, and a bonus to attack rolls and weapon strength equal to the caster’s MND value. This effect ends at the end of the enemy’s next turn.',
      'Touch',
      'P'
    );
  };
  static TerrifyingLullaby(): Spell {
    return Spell.FourthCircle(
      'Terrifying Lullaby',
      'The enemy falls asleep. At the beginning of their turn roll a d20; on a roll of 11 and above, the character remains asleep and does not generate orders for its player. Each turn the enemy fails to wake, roll a STR 2 attack for each point of MND the caster has, as terrifying nightmares attempt to destroy the mind of the sleeper. If the sleeper is hit by an attack outside of this spell effect they wake up and can act normally.',
      9,
      'P'
    );
  };
  static OctaveOfFlame(): Spell {
    return Spell.FourthCircle(
      'Octave of Flame',
      'Any characters that are wounded but survive this attack, either by being healed by an ally or by having any remaining CON after taking damage, have all future rolls reduced by 2.',
      4,
      'C',
      6
    );
  };

  static TimeRift(): Spell {
    return Spell.FirstCircle(
      'Time Rift',
      'A tear in the fabric of reality attempts to force a part of an enemy into another time and space.',
      6,
      'P',
      3
    );
  };
  static TimeWarp(): Spell {
    return Spell.FirstCircle(
      'Time Warp',
      'The targeted enemy can not use reactions until the end of the player’s next turn.',
      3,
      'P'
    );
  };
  static DilateTime(): Spell {
    return Spell.FirstCircle(
      'Dilate Time',
      'This character gains +2 to movement until the end of your next turn.',
      'Self',
      'P'
    );
  };
  static Foresight(): Spell {
    return Spell.FirstCircle(
      'Foresight',
      'Add 2 to the next roll against the targeted enemy or subtract 2 from their next attack, whichever comes first.',
      6,
      'P'
    );
  };
  static SlowField(): Spell {
    return Spell.FirstCircle(
      'Slow Field',
      'This area counts as difficult terrain and lasts until the end of the enemy’s next turn.',
      3,
      'B2'
    );
  };
  static WitheringOrb(): Spell {
    return Spell.SecondCircle(
      'Withering Orb',
      'A coin sized ball of time-manipulating force flies towards your enemy. As it strikes, it ages everything it touches at an accelerated rate.',
      6,
      'L0',
      4
    );
  };
  static StasisBubble(): Spell {
    return Spell.SecondCircle(
      'Statis Bubble',
      'Form a bubble of time magic at a selected point. Any character in the bubble or any enemy that makes contact with the bubble stops immediately and can not use movement actions or long actions until the spell ends.This area effect lasts until the end of the enemy’s next turn.',
      6,
      'B1'
    );
  };
  static Haste(): Spell {
    return Spell.SecondCircle(
      'Haste',
      'Increase the character’s SPD by 2, and add 2 to each of their non-spellcasting attack dice rolls until the end of your next turn.',
      3,
      'P'
    );
  };
  static Blink(): Spell {
    return Spell.SecondCircle(
      'Blink',
      'The target ally disappears from where they were and reappears at a new location up to four inches away from that point. This must be a location that the character would have been able to reach naturally (not four inches up in the air, surrounded by walls, or in areas that would be otherwise inaccessible by move actions). The distance is ten inches if the character casts it on themselves.',
      6,
      'P'
    );
  };
  static Scry(): Spell {
    return Spell.ThirdCircle(
      'Scry',
      'Reveal all hidden enemies within twelve inches of the chronomancer. These characters can automatically choose to roll a hide check to remain hidden, but they must subtract 5 from their roll.',
      'Self',
      'P'
    );
  };
  static TimeLoop(): Spell {
    return Spell.ThirdCircle(
      'Time Loop',
      'At the end of an order involving the target character, they disappear from existence and then reappear where they had started. Any damage they have done to enemies and any effects on the battlefield they may have caused are also undone. This spell lasts until the target or caster is knocked unconscious, killed, or an order ends with the caster more than twelve inches away from the target.',
      6,
      'P'
    );
  };
  static Stop(): Spell {
    return Spell.ThirdCircle(
      'Stop',
      'The target stops all movement and cannot use reactions, generate orders, or have orders spent on them until the end of the enemy’s next turn.',
      9,
      'P'
    );
  };
  static Erase(): Spell {
    return Spell.FourthCircle(
      'Erase',
      'Roll an armor check for each point of MND the caster has. Characters reduced to 0 CON by this spell are removed from the table and can not be brought back into the game.',
      3,
      'P',
      7
    );
  };

  static ThornStrike(): Spell {
    return Spell.FirstCircle(
      'Thorn Strike',
      'Hurl a piercing line of thorns in front of you.',
      6,
      'L0',
      1
    );
  };
  static EntanglingVines(): Spell {
    return Spell.FirstCircle(
      'Entangling Vines',
      'The target treats all movement as difficult terrain until the beginning of your next turn.',
      3,
      'P'
    );
  };
  static AspectOfSpider(): Spell {
    return Spell.FirstCircle(
      'Aspect of Spider',
      'The caster can move through difficult terrain and climb obstacles using regular movement.',
      'Self',
      'P'
    );
  };
  static SprayOfThorns(): Spell {
    return Spell.SecondCircle(
      'Spray of Thorns',
      'Fling a wide cone of thorns, piercing all those in their path.',
      3,
      'C',
      3
    );
  };
  static Rejuvenate(): Spell {
    return Spell.SecondCircle(
      'Rejuvenate',
      'Heal an injured ally, restoring 1 CON to them and allowing them to return to the fight.',
      3,
      'P'
    );
  };
  static WhippingVines(): Spell {
    return Spell.SecondCircle(
      'Whipping Vines',
      'Cracking vines fill an area, whipping all those that come within range.',
      3,
      'B2',
      3
    );
  };
  static TreeSkin(): Spell {
    return Spell.SecondCircle(
      'Tree Skin',
      'The caster gains +3 armor until the end of the player’s next turn',
      'Self',
      'P'
    );
  };
  static BramblePatch(): Spell {
    return Spell.SecondCircle(
      'Bramble Patch',
      'The area of the spell is considered difficult terrain until the end of the player’s next turn',
      6,
      'B3'
    );
  };
  static Pacify(): Spell {
    return Spell.ThirdCircle(
      'Pacify',
      'The target can not use any offensive actions, spells or abilities until the end of your next turn.',
      9,
      'P'
    );
  };
  static SproutingAssault(): Spell {
    return Spell.ThirdCircle(
      'Sprouting Assault',
      'Touch an ally’s weapon. The next time the imbued weapon strikes an enemy, even if it doesn’t penetrate their armor, vines sprout from their body. The character is slowed and treats all movement as if they were moving over difficult terrain. If they move over difficult terrain they roll their difficult terrain check twice and choose the lower result. If the character rolls 10 or lower on any difficult terrain checks they fall prone. This effect ends when the character or one of their allies performs an attack against the vines. The vines have an armor of 2 and CON of 1.',
      'Touch',
      'P'
    );
  };
  static PlantWall(): Spell {
    return Spell.ThirdCircle(
      'Plant Wall',
      "Summon an inch-thick plant wall up to 4 inches long. The wall can be placed in any spot as long as part of it is touching the character’s base. It can not run through terrain. If a character is in the wall's path they are moved to the closest side of the wall and must make an armor save to avoid taking damage. When conjured, the wall can be either chest height, allowing it to be used as cover and to be moved across like a low wall; or the wall can be taller, treating it as impassable terrain that is too dangerous to climb. The wall lasts until the end of your next turn. If the wall is conjured as chest high and a character attempts to move across the wall they must make a strength 0 armor check to avoid taking damage.",
      'Self',
      'P'
    );
  };
  static Charm(): Spell {
    return Spell.FourthCircle(
      'Charm',
      'The character temporarily switches armies. They do not generate an order for either player while they are charmed but they do react to enemies as if they belonged to the spellcaster’s army. You may spend regular orders to control this character. At the beginning of the original owner’s turn the target character must roll a bravery check with a -4 penalty. If that check is successful this spell effect ends. Each turn the penalty to the bravery roll drops by 1.',
      6,
      'P'
    );
  };
  static BurstingThorns(): Spell {
    return Spell.FourthCircle(
      'Bursting Thorns',
      '',
      6,
      'B3',
      6
    );
  };

  static StoneDaggers(): Spell {
    return Spell.FirstCircle(
      'Stone Daggers',
      'Hurl two tiny stone daggers at an enemy. Roll two armor checks and use the higher of the two results.',
      6,
      'P',
      2
    );
  };
  static UnevenGround(): Spell {
    return Spell.FirstCircle(
      'Uneven Ground',
      'The ground shifts and cracks under the power of your spell. Create an area of difficult terrain that lasts until the end of your next turn.',
      3,
      'B3'
    );
  };
  static NullField(): Spell {
    return Spell.SecondCircle(
      'Null Field',
      'Magical attacks and magic items must pass an additional strength 2 armor check for a spell effect to affect anything within the bubble. This bubble lasts until the end of your next turn.',
      3,
      'B2'
    );
  };
  static CrushingDirt(): Spell {
    return Spell.SecondCircle(
      'Crushing Dirt',
      'A massive hand of dirt reaches from the ground and attempts to crush the foe.',
      6,
      'P',
      5
    );
  };
  static ImbueWithStone(): Spell {
    return Spell.SecondCircle(
      'Imbue with Stone',
      'Imbue a set of armor with stone. The affected character’s movement speed is reduced by 1, but their armor is increased by 2 until they are struck with an attack. At any time the caster may also choose to end the effect.',
      3,
      'P'
    );
  };
  static Tremor(): Spell {
    return Spell.SecondCircle(
      'Tremor',
      'All characters in the area are knocked prone.',
      6,
      'B3'
    );
  };
  static StoneFlesh(): Spell {
    return Spell.SecondCircle(
      'Stone Flesh',
      'The caster gains +3 armor until the end of the player’s next turn.',
      'Self',
      'P'
    );
  };
  static PrisonOfStone(): Spell {
    return Spell.ThirdCircle(
      'Prison of Stone',
      'A cage of stone surrounds the character. It is impassable terrain and will fall apart at the beginning of your next turn. It may also be broken by attacking it and doing 1 CON damage. It has an armor value of 5. Line of sight can still be drawn into and out of the cage but the stone grants cover to the character inside it.',
      6,
      'P'
    );
  };
  static PebbleCloud(): Spell {
    return Spell.ThirdCircle(
      'Pebble Cloud',
      'Create a cloud of pebbles surrounding you. At any point during a future order you can choose to fling the pebbles at an enemy within 3 inches as speed 3, strength 3 attack. If you do not choose to use them offensively you may form them into a shield and add +3 to your armor against a successful attack. When used in either manner, the spell ends.',
      'Self',
      'P'
    );
  };
  static WallOfStone(): Spell {
    return Spell.ThirdCircle(
      'Wall of Stone',
      "Summon an inch-thick wall of rock and stone up to 4 inches long. The wall can be placed in any spot as long as part of it is touching the character’s base. It can not run through obstacles. If characters are in the wall's path, they are moved to the closest side of the wall and are knocked prone. When conjured, the wall can be either chest-height, allowing it to be used as cover and moved across like a low wall; or the wall can be taller, treating it as impassable terrain that is too dangerous to climb. If conjured as impassable terrain, the wall will last until the end of your next turn, but a chest-high wall will be permanent until the character decides to end the effect for free during an order, or until the caster dies or is knocked unconscious.",
      'Self',
      'P'
    );
  };
  static MeteorStrike(): Spell {
    return Spell.FourthCircle(
      'Meteor Strike',
      'Summon a volley of meteors to strike all those in the area. Place a token at a spot within range of this spell and within line of sight. If the token shares a spot with a character, this token does not move with them. At the beginning of the player’s next turn, roll a strength 9 attack against all characters within 5 inches of the  token.',
      12,
      'P'
    );
  };
  static Earthquake(): Spell {
    return Spell.FourthCircle(
      'Earthquake',
      'Any characters in the area of the spell fall prone even if they are not damaged by the spell. The area becomes difficult terrain until the end of your next turn. The caster is not affected by this spell even if they are within range of its effect.',
      6,
      'B5',
      3
    );
  };
  static Petrify(): Spell {
    return Spell.FourthCircle(
      'Petrify',
      'If the character has a CON score higher than 1, roll an extra armor check, with the potential of causing 2 points of CON damage. If reduced to 0 CON the character is killed outright. Any characters killed in this way stay in play as a piece of scenery that can be used as cover. They can not be affected by other spells or abilities. If a character is not killed by this spell they are slowed until the end of their next turn.',
      3,
      'P',
      8
    );
  };
  static SummonEarthElemental(): Spell {
    return Spell.FourthCircle(
      'Summon Earth Elemental',
      'Create an elemental under your control. The elemental has the Instinct trait but may have regular orders spent on it as well. Elementals are immune to fear and bravery based checks and can not be affected by spells that force them to attack allies or switch sides in battle.',
      3,
      'P'
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.EarthElemental()))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.EarthElemental()));
  };

  static DistantStrike(): Spell {
    return Spell.FirstCircle(
      'Distant Strike',
      'You conjure an image to strike your foe, using their own mind against them to cause very real pain. This can be a copy of yourself, a wild animal, a ball of force, or any illusion the conjurer can imagine.',
      6,
      'P',
      3
    );
  };
  static Illuminate(): Spell {
    return Spell.FirstCircle(
      'Illuminate',
      'Add 2 to any attack rolls against the target. They cannot sneak or hide while this spell is active. They are also considered to be equipped with a torch or lantern while determining line of sight. This effect ends at the end of your next turn.',
      3,
      'P'
    );
  };
  static EnchantingMark(): Spell {
    return Spell.FirstCircle(
      'Enchanting Mark',
      'Add 2 to any of the casters’ attack rolls against their chosen target. This effect lasts until the end of your next turn',
      6,
      'P'
    );
  };
  static Blind(): Spell {
    return Spell.FirstCircle(
      'Blind',
      'The target is blinded until the end of your next turn.',
      6,
      'P'
    );
  };
  static Phase(): Spell {
    return Spell.SecondCircle(
      'Phase',
      'Immediately make a move action as part of this spell. You may pass through otherwise solid terrain as part of this movement. You may not end this movement inside scenery pieces or an area you would not normally be able to access via mundane means.',
      'Self',
      'P'
    );
  };
  static MageLight(): Spell {
    return Spell.SecondCircle(
      'Mage Light',
      'Add 2 to attacks for characters targeting enemies within this area. This area acts as if illuminated by a torch or lantern and lasts until the end of your turn',
      9,
      'B3'
    );
  };
  static DistortingCloud(): Spell {
    return Spell.SecondCircle(
      'Distorting Cloud',
      'All those within the spell effect are considered in cover, even when they are attacked in melee. This effect lasts until the end of your next turn.',
      6,
      'B2'
    );
  };
  static Disguise(): Spell {
    return Spell.SecondCircle(
      'Disguise',
      'Select a character within four inches of the caster. You can choose to swap places with them or not, but regardless, both of you now look identical. Make a note to yourself which character is which. These changes are strictly cosmetic, and will not change either affected characters’ equipment. The spell effect ends when the caster uses any magic, or if either character uses a piece of equipment the other does not have (using a bow when the spellcaster does not have a bow, using a melee weapon when the model you are disguised as does not have a melee weapon, and so on). You may cast this for free before the battle starts, disguising characters during deployment. If you choose to do so the spell casting does not count towards the character’s spell capacity and risk of spell burn. A character may only cast one spell during deployment.',
      'Self',
      'P'
    );
  };
  static Invisibility(): Spell {
    return Spell.SecondCircle(
      'Invisibility',
      'The target becomes hidden as if they just successfully passed a Hide roll. While this spell effect is active, enemies may not target or react to the character other than to turn towards the character if they move within the enemy sphere of awareness. This spell ends at the end of your next turn, or if the character uses anything other than move actions. That character may immediately take a Hide action for free as soon as the spell ends to determine if they remain hidden.',
      2,
      'P'
    );
  };
  static TransmuteBody(): Spell {
    return Spell.ThirdCircle(
      'Transmute Body',
      'You may choose one of the following. The caster gains those effects until the end of your next turn. Spectral Wings - Flying trait, +2 to armor. Natural Weapons - Strong trait, +2 to weapon strength. Multi-Legged - Fast trait, ignore difficult terrain',
      'Self',
      'P'
    );
  };
  static MirrorImage(): Spell {
    return Spell.ThirdCircle(
      'Mirror Image',
      'Create a mirror image of the caster or another character within range. You can choose to swap their physical location with the location of that image. Note which model is the image and which is the true character. When you spend an order, both the character and the mirror take any move actions at the same time. This spell ends when the character attempts to attack, or cast a spell, or if the character or mirror is hit with an attack or spell. This spell can be cast before your forces deploy by sacrificing an order from your first turn of the game. A character can only cast one spell during deployment, and this effect can only be active once per Illusionist trained spellcaster.  Mirror images cannot be created from other mirror images or characters that already have a similar spell cast on them, such as Disguise. If this spell is cast before battle, the spell casting does not count towards the character’s spell capacity and risk of spell burn',
      6,
      'P'
    );
  };
  static SteelStorm(): Spell {
    return Spell.ThirdCircle(
      'Steel Storm',
      'You give form to a blade using only your imagination, and conjure multiple copies that spin and slice through an area.',
      9,
      'B3',
      3
    );
  };
  static GreaterMirrorImage(): Spell {
    return Spell.FourthCircle(
      'Greater Mirror Image',
      'Create up to three images of the caster or other characters in your control. Note which models are the images. These images appear within an inch of the character, and the character may also swap positions with one, obscuring which one is true and which are false. When you choose to spend an order on the original model, all images associated with it can move as well. When a character with mirror images associated with it attempts to attack or cast a spell, all images will disappear. If an enemy attacks and hits a mirror image, only that image disappears. If an enemy attacks and hits the true character, all images will disappear. This spell can be cast before your forces deploy by sacrificing two orders from your first turn of the game. A character can only cast one spell during deployment, and this effect can only be active once per Illusionist. Mirror images can not be created from other mirror images or characters that already have a similar spell cast on them, such as Disguise. If this spell is cast before, the spell casting does not count towards the character’s spell capacity and risk of spell burn.',
      9,
      'P'
    );
  };
  static ShadeAssassin(): Spell {
    return Spell.FourthCircle(
      'Shade Assassin',
      'Create an shade assassin under your control. The assassin has the Instinct trait but may have regular orders spent on it as well. Assassins can be targeted by banish elemental spells, is immune to fear and bravery based checks and can not be affected by spells that force them to attack allies or switch sides in battle.',
      3,
      'P'
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.ShadeAssassin()))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.ShadeAssassin()));
  };

  static GhostlyTouch(): Spell {
    return Spell.FirstCircle(
      'Ghostly Touch',
      'The target is slowed even if this spell does not do damage.',
      1,
      'P',
      6
    );
  };
  static SkeletalHands(): Spell {
    return Spell.FirstCircle(
      'Skeletal Hands',
      'Attempt a damage roll against any enemies that enter the area or start an order in this area until the end of your next turn. If the damage roll is successful, the enemy is slowed and treats the entire area as difficult terrain.',
      4,
      'B3',
      2
    );
  };
  static Harm(): Spell {
    return Spell.FirstCircle(
      'Harm',
      'A searing pain rips through the skull of your foe.',
      6,
      'P',
      3
    );
  };
  static Darkness(): Spell {
    return Spell.FirstCircle(
      'Darkness',
      'Characters drawing line of sight into or through this area treat enemies as if they are in cover unless that enemy is also within their sphere of awareness. If the target was already in cover, add that cover bonus  again. This effect lasts until the end of your next turn.',
      3,
      'B2'
    );
  };
  static Fear(): Spell {
    return Spell.FirstCircle(
      'Fear',
      'Force the target to make a bravery check or flee.',
      3,
      'P'
    );
  };
  static CorpseFlesh(): Spell {
    return Spell.SecondCircle(
      'Corpse Flesh',
      'Add 2 to your armor unless the incoming damage is caused by a spell from the Pyromancy, Thaumaturgy or Geomancy schools of magic. If it is from those  schools, subtract 2 from your armor check roll  instead. This spell lasts until the caster dies or voluntarily ends the spell. A character cannot re-cast Corpse Flesh on themselves if the effect is already active.',
      'Self',
      'P'
    );
  };
  static VampireBite(): Spell {
    return Spell.SecondCircle(
      'Vampire Bite',
      'Using the caster’s PHY, DEX or MND score as the strength, have the target roll an armor check. If it successfully damages the enemy, the caster gains one point of CON. If used successfully at full health, this skill allows a character to exceed their maximum CON by 1. If this battle is part of a campaign instead of a single skirmish, the caster does not keep the bonus for future battles.',
      'Touch',
      'P'
    );
  };
  static BloodyTears(): Spell {
    return Spell.SecondCircle(
      'Bloody Tears',
      'Even if this attack does not wound the target, they are blinded until the end of your next turn.',
      6,
      'P',
      4
    );
  }
  static AnimateDead(): Spell {
    return Spell.SecondCircle(
      'Animate Dead',
      'Raise the corpse of a dead character. This character is on your side and generates an Instinct order. This character can only perform the following actions: Basic Move, Double Move, Dodge, Basic Melee attack, The Melee Attack, Push and Attack, and Retreat abilities, Block, Basic ranged attack (if equipped with a ranged weapon). The animated dead has the stats of the character that  was raised, but with a -1 penalty to PHY and DEX, and a CON of 1. If reduced to 0 CON this reanimated character skips the gravely wounded step and moves immediately to being dead. It can not have the Animate Dead spell, or any other similar spells, cast on it again.',
      'Touch',
      'P'
    );
  };
  static MomentaryMadness(): Spell {
    return Spell.SecondCircle(
      'Momentary Madness',
      'If this attack hits and passes the character’s armor, that character does not take damage as it would with a normal offensive spell. On their next turn, an order must be spent on it. That order must be to move to the closest character, friend or foe, and attack it with a basic attack. In a case where two or more characters are the same distance from the maddened character, the caster chooses which one is attacked. If the controlling player does not spend an order on this character to activate it, the character takes 1 CON damage as they attempt to scratch out their own eyes',
      12,
      'P',
      3
    );
  };
  static NecroticVitality(): Spell {
    return Spell.SecondCircle(
      'Necrotic Vitality',
      '+1 MOV until the end of your next turn for all characters in the spell area.',
      6,
      'B1'
    );
  };
  static WitheringRay(): Spell {
    return Spell.SecondCircle(
      'Withering Ray',
      'A focused beam of necrotic power pierces all but the toughest surfaces, siphoning away the life force from whatever it touches.',
      9,
      'L0',
      4
    );
  };
  static Terror(): Spell {
    return Spell.ThirdCircle(
      'Terror',
      'The target acts as if they just failed a bravery roll. At the beginning of each turn they may choose one of the following: Attempt a bravery check with a -6 penalty OR Attempt a STR 6 armor check. The spell ends if you choose this option. The -6 penalty or 6 STR attack reduces by 2 every turn until either an armor check is attempted or a bravery check is passed.',
      3,
      'P'
    );
  };
  static FleshToAsh(): Spell {
    return Spell.ThirdCircle(
      'Flesh to Ash',
      'Using the power of death, you wither the body of the enemy. Exposed flesh becomes as brittle as parchment, and muscle underneath wastes away.',
      6,
      'P',
      6
    );
  };
  static CreateUndead(): Spell {
    return Spell.ThirdCircle(
      'Create Undead',
      'Create a human-sized undead character at the point of this spell. This character is on your side and generates an Instinct order. This character can only perform the following actions: Basic Move, Double Move, Dodge, Basic Melee attack, The melee attack an push and attack and retreat abilities, Block. If reduced to 0 CON this character skips the gravely wounded step and immediately dies. It can not have the Animate Dead spell, or any other similar spells, cast on it.',
      6,
      'P'
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.Undead()))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.Undead()));
  };
  static BloodPact(): Spell {
    return Spell.FourthCircle(
      'Blood Pact',
      'Link two targets in range together. Each time one of those characters makes an armor check to take damage, the linked character must also roll an armor check. If linking an ally to another character, your ally receives a +2 bonus to armor checks forced through this link. If linking a character to the caster, the caster receives a +4 bonus to all of their armor checks. This spell ends if either of the two affected characters moves twelve inches away from the caster or the other linked character.',
      9,
      'P'
    );
  };
  static RemoveSkeleton(): Spell {
    return Spell.FourthCircle(
      'Remove Skeleton',
      'If this spell reduces the target to 0 CON remove them completely from play and replace it with a new skeletal ally under your control. Characters within three inches that have line of sight to this skeleton when it is created must pass a bravery check or flee. If reduced to 0 CON this skeleton skips the gravely wounded step and immediately dies. It can not have the Animate Dead spell, or any other similar spells, cast on it.',
      5,
      'P',
      3
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.Skeleton('The Weapon of the character that was slain...')))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.Skeleton('The Weapon of the character that was slain...')));
  };
  static DestroyLife(): Spell {
    return Spell.FourthCircle(
      'Destroy Life',
      'This spell does CON damage equal to the caster’s MND score if it defeats the enemy’s armor.',
      'Touch',
      'P',
      9
    );
  };

  static TelepathicStrike(): Spell {
    return Spell.FirstCircle(
      'Telepathic Strike',
      'Reach out and attempt to crush the mind of your enemy',
      6,
      'P',
      3
    );
  };
  static Feeblemind(): Spell {
    return Spell.FirstCircle(
      'Feeblemind',
      'The target is slowed until the end of the enemy’s next turn.',
      9,
      'P'
    );
  };
  static TurnWeapon(): Spell {
    return Spell.FirstCircle(
      'Turn Weapon',
      'Shield yourself from the next incoming blow, adding +4 to the caster’s armor the next time they make an armor check. This spell can be used as a reaction, but when used in this way reduce your spell capacity by 1. If the character’s spell capacity is at zero or lower, roll for spell burn as if they had cast a second circle or higher spell.',
      'Self',
      'P'
    );
  };
  static MindBlank(): Spell {
    return Spell.FirstCircle(
      'Mind Blank',
      'Force your enemy to lose focus.The target can not use reactions and only generate an Instinct order if they would normally generate a Standard order. This lasts until the end of the enemy’s turn.',
      3,
      'P'
    );
  };
  static PsychokineticHorror(): Spell{
    return Spell.SecondCircle(
      'Pyschokinetic Horror',
      'If this spell beats the character’s armor value, they are not injured but act as if they have just failed a bravery check. In addition to this, they immediately fall prone.',
      9,
      'P',
      7
    );
  };
  static CompelPerson(): Spell {
    return Spell.SecondCircle(
      'Compel Person',
      'The next time an order is spent on the affected character roll a STR 3 armor check against the enemy. If it is successful, you decide what the character does with that order instead. They will not harm themselves, but they may harm their allies.',
      3,
      'P'
    );
  };
  static ForceWeapon(): Spell {
    return Spell.SecondCircle(
      'Force Weapon',
      'You conjure a weapon of pure psionic force. This weapon shoots forward and strikes your foe',
      9,
      'P',
      5
    );
  };
  static TelekineticProtection(): Spell {
    return Spell.SecondCircle(
      'Telekinetic Protection',
      'The targeted ally has a +2 bonus to its next armor check',
      3,
      'P'
    );
  };
  static TelekineticTrap(): Spell {
    return Spell.ThirdCircle(
      'Telekinetic Trap',
      'Place a token within range of this spell. If an enemy comes within two inches of that spot, those objects fly at them. Roll two STR 3 armor checks against the enemy.',
      3,
      'P'
    );
  };
  static BubbleOfForce(): Spell {
    return Spell.ThirdCircle(
      'Bubble of Force',
      'Characters inside the spell area are protected from enemy ranged and magic attacks. Attacks can not penetrate the barrier, but characters can walk through it. This barrier lasts until the end of your next turn.',
      3,
      'B2'
    );
  };
  static Sleep(): Spell {
    return Spell.ThirdCircle(
      'Sleep',
      'The character falls asleep. They do not generate orders on turns in which they are asleep and can not act until woken up. At the start of each of the owner’s turns, they must roll a d20 and subtract the caster’s  MND value. On a 12 or lower, the character remains asleep. Repeat for each turn, reducing the value for a successful roll by 1. For example, on the second turn, the character will wake up with a roll of 11 or lower; the next turn, 10 or lower, and so on. The character can only be woken up if they succeed on their awakening roll, or are hit by an attack.',
      9,
      'P'
    );
  };
  static DestroyMind(): Spell {
    return Spell.FourthCircle(
      'Destroy Mind',
      'If the target fails their armor save this attack does CON damage equal to the caster’s MND score.',
      3,
      'P',
      8
    );
  };

  static MoteOfFlame(): Spell {
    return Spell.FirstCircle(
      'Mote of Flame',
      'Singe your foe with a conjured, burning projectile.',
      9,
      'P',
      2
    );
  };
  static FireWhip(): Spell {
    return Spell.FirstCircle(
      'Fire Whip',
      'You manifest a whip of pure flame, striking your enemies.',
      3,
      'P',
      5
    );
  };
  static Fireball(): Spell {
    return Spell.SecondCircle(
      'Fireball',
      'You pitch a ball of rolling flames across the battlefield.',
      12,
      'B1',
      4
    );
  };
  static Heat(): Spell {
    return Spell.SecondCircle(
      'Heat',
      'You enchant the target’s weapons and heat them to a cherry red. The target receives a -4 penalty to attack rolls until the end of your next turn. If that character scores a hit with their weapon, add 1 to its strength. If the character’s dice roll is under 5 before adding bonuses, the weapon burns them and they must roll a STR 2 armor check. They drop their weapon and must spend a standard action to pick it up again or fight with their bare hands.',
      6,
      'P'
    );
  };
  static FlameShield(): Spell {
    return Spell.SecondCircle(
      'Flame Shield',
      'The caster gains 2 armor. Upon casting, subtract 2 armor from enemies within two inches of the caster. This effect lasts until the end of your next turn. Only enemies that were within two inches of the caster when the spell was first cast will have their armor damaged.',
      'Self',
      'P'
    );
  };
  static ImbueWithFire(): Spell {
    return Spell.SecondCircle(
      'Imbue With Fire',
      'You touch an ally’s weapon and imbue it with the power of flame. The next time it hits a target, that target catches fire. At the beginning of the enemy’s next turn, if the burning character is still alive, roll a STR 2 armor check as the fire attempts to consume them.',
      'Touch',
      'P'
    );
  };
  static BreathOfTheDragonKing(): Spell {
    return Spell.SecondCircle(
      'Breath of the Dragon King',
      'Fill your lungs with air and breathe out a white-hot jet of searing flame.',
      3,
      'C',
      3
    );
  };
  static FlameOfTheEvenstar(): Spell {
    return Spell.SecondCircle(
      'Flame of the Evenstar',
      'Characters in the path of this spell are blinded until the end of your next turn even if they take no damage.',
      12,
      'L2',
      1
    );
  };
  static Flamestrike(): Spell {
    return Spell.ThirdCircle(
      'Flamestrike',
      'A pillar of flames erupts from the earth, engulfing the area in magical fire.',
      9,
      'B2',
      5
    );
  };
  static ProximityBlast(): Spell {
    return Spell.ThirdCircle(
      'Proximity Blast',
      'Leave a small fire behind. Place a token within range of this spell. If an enemy comes within 2 inches of that spot, the flame roars to life, scorching all those within a B2 blast of the point. Characters caught in the blast must attempt to survive a strength 5 armor check. The caster is immune to this effect.',
      2,
      'P'
    );
  };
  static HurlCinders(): Spell {
    return Spell.ThirdCircle(
      'Hurl Cinders',
      'You conjure three motes of flame, tossing them each at their own target. You may make three attacks with a single cast of this spell. These may target a single character, or be divided among your foes.',
      9,
      'P',
      3
    );
  };
  static MoltenEarth(): Spell {
    return Spell.ThirdCircle(
      'Molten Earth',
      'Intense heat melts a patch of earth, burning all those who dare tread across. The area becomes difficult terrain until the end of your next turn. Any characters that touch or end their turn in this area must roll a STR 2 armor check.',
      6,
      'B2'
    );
  };
  static BindingOfFlame(): Spell {
    return Spell.ThirdCircle(
      'Binding of Flame',
      'A prison of searing fire surrounds the target, building in heat and intensity until it releases its energy outward in a mighty blast. An area of flame the size of the character’s base surrounds the target. If they attempt to move outside this area, they must pass a STR 6 armor check to avoid taking damage. Characters that move into melee range and characters that end their turn in melee range with the affected character must also pass the same check. This effect ends at the end of your next turn. When it ends, any character within one inch of the character must attempt to survive a STR 4 attack. The caster may choose if the character inside the effect is also affected by the blast.',
      6,
      'P'
    );
  };
  static WrathOfTheDaystar(): Spell {
    return Spell.ThirdCircle(
      'Wrath of the Daystar',
      'Channeling the fury of the Daystar, a roaring column of flame extends from your hands.',
      9,
      'L1',
      7
    );
  };
  static DestroyElemental(): Spell {
    return Spell.ThirdCircle(
      'Destroy Elemental',
      'Pyromancers take pride in the ease at which they destroy elementals. Destroy the target elemental, removing it from play. Elementals may not react to this spell.',
      6,
      'P'
    );
  };
  static WallOfFire(): Spell {
    return Spell.ThirdCircle(
      'Wall of Fire',
      'A roaring wall of liquid flame springs from the ground, forming an impassable barrier. Summon an inch-thick wall of lava up to four inches long. The wall can be placed in any spot as long as part of it is touching the character’s base. It cannot run through terrain and must be in contact with the ground. Characters inside the wall area are pushed to the nearest edge. The wall is impassable and blocks line of sight. The wall periodically throws out wisps of flame and searing heat, injuring those close to it. If a character moves within an inch of the wall or ends the turn within that range they must attempt a STR 2 armor check to avoid damage. The caster is immune to the damaging effects of this spell. The wall lasts until the end of your next turn.',
      'Self',
      'P'
    );
  };
  static Immolation(): Spell {
    return Spell.FourthCircle(
      'Immolation',
      'Writhing blue flames consume the target from the inside.',
      12,
      'P',
      10
    );
  };
  static IncineratingFog(): Spell {
    return Spell.FourthCircle(
      'Incinerating Fog',
      'An eerie, orange, glowing fog fills the area. Its strange beauty does not distract from the pain, however, as the fog burns the lungs of all who breathe it in. Characters that move through this area have their vision limited to their sphere of awareness. Characters who spend an order or end the turn inside this fog patch must survive make a strength 0 Armor check. This spell lasts until the caster is either knocked unconscious, killed, or moves more than 10 inches away from the center of the effect. The caster is not affected by the negative aspects of this spell.',
      9,
      'B4'
    );
  };
  static CreateFireElemental(): Spell {
    return Spell.FourthCircle(
      'Create Fire Elemental',
      'When infused with life, the raw power of fire becomes an even more terrifying force of destruction. Fire elementals are the most erratic and shortest-lived of elementals, relying on the pure passion of their creators to fuel them. Because of this, it is rare to see a fire elemental in the wild without a creator nearby.  Create an elemental under your control. The elemental has the instinct trait but may have regular orders spent on it as well. When this elemental strikes a foe that character catches fire. At the beginning of the character’s next turn they must pass a single STR 2 armor check. This effect does not stack multiple times if the character',
      3,
      'P'
    )
    .setAddEffect((char: Magicable) => (char as Magicable).AddElemental(Elemental.FireElemental()))
    .setRemoveEffect((char: Magicable) => (char as Magicable).RemoveElemental(Elemental.FireElemental()));
  };

  static SearingPrayer(): Spell {
    return Spell.FirstCircle(
      'Searing Prayer',
      'Channel raw power into a hammer of light that strikes your foe.',
      6,
      'P',
      3
    );
  };
  static Stabilize(): Spell {
    return Spell.FirstCircle(
      'Stablize',
      'Soothing light coats your fallen ally, knitting the worst of their wounds just enough to keep them alive another day. If a gravely injured character has not yet died as a result of their injuries but has 0 CON, they are restored to 1 CON but remain unconscious. A character with the medic skill or with medical supplies may remove their unconscious state with a standard action.',
      3,
      'P'
    );
  };
  static RighteousStrike(): Spell {
    return Spell.FirstCircle(
      'Righteous Strike',
      'A prayer coats your weapon in pure magical light, adding explosive holy force to your attack. If cast successfully, the target rolls an armor check against your character’s weapon STR +2.',
      'Touch',
      'P'
    );
  };
  static Protection(): Spell {
    return Spell.FirstCircle(
      'Protection',
      'Luminous liquid coats your ally, softening attacks and protecting them from harm. Add +2 to the target’s armor until the end of your next turn.',
      3,
      'P'
    );
  };
  static CausePain(): Spell {
    return Spell.SecondCircle(
      'Cause Pain',
      'Your target convulses in pain as old wounds reopen and forgotten hurts reignite.',
      6,
      'P',
      5
    );
  };
  static WordsOfHealing(): Spell {
    return Spell.SecondCircle(
      'Words of Healing',
      'Your ally’s injuries stitch closed as they are infused with healing power. You restore 1 CON to the target. They cannot exceed their maximum CON score. If the target is unconscious and gravely wounded, they are able to act again after this spell is cast. Characters who have been restored using the Stabilize spell, or those unconscious and not dying via other means, also wake up if this spell is cast on them',
      3,
      'P'
    );
  };
  static ProtectFromHarm(): Spell {
    return Spell.SecondCircle(
      'Protect from Harm',
      'A radiant dome of power protects your allies, coating them in sheets of solidified light. Create an area of protection that lasts until the end of your next turn. Allies inside the area add +2 to their armor.',
      3,
      'B2'
    );
  };
  static Aid(): Spell {
    return Spell.SecondCircle(
      'Aid',
      'You focus your mind on an ally and assist them with a task. You add your MND score to an ally’s next roll.',
      6,
      'P'
    );
  };
  static Bless(): Spell {
    return Spell.SecondCircle(
      'Bless',
      'A charge of holy energy seeps into your target, allowing them to call on that power at a later time. Your target’s body is charged with magical power. At any time, that character can expend that charge to add or subtract 2 from any roll involving them.',
      'Touch',
      'P'
    );
  };
  static DivineInspiration(): Spell {
    return Spell.ThirdCircle(
      'Divine Inspiration',
      'You commune with the gods, gaining insight into future events. The caster gains a charge of divine inspiration. You can expend this charge by adding +4 to a die roll in the future. You may choose to use this charge after you see the result of the roll; if so, you may only add +2 to the roll.',
      'Self',
      'P'
    );
  };
  static LightWave(): Spell {
    return Spell.ThirdCircle(
      'Light Wave',
      'A wave of force radiates from you, repelling and injuring foes. All those hit with this ability are pushed one inch directly away from the caster even if they take no damage.',
      'Self',
      'B3',
      5
    );
  };
  static SacredHome(): Spell {
    return Spell.ThirdCircle(
      'Sacred Home',
      'Your spell creates an area of serenity, welcoming to all. This area negates all attacks and spells with a listed strength value. No characters may use or be targeted by any such attacks while within the area. This area lasts until the end of your next turn',
      3,
      'B2'
    );
  };
  static SmitingBlast(): Spell {
    return Spell.ThirdCircle(
      'Smiting Blast',
      'You call down a pillar of light, blasting the ground at the point of impact',
      6,
      'B1',
      6
    );
  };
  static RadiantForce(): Spell {
    return Spell.ThirdCircle(
      'Radiant Force',
      'A fist sized ball of light streaks from the sky to strike your foe. The target is also pushed one inch directly away from the caster even if this spell does not do damage',
      9,
      'P',
      7
    );
  };
  static Resurrect(): Spell {
    return Spell.FourthCircle(
      'Resurrect',
      'You call a departed soul back from the brink, healing their body and restoring their consciousness. You bring a dead ally back to life, restoring them to 1 CON.',
      3,
      'P'
    );
  };
  static ArmourOfTheGods(): Spell {
    return Spell.FourthCircle(
      'Armor of the Gods',
      'You touch an ally, coating them with a golden light. Until the beginning of your next turn, your target gains +6 to their armor.',
      'Touch',
      'P'
    );
  };

  static AcidicAssault(): Spell {
    return Spell.FirstCircle(
      'Acidic Assault',
      'You fling a globe of caustic magic.',
      3,
      'P',
      3
    );
  };
  static Hex(): Spell {
    return Spell.FirstCircle(
      'Hex',
      'A muttered curse in an ancient language saps energy from its recipient. The target must subtract 2 from their next roll or the next ally to attack the target adds 2 to their roll, whichever comes first.',
      9,
      'P'
    );
  };
  static TentacleField(): Spell {
    return Spell.SecondCircle(
      'Tentacle Field',
      'The area writhes with spectral tentacles, slowing all those who tread across the area. The area counts as difficult terrain to all characters but the caster. This effect lasts until the end of your next turn.',
      3,
      'B3'
    );
  };
  static NoxiousSpray(): Spell {
    return Spell.SecondCircle(
      'Noxious Spray',
      'You extend your arms and poisonous fumes spray towards your enemy.',
      3,
      'C',
      3
    );
  };
  static Anathema(): Spell {
    return Spell.SecondCircle(
      'Anathema',
      'Utter a soul-deep curse to blight your enemy’s aura, forcing their allies to shun them and move cautiously in their presence lest they be inflicted with the same curious malady. Allies of the target treat an inch area around the target as if it was difficult terrain. Any allied character moves through or ends their turn within that area has the spell effect apply to them as well. These characters may also pass the spell onto others. The effect persists for all affected until the spell ends. This spell can be maintained, as described in the Arcane spell school. If not maintained beyond its original casting time the spell ends at the start of the target’s next turn.',
      9,
      'P'
    );
  };
  static Levitate(): Spell {
    return Spell.SecondCircle(
      'Levitate',
      'Harness the lightness of the wind to pass over otherwise harmful obstacles. The target acts as if they have the flying trait until the end of your next turn',
      2,
      'P'
    );
  };
  static CausticArrow(): Spell {
    return Spell.SecondCircle(
      'Caustic Arrow',
      'You form an arrow out of acid and magically fling it at your target.',
      9,
      'P',
      5
    );
  };
  static MistyJaunt(): Spell {
    return Spell.ThirdCircle(
      'Misty Jaunt',
      'You collapse into mist and reappear a distance away. You may move your character up to nine inches to a new location. This location must be an area you would normally be able to move to.',
      'Self',
      'P'
    );
  };
  static Web(): Spell {
    return Spell.ThirdCircle(
      'Web',
      'They say you’re never more than three feet from a spider. Take advantage of this fact by calling on your arachnid friends, filling the area with sticky webs. The area is difficult terrain. Any character that rolls under 10 for their difficult terrain movement check is stuck and must expend a full movement action to unstick themselves. The caster is immune to the effects of this spell. This effect lasts until the end of your next turn',
      'Self',
      'B3'
    );
  };
  static AcidOrb(): Spell {
    return Spell.ThirdCircle(
      'Acid Orb',
      'A large sphere of caustic liquid rolls forward. All those that come in contact with it are burnt by acid.',
      9,
      'L1',
      3
    );
  };
  static SpectralWarp(): Spell {
    return Spell.ThirdCircle(
      'Spectral Warp',
      'Spectral tentacles wrap around the target, crushing them. The target is unable to react or have orders spent on them until the beginning of your next turn, even if this spell does not do damage.',
      3,
      'P',
      5
    );
  };
  static Disintegrate(): Spell {
    return Spell.FourthCircle(
      'Disintegrate',
      'Destroy the bonds that hold flesh and bone together, causing it to fall away as fine ash. Roll an armor check for each MND point the caster has.',
      6,
      'P',
      5
    );
  };
  static Curse(): Spell {
    return Spell.FourthCircle(
      'Curse',
      'The most ancient of malicious magics, you condemn your foes with the power of your malevolent will. A curse can be a hard thing to shake, affecting you until the day you die. The target is cursed until the end of the game. Roll twice the first time this character would normally roll a die per order or reaction and pick the lower result. In the case when multiple dice are rolled during an order or reaction, the caster chooses which die will be rerolled.',
      9,
      'P'
    );
  };
};
