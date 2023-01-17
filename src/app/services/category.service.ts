import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SnackBarService} from "./snack-bar.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = [];
  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<string>(`${environment.link}/api/category/get-all`,
      {responseType: 'text' as 'json'});
  }

  checkCategory(name:string){
    if(name === undefined || name === ""){
      return false;
    }

    this.getCategories().subscribe((data)=>{
      let elements = JSON.parse(data);
      for(let i = 0; i < elements.length; i++){
        //@ts-ignore
        this.categories.push(elements[i]);
      }
    });

    for (let i = 0; i < this.categories.length; i++){
      // @ts-ignore
      if(this.categories[i].toLowerCase() === name.toLowerCase()){
        return false;
      }
    }
    return true;
  }

  addPrivateCategory(name:string) {
    const request = {
      "name": name
    };
    return this.http.post(`${environment.link}/api/category/add-private-category`, request);
  }
}
