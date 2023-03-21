export class GetSettingsResponse{
  private _chartType : string;
  private _chartTimeRange : string;
  private _language : string;
  private _theme : string;

  constructor(chartType: string, chartTimeRange: string, language: string, theme: string) {
    this._chartType = chartType;
    this._chartTimeRange = chartTimeRange;
    this._language = language;
    this._theme = theme;
  }

  get chartType(): string {
    return this._chartType;
  }

  set chartType(value: string) {
    this._chartType = value;
  }

  get chartTimeRange(): string {
    return this._chartTimeRange;
  }

  set chartTimeRange(value: string) {
    this._chartTimeRange = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get theme(): string {
    return this._theme;
  }

  set theme(value: string) {
    this._theme = value;
  }
}
