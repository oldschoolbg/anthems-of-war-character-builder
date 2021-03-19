import { CanHaveMagicalCharges, Keyed, SpellCharge } from "../interfaces";
import { Trait, EquipmentProperty, EquipmentProperties } from "../defs";
import { CanHaveProperties } from "./shared_implementations/can_have_properties";

export enum MiscellaneousEquipments {
  SpellcastingImplement = 'Spellcasting Implement',
  TorchLantern = 'Torch / Lantern',
  Familiar = 'Familiar',
  Spellbook = 'Spellbook / Scrolls',
  Horn = 'Horn',
  Bells = 'Bells',
  Drums = 'Drums',
  PortableBarricade = 'Portable Barricade',
  MedicalSupplies = 'Medical Supplies',
  LaddersRopes = 'Ladders / Ropes',
  Trinkets = 'Trinkets'
}

export class MiscellaneousEquipment extends CanHaveProperties implements Keyed, CanHaveMagicalCharges {
  constructor(key: MiscellaneousEquipments, description: string, pointsCost: number) {
    super('MISC');
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  static get Options(): MiscellaneousEquipment[] {
    return [
      MiscellaneousEquipment.SpellcastingImplement(),
      MiscellaneousEquipment.Torch(),
      MiscellaneousEquipment.Familiar(),
      MiscellaneousEquipment.Spellbook(),
      MiscellaneousEquipment.Horn(),
      MiscellaneousEquipment.Bells(),
      MiscellaneousEquipment.Drums(),
      MiscellaneousEquipment.PortableBarricade(),
      MiscellaneousEquipment.MedicalSupplies(),
      MiscellaneousEquipment.LaddersRopes(),
      MiscellaneousEquipment.Trinkets()
    ];
  }

  private _key: MiscellaneousEquipments;
  get Key(): MiscellaneousEquipments { return this._key }
  private _description: string;
  get Description(): string  { return this._description}
  private _pointsCost: number;
  get PointsCost(): number {
    return this._pointsCost
    + this._properties.map((p: EquipmentProperty) => p.PointsCost).reduce((a, b) => a + b, 0)
    + this._spellCharges.map((sc: SpellCharge) => sc.Spell.ChargeCost * sc.NumberOfCharges).reduce((a, b) => a + b, 0);
  }
  private _prerequisites: Keyed[] = []
  // weapon must have all these properties or you cannot add this property
  get Prerequisites(): Keyed[] { return this._prerequisites; }
  private _spellCharges: SpellCharge[] = [];
  get SpellCharges(): SpellCharge[] {
    return this._spellCharges;
  }

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

  AddProperty(key: EquipmentProperties, ...props: any[]): MiscellaneousEquipment {
    super.AddProperty(key, props);
    return this;
  }

  RemoveProperty(key: EquipmentProperties, ...props: any[]): MiscellaneousEquipment {
    super.RemoveProperty(key, props);
    return this;
  }

  AddSpellCharge(spellCharge: SpellCharge): MiscellaneousEquipment {
    const found = this._spellCharges.findIndex(sp => sp.Spell.Key === spellCharge.Spell.Key);
    if (found !== -1) {
      spellCharge.NumberOfCharges += this._spellCharges[found].NumberOfCharges;
      this._spellCharges[found] = spellCharge;
    } else {
      this._spellCharges.push(spellCharge);
    }
    return this;
  }


  static SpellcastingImplement() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.SpellcastingImplement,
      'Spellcasters who have this item may add 1 to a single die roll in an order spent casting spells. You may choose to apply this bonus after you roll any spellcasting dice.',
      2
    )
    .setPrerequisite(Trait.Spellcaster())
  }
  static Torch() : MiscellaneousEquipment {
    return  new MiscellaneousEquipment(
      MiscellaneousEquipments.TorchLantern,
      'This item illuminates a three inch area around itself. This can be held one-handed by a character, and may also be left on the battlefield, illuminating the location it was left in. Battlefield effects which reduce line of sight like night, magical fog and the fog of war are ignored while targeting characters in the illuminated area. Characters may decide to extinguish this item and stow it in a pack for free during an order, or throw it as far as three inches as a standard action. When yo throw a light source in this way, roll a D20. On a 5 and under the light goes out. If this item is on the ground, characters in contact with it can pick it up or extinguish it using a standard action or by sacrificing one from their MOV during an order.',
      1
    )
  }
  static Familiar() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.Familiar,
      'This character can attempt to draw line of sight to enemies within six inches of their rear 180 degree arc for the purpose of determining reactions',
      3
    )
  }
  static Spellbook() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.Spellbook,
      'A spellcaster can choose one extra spell from their chosen Spell School for each instance of this item taken into battle.',
      2
    )
    .setPrerequisite(Trait.Spellcaster())
  }
  static Horn() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.Horn,
      "By reducing the character's MOV value by half, or as a reaction, this character can use this item to allow all allies within twelve inches of the holder to turn towards their chosen target. This cannot be performed on hidden characters.",
      2
    )
  }
  static Bells() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.Bells,
      "By reducing the character's MOV value by half, or as a reaction, this character can use this item to allow all allies within twelve inches of the holder to turn towards their chosen target. This cannot be performed on hidden characters.",
      2
    )
  }
  static Drums() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.Drums,
      "By reducing the character's MOV value by half, or as a reaction, this character can use this item to allow all allies within twelve inches of the holder to turn towards their chosen target. This cannot be performed on hidden characters.",
      2
    )
  }
  static PortableBarricade() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.PortableBarricade,
      "A character may use a long action to place a one inch long temporary barricade. This barricade counts as a low wall when determining line of sight and cover. It can be attacked and destroyed and is considered to have a CON of 2 and an armour value of 2.",
      4
    )
  }
  static MedicalSupplies() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.MedicalSupplies,
      "A character with medical supplies can use a standard action while in contact with a dying ally to stabilize them. If they do not have a skill that allows them to heal allies like the Medic skill roll a d20. On a 10 or lower they do more harm than they do good and the injured character dies.",
      2
    )
  }
  static LaddersRopes() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.LaddersRopes,
      "As a long action a character can place a ladder or secure a rope to an area that would normally be difficult to climb. Add an extra required action for every inch the rope or ladder will span above two inches. When put in place characters can climb the area with a ladder or rope as if it was normal terrain instead of difficult or impassable terrain. Discuss with your opponent which areas can be scaled with ladders and ropes before the game begins.",
      3
    )
  }
  static Trinkets() : MiscellaneousEquipment {
    return new MiscellaneousEquipment(
      MiscellaneousEquipments.Trinkets,
      "Trinkets can be any size or shape. They have no special properties on their own but can be imbued with magic or the morale boosting special property for additional points cost. Trinkets can be passed to an ally in base contact or picked off a corpse, friend or foe, using a standard action. They can also be picked up off the ground using a standard action or by sacrificing 1 from their MOV during an order. Trinkets are sometimes used as scenario objectives. Some scenarios may list additional rules for specific trinkets that may be used.",
      1
    )
  }
}