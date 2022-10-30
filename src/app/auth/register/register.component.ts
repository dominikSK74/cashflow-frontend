import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./custom.validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router:Router) {
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
}
