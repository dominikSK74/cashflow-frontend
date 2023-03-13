import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ExpensesResponse} from "../home/expensesResponse";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getExpensesByMonth(monthIndex : number, year: number){
    return this.http.get<ExpensesResponse>(`${environment.link}/api/expenses/get-data?month=${monthIndex}&year=${year}`);
  }
}
