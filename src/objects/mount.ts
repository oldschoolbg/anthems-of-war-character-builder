import { 
  Move,
  Trait,
  WeaponStat, 
  WeaponMatrix,
  EquipmentProperty,
  Traits,
  EquipmentProperties
} from '../defs';
import { Moveable, CanAttack, Keyed, CanHaveMagicalCharges, SpellCharge } from '../interfaces';
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
  constructor (key: Mounts, speed: number, strength: number) {
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

  static get Options(): Mount[] {
    return [
      Mount.Horse(),
      Mount.Wolf(),
      Mount.Griffin(),
      Mount.Bear(),
      Mount.Drake(),
      Mount.Dragon()
    ];
  }

  private _mov: Move;
  get MOV(): Move { return this._mov; }
  private _key: Mounts;
  get Key(): Mounts { return this._key; }
  private _speed: number;
  get Speed(): number { return this._speed; };
  private _strength: number;
  get Strength(): number { return this._strength; };
  private _spellCharges: SpellCharge[] = [];
  get SpellCharges(): SpellCharge[] {
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

  AddTrait(key: Traits) : Mount {
    if (key === Traits.Huge) {
      this._traits = this._traits.filter((t) => t.Key !== Traits.Large);
    }
    const trait = Trait.Options.find(t => t.Key === key);
    if (trait !== undefined) {
      this._traits.push(trait);
      trait.AddEffect(this);
    }
    return this;
  }

  RemoveTrait(key: Traits) : Mount {
    if (key === Traits.Huge) {
      this._traits.push(Trait.Large());
    }
    if (key === Traits.Large) {
      throw new Error('Cannot remove Large from a mount');
    }
    const index = this._traits.findIndex((e: Keyed) => key === e.Key);
    if (index !== -1) {
      this._traits[index].RemoveEffect(this);
      this._traits.splice(index, 1);
    }
    return this;
  }
  
  AddProperty(key: EquipmentProperties, ...props: any[]): Mount {
    const property = super.AddProperty(key, props) as EquipmentProperty;
    if (property !== undefined) {
      property.AddEffect(this, property, props);
    }
    return this;
  }

  RemoveProperty(key: EquipmentProperties, ...props: any[]): Mount {
    const property = super.RemoveProperty(key, props) as EquipmentProperty;
    if (property !== undefined) {
      property.RemoveEffect(this, property, props);
    }
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
    return new Mount(Mounts.Horse, 2, 4)
    .AddTrait(Traits.Large)
    .AddTrait(Traits.Fast)
    .AddTrait(Traits.Fast);
  }
  static Wolf() : Mount {
    return new Mount(Mounts.Wolf, 2, 5)
    .AddTrait(Traits.Large)
    .AddTrait(Traits.Fast);
  }
  static Griffin() : Mount {
    return new Mount(Mounts.Griffin, 2, 4)
    .AddTrait(Traits.Flying)
    .AddTrait(Traits.Large)
    .AddTrait(Traits.Fast)
  }
  static Bear() : Mount {
    return new Mount(Mounts.Bear, 1, 7)
    .AddProperty(EquipmentProperties.HighCrit);
  }

  static Drake() : Mount {
    return new Mount(Mounts.Drake, 3, 3)
    .AddTrait(Traits.Large)
    .AddTrait(Traits.Fast)
    .AddSpellCharge({
      Spell: Spell.AcidicAssault(),
      NumberOfCharges: 2
    });
  }
  static Dragon() : Mount {
    return new Mount(Mounts.Dragon, 1, 8)
    .AddTrait(Traits.Huge)
    .AddTrait(Traits.Flying)
    .AddTrait(Traits.Fast)
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
