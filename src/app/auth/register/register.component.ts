import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./custom.validators";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {SettingsService} from "../../services/settings.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  darkMode: boolean = false;

  constructor(private router:Router,
              private registerService:RegisterService,
              private snackBarService:SnackBarService,
              private settingsService : SettingsService,
              private translate : TranslateService) {
  }

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

  registerForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.minLength(8)]),
    password1:new FormControl('', [Validators.required, Validators.minLength(8)])
  },[CustomValidators.MatchValidator('password', 'password1')])

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get password1(){
    return this.registerForm.get('password1');
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('password1')?.touched
    );
  }

  login(){
    this.router.navigate(["/login"]);
  }

  register() {
    if(this.registerForm.valid){
      this.registerService.register(String(this.email?.value).toLowerCase(), String(this.password?.value))
        .subscribe(() => {
           this.router.navigate(["/login"]);
           this.snackBarService.openGreenSnackBar(this.translate.instant('CREATE_ACC'));
        },err => {
          if(err.status === 409){
            this.snackBarService.openRedSnackBar(this.translate.instant('USER_EXIST'));
          }
        });
    }else{
      this.snackBarService.openRedSnackBar(this.translate.instant('INVALID_DATA'));
    }
  }

  changeTheme(theme : string){
    this.settingsService.setTheme(theme);
    this.checkButtons();
    if(theme === 'dark'){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }
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
