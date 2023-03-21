import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

//   TODO: PO STRONIE BACKENDU PRZY TWORZENIU UZTKOWNIKA STWORZYC TABELE SETTINGS Z POLAMI:
//         STRING USER_ID
//         STRING CHART_TYPE
//         STRING CHART_TIME_RANGE
//         STRING LANGUAGE
//         STRING THEME
//        WSZYSTKIE TE DANE TRZYMAC W ENUMACH
//        PRZY WŁĄCZANIU APLIKACJI POBIERAC WSZYSTKIE DANE I TRZYMAC NP W LOCALSTORAGE
//        PO KLIKNIECIU SAVE W SETTINGS AKTUALIZOWAC LOCALSTORAGE ORAZ DANE W BACKENDZIE
//        moze podział na dzien tez

}
