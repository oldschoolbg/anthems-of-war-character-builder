import { Keyed } from "../interfaces";
import { Trait } from "../defs";

export class MiscellaneousEquipment implements Keyed {
  constructor(key: string, description: string, pointsCost: number) {
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }
  private _key: string;
  get Key(): string { return this._key }
  private _description: string;
  get Description(): string  { return this._description}
  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }
  private _prerequisites: Keyed[] = []
  // weapon must have all these properties or you cannot add this property
  get Prerequisites(): Keyed[] { return this._prerequisites; }

  setPrerequisite(prop: Keyed): MiscellaneousEquipment {
    if (!this._prerequisites.find((p: Keyed) => p.Key === prop.Key)) {
      this._prerequisites.push(prop);
    }
    return this;
  }
  removePrerequisite(prop: Keyed): MiscellaneousEquipment {
    this._prerequisites = this._prerequisites.filter((p: Keyed) => p.Key !== prop.Key);
    return this;
  }

  static SpellcastingImplement() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Spellcasting Implement',
      'Spellcasters who have this item may add +1 to a single die roll in an order spent casting spells. You may choose to apply this bonus after you roll any spellcasting dice.',
      2
    )
    .setPrerequisite(Trait.Spellcaster())
  }
  static Torch() : MiscellaneousEquipment {
    return  new MiscellaneousEquipment(
      'Torch / Lantern',
      'This item illuminates a 3 inch area around the character holding this light source in one of their hands. This can also be left on the battlefield, illuminating the location it was left in. Battlefield effects like night, fog, and fog of war that reduce line of sight are ignored while targeting characters in this area.',
      1
    )
  }
  static Familiar() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Familiar',
      'This character can attempt to draw line of sight to enemies within 6 inches of their rear 180 degree arc for the purpose of determining reactions',
      3
    )
  }
  static Spellbook() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Spellbook / Scrolls',
      'A spellcaster can choose one extra spell for each instance of this item taken',
      2
    )
    .setPrerequisite(Trait.Spellcaster())
  }
  static HornBellsDrums() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Horn / Bells / Drums',
      'Use by reducing the character’s MOV value by half or as a reaction the character can use this item to allow all allies within 12 inches to turn towards the target.',
      2
    )
  }
  static PortableBarricade() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Portable Barricade',
      "This character can place a 1 inch long temporary barricade as a long action.This barricade counts as a low wall when determining line of sight and cover. It can be attacked and destroyed and is considered to have a CON of 2 and an armor value of 2",
      4
    )
  }
  static MedicalSupplies() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Medical Supplies', 
      "A character with medical supplies can use a standard action while in contact with a dying ally to stabilize them. If they do not have a skill that allows them to heal allies like the medic skill roll a d20. On a 10 or lower they do more harm than they do good and the injured character dies.",
      2
    )
  }
  static LaddersRopes() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Ladders / Ropes',
      "As a long action a character can place a ladder or secure a rope to an area that would normally be difficult to climb. Add an extra required action for every inch the rope or ladder will span above 2 inches. When put in place characters can climb the area with a ladder or rope as if it was normal terrain instead of difficult or impassable terrain. Discuss with your opponent which areas can be scaled with ladders and ropes before the game begins.",
      3
    )
  }
  static Trinkets() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      'Trinket',
      "Trinkets can be any size or shape. They have no special properties on their own but can be imbued with magic or the morale boosting special property for additional points cost. Trinkets can be passed to an ally in base contact or picked off a corpse, friend or foe, using a standard action. Trinkets are sometimes used as scenario objectives. Some scenarios may list additional rules for specific trinkets that may be used.",
      1
    )
  }
}