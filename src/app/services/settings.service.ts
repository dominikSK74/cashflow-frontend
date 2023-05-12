import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {GetSettingsResponse} from "../settings/GetSettingsResponse";
import {environment} from "../../environments/environment";
import {SnackBarService} from "./snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  getSettingsResponse : GetSettingsResponse | undefined;

  constructor(private http : HttpClient, private snackBarService : SnackBarService) { }

  getSettings(){
    this.http.get<GetSettingsResponse>(`${environment.link}/api/settings/get-settings`).subscribe(result =>{
      this.getSettingsResponse = result;
      localStorage.setItem('chartType', this.getSettingsResponse.chartType.toLowerCase());
      localStorage.setItem('chartTimeRange', this.getSettingsResponse.chartTimeRange.toLowerCase());
      localStorage.setItem('language', this.getSettingsResponse.language.toLowerCase());
      localStorage.setItem('theme', this.getSettingsResponse.theme.toLowerCase());
    });
  }

  getChartType(){
    return localStorage.getItem('chartType');
  }

  getChartTimeRange(){
    return localStorage.getItem('chartTimeRange');
  }

  getLanguage(){
    return localStorage.getItem('language');
  }

  getTheme(){
    return localStorage.getItem('theme');
  }

  setChartType(chartType : string){
    localStorage.setItem('chartType', chartType);
  }

  setChartTimeRange(chartTimeRange : string){
    localStorage.setItem('chartTimeRange', chartTimeRange);
  }

  setTheme(theme : string){
    localStorage.setItem('theme', theme);
  }

  setLanguage(lang : string){
    localStorage.setItem('language', lang);
  }

  setSettings(dto : GetSettingsResponse){
    const request = {
      chartType: dto.chartType,
      chartTimeRange: dto.chartTimeRange,
      language: dto.language,
      theme: dto.theme
    }

    this.http.patch(`${environment.link}/api/settings/set-settings`, request).subscribe( res =>{
      this.getSettings();
      this.snackBarService.openGreenSnackBar("Your settings have been changed");
    }, error => {
      this.snackBarService.openRedSnackBar("Please enter correct data");
    });
  }
}
