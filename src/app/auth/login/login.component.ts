import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private router:Router,
              private loginService:LoginService,
              private snackBarService:SnackBarService,
              private settingsService: SettingsService) {
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
            this.snackBarService.openRedSnackBar("Incorrect password or email")
          }else{
            this.snackBarService.openRedSnackBar("Invalid data");
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

  test(){
    console.log("test");
  }
}
