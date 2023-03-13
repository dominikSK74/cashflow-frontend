export class ExpensesResponse {
  private _categories: string[];
  private _prices: number[];

  constructor(categories: string[], prices: number[]) {
    this._categories = categories;
    this._prices = prices;
  }

  get categories(): string[] {
    return this._categories;
  }

  set categories(value: string[]) {
    this._categories = value;
  }

  get prices(): number[] {
    return this._prices;
  }

  set prices(value: number[]) {
    this._prices = value;
  }
}
