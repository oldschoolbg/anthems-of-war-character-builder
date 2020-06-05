import { MOV, PHY, DEX, CON, MND, CharacterStat } from "./character-stats";
import { Trait, Regular, Instinct } from "../defs/trait";

export class Character {
  MOV: MOV = new MOV();
  PHY: PHY = new PHY();
  DEX: DEX = new DEX();
  CON: CON = new CON();
  MND: MND = new MND();

  Traits: Trait[] = [
    Instinct
  ];

  PointsCost() {
    return this.MOV.PointsCost +
           this.PHY.PointsCost +
           this.DEX.PointsCost +
           this.CON.PointsCost +
           this.MND.PointsCost;
  }
  
  AddTrait(trait: Trait) {
    if (trait.Key === 'Instinct') {
      if (this.Traits.find(t => t.Key === 'Regular')) {
        this.Traits = this.Traits.filter(t => t.Key !== 'Regular');
      }
    }
    if (trait.Key === 'Regular') {
      if (this.Traits.find(t => t.Key === 'Instinct')) {
        this.Traits = this.Traits.filter(t => t.Key !== 'Instinct');
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
    this.Traits = this.Traits.filter(t => t.Key !== trait.Key);
    trait.RemoveEffect(this);
  }
}
