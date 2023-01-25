import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  addExpenses(array:any){
    return this.http.post(`${environment.link}/api/expenses/add`, array);
  }
}
