import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  darkMode : boolean = false;
  constructor(private snackBar:MatSnackBar,
              private router:Router,
              private settingsService : SettingsService,
              private translate : TranslateService,
              private snackbarService : SnackBarService) {}

  ngOnInit() {
    if(this.settingsService.getTheme() === "dark"){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }

    setTimeout(()=>{
      this.checkButtons();
    }, 10)
  }

  loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
  })

  get email(){
    return this.loginForm.get('email');
  }

  send(){
    this.snackbarService.openGreenSnackBar(this.translate.instant('FORGOT_LINK'));
  }

  login(){
    this.router.navigate(["/login"]);
  }

  changeTheme(theme : string){
    this.settingsService.setTheme(theme);
    this.checkButtons();
    setTimeout(()=>{
      window.location.reload();
    }, 60)
  }

  changeLang(lang : string){
    this.settingsService.setLanguage(lang);
    this.translate.use(lang);
    this.checkButtons();
  }

  checkButtons(){
    let lang = this.settingsService.getLanguage();
    let theme = this.settingsService.getTheme();

    if(theme === 'light'){
      // @ts-ignore
      document.getElementById('dark-mode-icon').style.display = 'block';
      // @ts-ignore
      document.getElementById('light-mode-icon').style.display = 'none';
      if(lang === 'pl'){
        // @ts-ignore
        document.getElementById('en-icon').style.display = 'block';
        // @ts-ignore
        document.getElementById('en-dark-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('pl-dark-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('pl-icon').style.display = 'none';
      }else{
        // @ts-ignore
        document.getElementById('en-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('en-dark-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('pl-dark-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('pl-icon').style.display = 'block';
      }
    }else{
      // @ts-ignore
      document.getElementById('dark-mode-icon').style.display = 'none';
      // @ts-ignore
      document.getElementById('light-mode-icon').style.display = 'block';
      if(lang === 'pl'){
        // @ts-ignore
        document.getElementById('en-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('en-dark-icon').style.display = 'block';
        // @ts-ignore
        document.getElementById('pl-dark-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('pl-icon').style.display = 'none';
      }else{
        // @ts-ignore
        document.getElementById('en-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('en-dark-icon').style.display = 'none';
        // @ts-ignore
        document.getElementById('pl-dark-icon').style.display = 'block';
        // @ts-ignore
        document.getElementById('pl-icon').style.display = 'none';
      }
    }
  }
}
