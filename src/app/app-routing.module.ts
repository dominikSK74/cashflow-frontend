import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {HomeComponent} from "./home/home.component";
import {TokenGuard} from "./guards/token.guard";
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "register", component: RegisterComponent, canActivate: [LoginGuard]},
  {path: "login/identify", component: ForgotPasswordComponent, canActivate: [LoginGuard]},
  {path: "home", component: HomeComponent, canActivate: [TokenGuard, AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
