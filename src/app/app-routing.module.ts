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
import {SettingsComponent} from "./settings/settings.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {EnterManuallyComponent} from "./receipt/enter-manually/enter-manually.component";
import {EditProductComponent} from "./receipt/edit-product/edit-product.component";
import {ManageExpensesComponent} from "./settings/manage-expenses/manage-expenses.component";
import {ManageExpenseEditComponent} from "./settings/manage-expenses/manage-expense-edit/manage-expense-edit.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "register", component: RegisterComponent, canActivate: [LoginGuard]},
  {path: "login/identify", component: ForgotPasswordComponent, canActivate: [LoginGuard]},
  {path: "home", component: HomeComponent, canActivate: [TokenGuard, AuthGuard]},
  {path: "settings", component: SettingsComponent, canActivate: [TokenGuard, AuthGuard]},
  {path: "receipt", component: ReceiptComponent, canActivate: [TokenGuard, AuthGuard]},
  {path: "receipt/enter-manually", component: EnterManuallyComponent, canActivate: [TokenGuard, AuthGuard]},
  {path: "receipt/edit-product/:index", component: EditProductComponent, canActivate: [TokenGuard, AuthGuard]},
  {path: "settings/manage-expenses", component: ManageExpensesComponent, canActivate: [TokenGuard, AuthGuard]},
  {path: "settings/manage-expenses/edit/:id", component: ManageExpenseEditComponent, canActivate: [TokenGuard, AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
