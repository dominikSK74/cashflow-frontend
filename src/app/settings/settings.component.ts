import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../services/settings.service";
import {GetSettingsResponse} from "./GetSettingsResponse";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectedChartType : string = "";
  selectedChartTimeRange : string = "";
  selectedLanguage : string = "";
  selectedTheme : string = "";

  getSettingsResponse : GetSettingsResponse | undefined;

  constructor(private settingsService : SettingsService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.selectedChartType = this.settingsService.getChartType();

    // @ts-ignore
    this.selectedChartTimeRange = this.settingsService.getChartTimeRange();

    // @ts-ignore
    this.selectedLanguage = this.settingsService.getLanguage();

    // @ts-ignore
    this.selectedTheme = this.settingsService.getTheme();
  }

  saveData(){
    this.getSettingsResponse = new GetSettingsResponse(
      this.selectedChartType.toUpperCase(),
      this.selectedChartTimeRange.toUpperCase(),
      this.selectedLanguage.toUpperCase(),
      this.selectedTheme.toUpperCase()
    );

    this.settingsService.setSettings(this.getSettingsResponse);
  }
}
