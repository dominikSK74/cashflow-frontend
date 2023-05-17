import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SettingsService} from "../services/settings.service";
import {GetSettingsResponse} from "./GetSettingsResponse";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedChartType : string = "";
  selectedChartTimeRange : string = "";
  selectedLanguage : string = "";
  selectedTheme : string = "";

  darkMode:boolean = false;

  getSettingsResponse : GetSettingsResponse | undefined;

  dark : string = "Dark";
  light : string = "Light";
  en : string = "English";
  pl : string = "Polish";
  daily : string = "Daily";
  weekly : string = "Weekly";
  monthly : string = "Monthly";
  yearly : string = "Yearly";
  pie : string = "Pie Chart";
  bar : string = "Bar Chart";
  doughnut : string = "Doughnut Chart";

  constructor(private settingsService : SettingsService,
              private tokenService : TokenService,
              private router : Router,
              private translate : TranslateService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.selectedChartType = this.settingsService.getChartType();

    // @ts-ignore
    this.selectedChartTimeRange = this.settingsService.getChartTimeRange();

    // @ts-ignore
    this.selectedLanguage = this.settingsService.getLanguage();

    // @ts-ignore
    this.selectedTheme = this.settingsService.getTheme();


    if(this.settingsService.getTheme() === 'dark'){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }

    if(this.settingsService.getLanguage() === 'pl'){
      this.dark = "Ciemny";
      this.light = "Jasny";
      this.en = "Angielski";
      this.pl = "Polski";
      this.daily = "Dzienny";
      this.weekly = "Tygodniowy";
      this.monthly = "Miesięczny";
      this.yearly = "Roczny";
      this.pie = "Wykres kołowy";
      this.bar = "Wykres słupkowy";
      this.doughnut = "Wykres typu pączek";
    }
  }

  saveData(){
    this.getSettingsResponse = new GetSettingsResponse(
      this.selectedChartType.toUpperCase(),
      this.selectedChartTimeRange.toUpperCase(),
      this.selectedLanguage.toUpperCase(),
      this.selectedTheme.toUpperCase()
    );

    this.settingsService.setSettings(this.getSettingsResponse);

    if(this.selectedLanguage === 'pl'){
      this.translate.setDefaultLang('pl');
      this.translate.use('pl');
    }else{
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }

    setTimeout(()=>{
      window.location.reload();
    }, 200)
  }

  logout(){
    this.tokenService.removeToken();
    this.router.navigate(["/login"]);
  }

  manageExpenses(){
    this.router.navigate(["/settings/manage-expenses"]);
  }
}
