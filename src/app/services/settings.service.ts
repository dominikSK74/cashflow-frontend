import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {GetSettingsResponse} from "../settings/GetSettingsResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  getSettingsResponse : GetSettingsResponse | undefined;

  constructor(private http : HttpClient) { }

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
}
