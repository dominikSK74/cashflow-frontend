import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {TokenGuard} from "./guards/token.guard";
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";
import { BottomNavBarComponent } from './nav-bars/bottom-nav-bar/bottom-nav-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { TopNavBarComponent } from './nav-bars/top-nav-bar/top-nav-bar.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    BottomNavBarComponent,
    SettingsComponent,
    ReceiptComponent,
    TopNavBarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterLink,
        RouterLinkActive,
        RouterLink,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
  providers: [TokenGuard, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
