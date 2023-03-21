import {Component, OnInit} from '@angular/core';
import {SettingsService} from "./services/settings.service";
import {GetSettingsResponse} from "./settings/GetSettingsResponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CashFlow';

  constructor(private settingsService : SettingsService) {
  }

  windows = window.navigator.appVersion.includes("Windows");
  android = window.navigator.appVersion.includes("Android");
  iPhone = window.navigator.appVersion.includes("iPhone");
  iPad = window.navigator.appVersion.includes("iPad");
  innerWidth = window.innerWidth;

  ngOnInit() {
    this.settingsService.getSettings();
  }
}
