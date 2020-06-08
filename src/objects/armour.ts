export class Armour  {
  constructor(key: string, description: string, pointsCost: number) {
    this._key = key;
    this._description = description;
    this._pointsCost = pointsCost;
  }

  private _key: string;
  get Key(): string { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }
  private _pointsCost: number;
  get PointsCost(): number { return this._pointsCost; }

  static LightArmour() : Armour {
    return new Armour('Light Armour', '+2 to armor checks', 3);
  }
  static MediumArmour() : Armour {
    return new Armour('Medium Armour', '+4 to armor checks -1 to checks involving dex (including armor checks)', 5);
  }
  static HeavyArmour() : Armour {
    return new Armour('Heavy Armour', '+7 to armor checks -2 to checks involving dex (including armor checks)', 8);
  }
  static Shield() : Armour {
    return new Armour('Shield', '+1 to armor checks when held. Can not use 2-Handed weapons', 2);
  }
}
