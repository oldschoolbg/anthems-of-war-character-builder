import { Keyed } from '../interfaces';
import { Character } from '../objects';
import { Trait } from './trait';

export class Skill implements Keyed {
  constructor(key: string, description: string) {
    this._key = key;
    this._description = description;
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

  private _addEffect: (character: Character, skill: Skill, ...props: any[]) => void = (
    character: Character,
    skill: Skill,
    ...props: any[]
  ) => {
    return;
  };
  get AddEffect() {
    return this._addEffect;
  }
  private _removeEffect: (character: Character, skill: Skill, ...props: any[]) => void = (
    character: Character,
    skill: Skill,
    ...props: any[]
  ) => {
    return;
  };
  get RemoveEffect() {
    return this._removeEffect;
  }
  private _traitPrerequisites: Keyed[] = [];
  // weapon must have all these properties or you cannot add this property
  get TraitPrerequisites(): Keyed[] {
    return this._traitPrerequisites;
  }
  private _kryptonite?: Keyed;
  // weapon cannot have both self and self.Kryptonite
  get Kryptonite(): Keyed | undefined {
    return this._kryptonite;
  }

  setAddEffect(addEffect: (character: Character, skill: Skill, ...props: any[]) => void): Skill {
    this._addEffect = addEffect;
    return this;
  }
  setRemoveEffect(removeEffect: (character: Character, skill: Skill, ...props: any[]) => void): Skill {
    this._removeEffect = removeEffect;
    return this;
  }
  setPrerequisite(type: 'Skill' | 'Trait', prop: Keyed): Skill {
    if (type === 'Trait') {
      if (!this._traitPrerequisites.find((p: Keyed) => p.Key === prop.Key)) {
        this._traitPrerequisites.push(prop);
      }
    }
    return this;
  }
  removePrerequisite(type: 'Skill' | 'Trait', prop: Keyed): Skill {
    if (type === 'Trait') {
      this._traitPrerequisites = this._traitPrerequisites.filter((p: Keyed) => p.Key !== prop.Key);
    }
    return this;
  }

  static BeserkerRage(): Skill {
    return new Skill(
      'Berserker Rage',
      'Add a +1 bonus to weapon strength when alone in melee combat with more than one enemy.',
    );
  }
  static BattleThrill(): Skill {
    return new Skill('Battle Thrill', 'Add a +2 bonus to bravery checks while in melee combat.');
  }
  static MultiSchoolSpellcaster(): Skill {
    return new Skill(
      'Multi School Spellcaster',
      'This character can pick spells from two spellcasting schools instead of one.',
    ).setPrerequisite('Trait', Trait.Spellcaster());
  }
  static VersatileSpellcaster(): Skill {
    return new Skill(
      'Versatile Spellcaster',
      'The character knows two extra spells.',
    ).setPrerequisite('Trait', Trait.Spellcaster());
  }
}
