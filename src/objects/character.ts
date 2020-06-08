import { Move, Physicality, Dexterity, Constitution, Mind, Trait } from '../defs';
import { Mount } from './mount';
import { Moveable } from '../interfaces';

export class Character implements Moveable {
  MOV: Move = new Move();
  PHY: Physicality = new Physicality();
  DEX: Dexterity = new Dexterity();
  CON: Constitution = new Constitution();
  MND: Mind = new Mind();

  private _traits: Trait[] = [ Trait.Instinct() ];
  get Traits(): Trait[] { return this._traits; };
  private _mount? : Mount;
  get Mount(): Mount | undefined { return this._mount; };

  get PointsCost() : number {
    const mountCost : number = this.Mount !== undefined ? this.Mount.PointsCost : 0;
    return this.MOV.PointsCost
           + this.PHY.PointsCost
           + this.DEX.PointsCost
           + this.CON.PointsCost
           + this.MND.PointsCost
           + this.Traits.map((t: Trait) => t.PointsCost).reduce((a, b) => a + b, 0)
           + mountCost;
  }

  AddTrait(trait: Trait) : Character {
    if (trait.Key === 'Instinct') {
      if (this._traits.find((t) => t.Key === 'Regular')) {
        this._traits = this._traits.filter((t) => t.Key !== 'Regular');
      }
    }
    if (trait.Key === 'Regular') {
      if (this._traits.find((t) => t.Key === 'Instinct')) {
        this._traits = this._traits.filter((t) => t.Key !== 'Instinct');
      }
    }
    this._traits.push(trait);
    trait.AddEffect(this);
    return this;
  }

  RemoveTrait(trait: Trait) : Character {
    if (trait.Key === 'Instinct') {
      this._traits.push(Trait.Regular());
    }
    if (trait.Key === 'Regular') {
      this._traits.push(Trait.Instinct());
    }
    this._traits = this._traits.filter((t) => t.Key !== trait.Key);
    trait.RemoveEffect(this);
    return this;
  }

  AddMount(mount: Mount) : Character {
    this._mount = mount;
    return this;
  }
  RemoveMount() : Character {
    this._mount = undefined;
    return this;
  }
}
