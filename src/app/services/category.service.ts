import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<string>(`${environment.link}/api/category/get-all`,
      {responseType: 'text' as 'json'});
  }
}
