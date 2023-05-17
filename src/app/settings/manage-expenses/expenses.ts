export class Expenses{

  private _id : string;
  private _name: string;
  private _cost: number;
  private _categories: string;
  private _date: string;


  constructor(id: string, name: string, cost: number, categories: string, date: string) {
    this._id = id;
    this._name = name;
    this._cost = cost;
    this._categories = categories;
    this._date = date;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get cost(): number {
    return this._cost;
  }

  set cost(value: number) {
    this._cost = value;
  }

  get categories(): string {
    return this._categories;
  }

  set categories(value: string) {
    this._categories = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }
}
