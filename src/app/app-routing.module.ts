import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "register", component: RegisterComponent},
  {path: "login/identify", component: ForgotPasswordComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
