import { Trait, Regular, Instinct } from '../defs/trait';
import { Move, Physicality, Dexterity, Constitution, Mind } from './character-stats';

export class Character {
  MOV: Move = new Move();
  PHY: Physicality = new Physicality();
  DEX: Dexterity = new Dexterity();
  CON: Constitution = new Constitution();
  MND: Mind = new Mind();

  Traits: Trait[] = [Instinct];

  PointsCost() {
    return this.MOV.PointsCost + this.PHY.PointsCost + this.DEX.PointsCost + this.CON.PointsCost + this.MND.PointsCost;
  }

  AddTrait(trait: Trait) {
    if (trait.Key === 'Instinct') {
      if (this.Traits.find((t) => t.Key === 'Regular')) {
        this.Traits = this.Traits.filter((t) => t.Key !== 'Regular');
      }
    }
    if (trait.Key === 'Regular') {
      if (this.Traits.find((t) => t.Key === 'Instinct')) {
        this.Traits = this.Traits.filter((t) => t.Key !== 'Instinct');
      }
    }
    this.Traits.push(trait);
    trait.AddEffect(this);
  }

  RemoveTrait(trait: Trait) {
    if (trait.Key === 'Instinct') {
      this.Traits.push(Regular);
    }
    if (trait.Key === 'Regular') {
      this.Traits.push(Instinct);
    }
    this.Traits = this.Traits.filter((t) => t.Key !== trait.Key);
    trait.RemoveEffect(this);
  }
}
