import { 
  Move,
  Trait,
  WeaponStat, 
  WeaponMatrix,
  EquipmentProperty
} from '../defs';
import { Moveable, CanAttack, Keyed, CanHaveMagicalCharges } from '../interfaces';
import { SpellCharge } from '../interfaces/can_have_magical_charges';
import { Spell } from './magic';
import { CanHaveProperties } from './shared_implementations/can_have_properties';

export enum Mounts {
  Horse = 'Horse',
  Wolf = 'Wolf',
  Griffin = 'Griffin',
  Bear = 'Bear',
  Drake = 'Drake',
  Dragon = 'Dragon'
}

export class Mount extends CanHaveProperties implements Moveable, CanAttack, Keyed, CanHaveMagicalCharges {
  constructor (key: string, speed: number, strength: number) {
    super('MOUNT')
    this._key = key;
    this._speed = speed;
    this._strength = strength;
    this._mov = new Move();
    const statCost = WeaponMatrix.find((wm: WeaponStat) => wm.Speed === this._speed && wm.Strength === this._strength);
    if (!statCost) {
      throw new Error(
        `Invalid Mount Attack ${this.Key} - Speed and Strength provided are not a valid combination: speed: ${this.Speed}. strength: ${this.Strength}`,
      );
    }
    const statNormalisedCost = statCost.PointsCost < 0 ? 0 : statCost.PointsCost;
    this.BaseCost = statNormalisedCost + this.MOV.PointsCost + 2;
  }
  private _mov: Move;
  get MOV(): Move { return this._mov; }
  private _key: string;
  get Key(): string { return this._key; }
  private _speed: number;
  get Speed(): number { return this._speed; };
  private _strength: number;
  get Strength(): number { return this._strength; };
  private _spellCharges: Array<SpellCharge> = [];
  get SpellCharges(): Array<SpellCharge> {
    return this._spellCharges;
  }

  readonly BaseCost: number = 2;
  get PointsCost(): number {
    return this.BaseCost
    + this._traits.map((p: Trait) => p.PointsCost).reduce((a, b) => a + b, 0)
    + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0)
    + this._spellCharges.map((sc: SpellCharge) => sc.Spell.ChargeCost * sc.NumberOfCharges).reduce((a, b) => a + b, 0);
  }
  private _traits: Trait[] = [Trait.Large()];
  get Traits(): Trait[] { return this._traits; }

  AdjustSpeed(by: number) {
    this._speed += by;
  }
  AdjustStrength(by: number) {
    this._strength += by;
  }

  AddSpellCharge(spellCharge: SpellCharge): Mount {
    const found = this._spellCharges.findIndex(sp => sp.Spell.Key === spellCharge.Spell.Key);
    if (found !== -1) {
      spellCharge.NumberOfCharges += this._spellCharges[found].NumberOfCharges;
      this._spellCharges[found] = spellCharge;
    } else {
      this._spellCharges.push(spellCharge);
    }
    return this;
  }

  AddTrait(trait: Trait) : Mount {
    if (trait.Key === 'Instinct' || trait.Key === 'Regular') {
      throw new Error(`cannot add ${trait.Key} to a Mount`)
    }
    if (trait.Key === 'Huge') {
      this._traits = this._traits.filter((t) => t.Key !== 'Large');
    }
    this._traits.push(trait);
    trait.AddEffect(this);
    return this;
  }

  RemoveTrait(trait: Trait) : Mount {
    if (trait.Key === 'Huge') {
      this._traits.push(Trait.Large());
    }
    if (trait.Key === 'Large') {
      throw new Error('Cannot remove Large from a mount');
    }
    this._traits = this._traits.filter((t) => t.Key !== trait.Key);
    trait.RemoveEffect(this);
    return this;
  }
  
  AddProperty(property: EquipmentProperty, ...props: any[]): Mount {
    super.AddProperty(property, props);
    property.AddEffect(this, property, props);
    return this;
  }

  RemoveProperty(property: EquipmentProperty, ...props: any[]): Mount {
    super.RemoveProperty(property, props);
    property.RemoveEffect(this, property, props);
    return this;
  }

  static Get(mount: Mounts): Mount {
    switch (mount) {
      case Mounts.Bear:
        return Mount.Bear();
      case Mounts.Dragon:
        return Mount.Dragon();
      case Mounts.Drake:
        return Mount.Drake();
      case Mounts.Griffin:
        return Mount.Griffin();
      case Mounts.Horse:
        return Mount.Horse();
      case Mounts.Wolf:
        return Mount.Wolf();
      default:
        throw new Error(`This is an unsupported Mount: ${mount}`);
    }
  }

  static Horse() : Mount {
    return new Mount('Horse', 2, 4)
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast())
    .AddTrait(Trait.Fast());
  }
  static Wolf() : Mount {
    return new Mount('Wolf', 2, 5)
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast());
  }
  static Griffin() : Mount {
    return new Mount('Griffin', 2, 4)
    .AddTrait(Trait.Flying())
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast())
  }
  static Bear() : Mount {
    return new Mount('Bear', 1, 7)
    .AddProperty(EquipmentProperty.HighCrit());
  }
  static Drake() : Mount {
    return new Mount('Drake', 3, 3)
    .AddTrait(Trait.Large())
    .AddTrait(Trait.Fast())
    .AddSpellCharge({
      Spell: Spell.AcidicAssault(),
      NumberOfCharges: 2
    });
  }
  static Dragon() : Mount {
    return new Mount('Dragon', 1, 8)
    .AddTrait(Trait.Huge())
    .AddTrait(Trait.Flying())
    .AddTrait(Trait.Fast())
    .AddSpellCharge({
      Spell: Spell.BreathOfTheDragonKing(),
      NumberOfCharges: 1
    });
  }

  /*Cobra Chicken Hydra

MOV | PHY | DEX | CON | MND | PTS
 4     4     2     3     2    57

Traits
======
Regular (+15)
Flying (4)
Large (0)

Equipment
=========
Multi Peck (Speed 3, Strength 4) (+6)

Skills
======
Latent Spellcaster

Spells
======
Necromancy - Fear*/
}
