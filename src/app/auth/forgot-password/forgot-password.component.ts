import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{

  constructor(private snackBar:MatSnackBar,
              private router:Router) {}


  loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
  })

  get email(){
    return this.loginForm.get('email');
  }

  // MOVE TO SERVICE WHEN CONNECT BACKEND
  openSnackBar(message:string){
    this.snackBar.open(message, "", {
      duration: 15*1000,
      panelClass: ['green-snackbar'],
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  send(){
    this.openSnackBar("Send link");
  }

  login(){
    this.router.navigate(["/login"]);
  }
}
