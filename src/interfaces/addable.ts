import { Character } from "..";

export interface Addable {
  CanAdd(character: Character): ValidityResponse;
  ValidForAdding(character: Character): boolean;

  CanRemove(character: Character): ValidityResponse;
  ValidForRemoving(character: Character): boolean;
}

export class ValidityResponse {
  private _errorMessage?: string;
  get ErrorMessage(): string | undefined {
    return this._errorMessage;
  }
  private _preexistingIndex = -1;
  get PreexistingIndex(): number {
    return this._preexistingIndex;
  }
  private _isValid = false;
  get IsValid(): boolean {
    return this._isValid;
  }

  private constructor() {}
  public static Errored(message: string): ValidityResponse {
    const result = new ValidityResponse();
    result._errorMessage = message;
    result._isValid = false;
    return result;
  }
  public static Checked(isValid: boolean, index?: number): ValidityResponse {
    const result = new ValidityResponse();
    if (index !== undefined) {
      result._preexistingIndex = index;
    }
    result._isValid = isValid;
    return result;
  }
}