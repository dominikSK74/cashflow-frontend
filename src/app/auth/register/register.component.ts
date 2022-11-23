import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./custom.validators";
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router:Router,
              private registerService:RegisterService,
              private snackBarService:SnackBarService) {
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
           this.snackBarService.openGreenSnackBar("Your account has been created. You can log in");
        },err => {
          if(err.status === 409){
            this.snackBarService.openRedSnackBar("This user already exists");
          }
        });
    }else{
      this.snackBarService.openRedSnackBar("Invalid Data");
    }
  }
}
