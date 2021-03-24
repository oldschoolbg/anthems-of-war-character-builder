import { Keyed } from "../../interfaces";
import { Spell } from "./spell";

export enum SpellSchools {
  Aerothurgy = "Aerothurgy",
  Aquamancy = "Aquamancy",
  Arcane = "Arcane",
  Bardic = "Bardic",
  Chronomancy = "Chronomancy",
  Druidic = "Druidic",
  Geomancy = "Geomancy",
  Illusion = "Illusion",
  Necromancy = "Necromancy",
  Psionic = "Psionic",
  Pyromancy = "Pyromancy",
  Thaumaturgy = "Thaumaturgy",
  Wild = "Wild"
};

export class SpellSchool implements Keyed {
  constructor(key: SpellSchools, description: string) {
    this._key = key;
    this._description = description;
  }

  private _key: SpellSchools;
  get Key(): SpellSchools { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _spells: Spell[] = [];
  get Spells(): Spell[] {
    return this._spells;
  }

  public AddSpell(spell: Spell): SpellSchool {
    const found = this._spells.findIndex(sp => sp.Key === spell.Key);
    if (found === -1) {
      this._spells.push(spell);
    } else {
      this._spells[found] = spell;
    }
    return this;
  }

  static get Options(): SpellSchool[] {
    return [
      SpellSchool.Aerothurgy(),
      SpellSchool.Aquamancy(),
      SpellSchool.Arcane(),
      SpellSchool.Bardic(),
      SpellSchool.Chronomancy(),
      SpellSchool.Druidic(),
      SpellSchool.Geomancy(),
      SpellSchool.Illusion(),
      SpellSchool.Necromancy(),
      SpellSchool.Psionic(),
      SpellSchool.Pyromancy(),
      SpellSchool.Thaumaturgy(),
      SpellSchool.Wild()
    ]
  }

  static Aerothurgy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Aerothurgy,
      'Aerothurges are masters of wind and electricity. They focus on speed-ing up allies, slowing down and staggering enemies, and unleashing powerful electrical attacks. This is no soft summer breeze; the winds these spellcasters control can whip through armies like the mightiest hurricane.'
    )
    // first circle
    .AddSpell(Spell.Shock())
    .AddSpell(Spell.SwiftFoot())
    .AddSpell(Spell.Windstep())
    // second circle
    .AddSpell(Spell.SparkSpray())
    .AddSpell(Spell.Shockwave())
    .AddSpell(Spell.Gust())
    .AddSpell(Spell.ImbueWithWind())
    .AddSpell(Spell.ShockingWeapon())
    .AddSpell(Spell.LightningBolt())
    // third circle
    .AddSpell(Spell.ChainLightning())
    .AddSpell(Spell.StormField())
    .AddSpell(Spell.WallOfStorms())
    // fourth circle
    .AddSpell(Spell.SphereOfStorms())
    .AddSpell(Spell.SummonAirElemental())
    .AddSpell(Spell.BanishElemental());
  }

  static Aquamancy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Aquamancy,
      'Aquamancers harness the power of water, ice and snow. They specialize in things such as slowing enemies and obscuring the battlefield with area of effect spells. While not as flashy as pyromancy or as terifying as necromancy, with persistence, water can cut paths through mountains. Never underestimate its strength, for this substance which gives us life can just as easily take it away.'
    )
    // first circle
    .AddSpell(Spell.IceShards())
    .AddSpell(Spell.IceSheet())
    .AddSpell(Spell.Chill())
    // second circle
    .AddSpell(Spell.FreezingSpray())
    .AddSpell(Spell.FrostRay())
    .AddSpell(Spell.ImbueWithWater())
    .AddSpell(Spell.Fog())
    // third circle
    .AddSpell(Spell.Blizzard())
    .AddSpell(Spell.DrivingRain())
    .AddSpell(Spell.IceWall())
    .AddSpell(Spell.WaterSphere())
    // fourth circle
    .AddSpell(Spell.Freeze())
    .AddSpell(Spell.SummonWaterElemental())
    .AddSpell(Spell.BanishElemental());
  }

  static Arcane(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Arcane,
      'Arcane mages weave their spells out of the purest essence of magic. They focus on casting long-lasting spells and manipulating the fabric of reality. Arcane mages are deeply in tune with the invisible force of magic itself, sensing the subtle vibrations that allow casters to weave their spells. By tapping into and concentrating the power of this very energy, they can easily dazzle and devastate their enemies.'
    )
    // first circle
    .AddSpell(Spell.WitchBolt())
    .AddSpell(Spell.EtherTorch())
    .AddSpell(Spell.DistractingCantrip())
    .AddSpell(Spell.MageSight())
    // second circle
    .AddSpell(Spell.ForceArrow())
    .AddSpell(Spell.EnergyJavelin())
    .AddSpell(Spell.MageArmor())
    .AddSpell(Spell.EtherSheet())
    // third circle
    .AddSpell(Spell.ArcaneSphere())
    .AddSpell(Spell.ShimmeringBarrier())
    .AddSpell(Spell.Sending())
    .AddSpell(Spell.ArcaneAura())
    // fourth circle
    .AddSpell(Spell.ArcanePortal())
    .AddSpell(Spell.EtherStorm());
  }

  static Bardic(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Bardic,
      'Bards, sometimes called spellsingers, use their natural charisma and the power of song to manipulate the battlefield. They focus on setting the enemy off balance and boosting the abilities of their allies. They say music calms the feral beast; a bard’s songs can do this, and so much more.'
    )
    // first circle
    .AddSpell(Spell.BarrageOfInsults())
    .AddSpell(Spell.Heckle())
    .AddSpell(Spell.BlindingChord())
    // second circle
    .AddSpell(Spell.CausticWords())
    .AddSpell(Spell.Guffaw())
    .AddSpell(Spell.SongOfBravery())
    .AddSpell(Spell.DiscordantNote())
    // third circle
    .AddSpell(Spell.VerseOfChaos())
    .AddSpell(Spell.BalladOfFramgmentation())
    .AddSpell(Spell.CadenceOfTheWarFather())
    // fourth circle
    .AddSpell(Spell.TerrifyingLullaby())
    .AddSpell(Spell.OctaveOfFlame());
  }

  static Chronomancy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Chronomancy,
      'Chronomancers have the power to control time itself. Their spells allow them to sense future possibilities and manipulate the stream of time for friends and foes alike. Chronomancers, more than anyone, understand that linear time as we know it is an illusion, one that can be warped and bent for their own benefit. Using their ability to twist the construct of time, they can conjure what may seem like miracles, from simply slowing enemies, to banishing people from reality itself.'
    )
    // first circle
    .AddSpell(Spell.TimeRift())
    .AddSpell(Spell.TimeWarp())
    .AddSpell(Spell.DilateTime())
    .AddSpell(Spell.Foresight())
    .AddSpell(Spell.SlowField())
    // second circle
    .AddSpell(Spell.WitheringOrb())
    .AddSpell(Spell.StasisBubble())
    .AddSpell(Spell.Haste())
    .AddSpell(Spell.Blink())
    // third circle
    .AddSpell(Spell.Scry())
    .AddSpell(Spell.TimeLoop())
    .AddSpell(Spell.Stop())
    // fourth circle
    .AddSpell(Spell.Erase());
  };

  static Druidic(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Druidic,
      'Beasts that crawl, vines that creep, thorns that tear at flesh -- nature has a magic of its very own that few can tap into. Druids channel this old magic, a power granted through demonstrations of deep respect and connection to the natural world. They can request the help of plants and creatures to the benefit of their allies or the detriment of their enemies. Druids know well that every rose has its thorn, and thus their unfortunate foes will learn this truth as well.'
    )
    // first circle
    .AddSpell(Spell.ThornStrike())
    .AddSpell(Spell.EntanglingVines())
    .AddSpell(Spell.AspectOfSpider())
    // second circle
    .AddSpell(Spell.SprayOfThorns())
    .AddSpell(Spell.Rejuvenate())
    .AddSpell(Spell.WhippingVines())
    .AddSpell(Spell.TreeSkin())
    .AddSpell(Spell.BramblePatch())
    // third circle
    .AddSpell(Spell.Pacify())
    .AddSpell(Spell.SproutingAssault())
    .AddSpell(Spell.PlantWall())
    // fourth circle
    .AddSpell(Spell.Charm())
    .AddSpell(Spell.BurstingThorns());
  };

  static Geomancy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Geomancy,
      'Geomancers tap into the very substance of the planet itself, from soft loamy soil to the sharpest and strongest of stones. Their spells can dampen other magics, protect allies, or harm encroaching foes.'
    )
    // first circle
    .AddSpell(Spell.StoneDaggers())
    .AddSpell(Spell.UnevenGround())
    // second circle
    .AddSpell(Spell.NullField())
    .AddSpell(Spell.CrushingDirt())
    .AddSpell(Spell.ImbueWithStone())
    .AddSpell(Spell.Tremor())
    .AddSpell(Spell.StoneFlesh())
    // third circle
    .AddSpell(Spell.PrisonOfStone())
    .AddSpell(Spell.PebbleCloud())
    .AddSpell(Spell.WallOfStone())
    // fourth circle
    .AddSpell(Spell.MeteorStrike())
    .AddSpell(Spell.Earthquake())
    .AddSpell(Spell.Petrify())
    .AddSpell(Spell.SummonEarthElemental())
    .AddSpell(Spell.BanishElemental());
  };

  static Illusion(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Illusion,
      'Illusionists twist the minds of others, turning dreams into reality and warping others’ perception of the world around them. They are experts at misdirection, concealment, and deception, and can prepare spells ahead of battle to better misdirect the enemy.'
    )
    // first circle
    .AddSpell(Spell.DistantStrike())
    .AddSpell(Spell.Illuminate())
    .AddSpell(Spell.EnchantingMark())
    .AddSpell(Spell.Blind())
    // second circle
    .AddSpell(Spell.Phase())
    .AddSpell(Spell.MageLight())
    .AddSpell(Spell.DistortingCloud())
    .AddSpell(Spell.Disguise())
    .AddSpell(Spell.Invisibility())
    // third circle
    .AddSpell(Spell.TransmuteBody())
    .AddSpell(Spell.MirrorImage())
    .AddSpell(Spell.SteelStorm())
    // fourth circle
    .AddSpell(Spell.GreaterMirrorImage())
    .AddSpell(Spell.ShadeAssassin())
    .AddSpell(Spell.DispelElemental());
  };

  static Necromancy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Necromancy,
      'Necromancers delve into the most forbidden of all magics: the manipulation of death itself. Anyone falling on the field against a necromancer will not stay fallen for long, as these casters will gladly make use of their flesh and bone, adding them to their army of the living dead. Through the power of rot and entropy, they weaken and conuse their enemies while bolstering themselves.'
    )
    // first circle
    .AddSpell(Spell.GhostlyTouch())
    .AddSpell(Spell.SkeletalHands())
    .AddSpell(Spell.Harm())
    .AddSpell(Spell.Darkness())
    .AddSpell(Spell.Fear())
    // second circle
    .AddSpell(Spell.VampireBite())
    .AddSpell(Spell.BloodyTears())
    .AddSpell(Spell.AnimateDead())
    .AddSpell(Spell.MomentaryMadness())
    .AddSpell(Spell.NecroticVitality())
    .AddSpell(Spell.WitheringRay())
    // third circle
    .AddSpell(Spell.Terror())
    .AddSpell(Spell.FleshToAsh())
    .AddSpell(Spell.CreateUndead())
    // fourth circle
    .AddSpell(Spell.BloodPact())
    .AddSpell(Spell.RemoveSkeleton())
    .AddSpell(Spell.DestroyLife());
  };

  static Psionic(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Psionic,
      'Psionic spellcasters use their mind to manipulate their surroundings and assault the psyche of their enemies. They can move materials with a mere thought and invade the minds of their foes to achieve their goals. Though the principles are similar to other mind-altering magics, these spellcasters use surgeon-like precision to manipulate the functioning of the brain itself.'
    )
    // first circle
    .AddSpell(Spell.TelepathicStrike())
    .AddSpell(Spell.Feeblemind())
    .AddSpell(Spell.TurnWeapon())
    .AddSpell(Spell.MindBlank())
    // second circle
    .AddSpell(Spell.PsychokineticHorror())
    .AddSpell(Spell.CompelPerson())
    .AddSpell(Spell.ForceArrow())
    .AddSpell(Spell.TelekineticProtection())
    // third circle
    .AddSpell(Spell.TelekineticTrap())
    .AddSpell(Spell.BubbleOfForce())
    .AddSpell(Spell.Sleep())
    // fourth circle
    .AddSpell(Spell.DestroyMind());
  };

  static Pyromancy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Pyromancy,
      'Pyromancers use their magic to attack their foes with heat and flame. Their violent offensive magic strikes terror into the heart of their enemies; almost every living being fears fire’s destructive power. Pyromancy is one of the easier schools to learn, but one of the hardest to master. For this reason, there are precious few old Pyromancers. Those who survived their training often bear vicious scars as evidence of their proficiency.'
    )
    // first circle
    .AddSpell(Spell.MoteOfFlame())
    .AddSpell(Spell.FireWhip())
    // second circle
    .AddSpell(Spell.Fireball())
    .AddSpell(Spell.Heat())
    .AddSpell(Spell.FlameShield())
    .AddSpell(Spell.ImbueWithFire())
    .AddSpell(Spell.BreathOfTheDragonKing())
    .AddSpell(Spell.FlameOfTheEvenstar())
    // third circle
    .AddSpell(Spell.Flamestrike())
    .AddSpell(Spell.ProximityBlast())
    .AddSpell(Spell.HurlCinders())
    .AddSpell(Spell.MoltenEarth())
    .AddSpell(Spell.BindingOfFlame())
    .AddSpell(Spell.WrathOfTheDaystar())
    .AddSpell(Spell.BanishElemental())
    .AddSpell(Spell.WallOfFire())
    // fourth circle
    .AddSpell(Spell.Immolation())
    .AddSpell(Spell.IncineratingFog())
    .AddSpell(Spell.CreateFireElemental());
  };

  static Thaumaturgy(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Thaumaturgy,
      'Thaumaturges take many forms, from secular scholars and doctors, to priests of the many dozen gods worshipped across the lands. Thaumaturgy is the magic of restorative miracles, focused on protecting, healing and enhancing the abilities of allies, while keeping enemies at bay. Though their offensive capabilities are not nearly as powerful as other spellcasters, these healers are nevertheless indispensable allies on the battlefield.'
    )
    // first circle
    .AddSpell(Spell.SearingPrayer())
    .AddSpell(Spell.Stabilize())
    .AddSpell(Spell.RighteousStrike())
    .AddSpell(Spell.Protection())
    // second circle
    .AddSpell(Spell.CausePain())
    .AddSpell(Spell.WordsOfHealing())
    .AddSpell(Spell.ProtectFromHarm())
    .AddSpell(Spell.Aid())
    .AddSpell(Spell.Bless())
    // third circle
    .AddSpell(Spell.DivineInspiration())
    .AddSpell(Spell.LightWave())
    .AddSpell(Spell.SacredHome())
    .AddSpell(Spell.SmitingBlast())
    .AddSpell(Spell.RadiantForce())
    // fourth circle
    .AddSpell(Spell.Resurrect())
    .AddSpell(Spell.ArmorOfTheGods());
  };

  static Wild(): SpellSchool {
    return new SpellSchool(
      SpellSchools.Wild,
      'Wild magic is the magic of hedge witches, shamans, and those selftaught in ways unseen in traditional magical scholarship. This power manifests in a variety of forms, channeling the deepest and oldest magic, of growth and of instinct, of predators and prey. While both Wild and Druidic magic work with the powers of nature, Druidic magic must be earned. Wild magic is a gift, or a curse, depending on who you ask. Those who can harness this gift can make powerful allies, while others lose themselves to nature, becoming like beasts, as wild as the magic infusing their spirit.'
    )
    // first circle
    .AddSpell(Spell.AcidicAssault())
    .AddSpell(Spell.Hex())
    // second circle
    .AddSpell(Spell.TentacleField())
    .AddSpell(Spell.NoxiousSpray())
    .AddSpell(Spell.Anathema())
    .AddSpell(Spell.Levitate())
    .AddSpell(Spell.CausticArrow())
    // third circle
    .AddSpell(Spell.MistyJaunt())
    .AddSpell(Spell.Web())
    .AddSpell(Spell.AcidOrb())
    .AddSpell(Spell.SpectralWarp())
    // fourth circle
    .AddSpell(Spell.Disintegrate())
    .AddSpell(Spell.Curse());
  }
}

