import { Move, Physicality, Dexterity, Constitution, Mind, Trait } from '../defs';
import { Mount } from './mount';
import { Moveable, Keyed } from '../interfaces';
import { MiscellaneousEquipment } from './miscellaneous_equipment';

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
  private _equipment: MiscellaneousEquipment[] = [];
  get Equipment(): MiscellaneousEquipment[] { return this._equipment; }

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

  AddEquipment(equipment: MiscellaneousEquipment) : Character {
    if (equipment.Prerequisites.some((wp) => !this._traits.find((p: Keyed) => p.Key === wp.Key))) {
      throw new Error(
        `Cannot add ${equipment.Key} as Character must have ${equipment.Prerequisites.map(
          (p) => p.Key,
        ).join(', ')}.`,
      );
    }
    this._equipment.push(equipment);
    return this;
  }
  RemoveEquipment(equipment: MiscellaneousEquipment) : Character {
    const index = this._equipment.findIndex((e: Keyed) => equipment.Key === e.Key);
    this._equipment.splice(index, 1);
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
