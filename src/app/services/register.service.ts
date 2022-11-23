import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(email:string, password:string) {
    const request={
      "email": email,
      "password": password,
    };

    return this.http.post(`${environment.link}/api/user/register`, request, {responseType: 'text' as 'json'});
  }
}
