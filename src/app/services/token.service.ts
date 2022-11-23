import { Injectable } from '@angular/core';
import {RoleEnum} from "../enums/role-enum";
import jwtDecode from "jwt-decode";

interface Token {

  sub: string;
  role: RoleEnum[];
  exp: number;
  iat: number;

}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDecodedToken(): Token {
    //@ts-ignore
    return jwtDecode(this.getToken());
  }
}
