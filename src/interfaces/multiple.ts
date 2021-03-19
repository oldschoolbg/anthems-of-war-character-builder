export interface Multiple {
  Quantity: number;
  MultipleAllowed: boolean;
  AllowMultiple(): any;
  AddOne(): any;
  RemoveOne(): any;
}