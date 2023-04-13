import {Component, OnInit} from '@angular/core';
import {SettingsService} from "./services/settings.service";
import {GetSettingsResponse} from "./settings/GetSettingsResponse";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CashFlow';

  constructor(private settingsService : SettingsService,
              private translate : TranslateService) {
  }

  windows = window.navigator.appVersion.includes("Windows");
  android = window.navigator.appVersion.includes("Android");
  iPhone = window.navigator.appVersion.includes("iPhone");
  iPad = window.navigator.appVersion.includes("iPad");
  innerWidth = window.innerWidth;

  ngOnInit() {
    this.settingsService.getSettings();
    let language = this.settingsService.getLanguage();

    if(language === 'pl'){
      this.translate.setDefaultLang('pl');
      this.translate.use('pl');
    }else{
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }
}
