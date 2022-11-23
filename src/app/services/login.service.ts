import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  request: any = {};

  constructor(private http:HttpClient,
              private tokenService:TokenService) { }

  public loginUser(email: string, password: string) {
    this.request = {
      "email": email,
      "password": password
    };

    return this.http.post(`${environment.link}/api/user/login`, this.request, {responseType: 'text' as 'json'})
      .pipe(tap(data => {
        this.tokenService.setToken(data.toLocaleString());
      }));
  }
}
