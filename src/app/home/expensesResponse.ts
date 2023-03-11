export class ExpensesResponse {
  private _names: string[];
  private _prices: number[];

  constructor(names: string[], prices: number[]) {
    this._names = names;
    this._prices = prices;
  }


  get names(): string[] {
    return this._names;
  }

  set names(value: string[]) {
    this._names = value;
  }

  get prices(): number[] {
    return this._prices;
  }

  set prices(value: number[]) {
    this._prices = value;
  }
}
