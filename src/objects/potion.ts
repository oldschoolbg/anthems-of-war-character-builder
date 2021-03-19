import { Keyed } from "../interfaces";

export enum Potions {
  Red = 'Red potion - Healing',
  Blue = 'Blue potion - Smoke',
  Purple = 'Purple potion - Explosive',
  Green = 'Green potion - Slippery'
}

export class Potion implements Keyed {
  constructor(key: Potions, points: number, description: string) {
    this._points = points;
    this._key = key;
    this._description = description;
  }
  private _points: number;
  get PointsCost(): number { return this._points; };
  private _key: Potions;
  get Key(): Potions { return this._key; }
  private _description: string;
  get Description(): string { return this._description; }

  static get Options(): Potion[] {
    return [
        Potion.Red(),
        Potion.Blue(),
        Potion.Purple(),
        Potion.Green()
    ];
  }

  static Red() : Potion {
    return new Potion(Potions.Red, 4, 'Regain 1 CON. If used on an unconscious with 0 CON who is not gravely injured they wake up and can return to the fight. If used on a gravely injured character they do not regain 1 CON but are no longer considered gravely injured. This potion can not be thrown (well it could, but it’s not going to do much healing while smashed on the ground)');
  }
  static Blue() : Potion {
    return new Potion(Potions.Blue, 2, 'This potion releases smoke on impact. It acts as if a B2 version of the Aquamancy Fog spell was cast where it landed');
  }
  static Purple() : Potion {
    return new Potion(Potions.Purple, 4, 'This potion contains a volatile liquid that explodes on contact with a hard surface. It creates a B1 sized explosion and all those who are within range of it must pass a 4 Strength armor check or lose 1 CON');
  }
  static Green() : Potion {
    return new Potion(Potions.Green, 2, 'This potion coats the surface it impacts with a slippery substance. It acts as if a B2 version of the Aquamancy Ice Sheet spell where it landed.');
  }
}