import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit{

  darkMode:boolean = false;
  constructor(private router:Router,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    if(this.settingsService.getTheme() === "dark"){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }
  }


  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
