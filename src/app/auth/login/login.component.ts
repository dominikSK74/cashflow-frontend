import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {SettingsService} from "../../services/settings.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  darkMode : boolean = false;

  constructor(private router:Router,
              private loginService:LoginService,
              private snackBarService:SnackBarService,
              private settingsService: SettingsService,
              private translate : TranslateService) {
  }

  ngOnInit(): void {
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
    password:new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  loginUser(){
    this.loginService.loginUser(String(this.email?.value).toLowerCase(), String(this.password?.value))
      .subscribe(() => {
          this.router.navigate(["/home"]);
          this.settingsService.getSettings();
          setTimeout(()=>{
            window.location.reload();
          }, 60)
        },
        () => {
          if(this.loginForm.valid){
            this.snackBarService.openRedSnackBar(this.translate.instant('INCORRECT_DATA'));
          }else{
            this.snackBarService.openRedSnackBar(this.translate.instant('INVALID_DATA'));
          }
        });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  register(){
    this.router.navigate(["/register"]);
  }

  remindPassword(){
    this.router.navigate(["/login/identify"]);
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
