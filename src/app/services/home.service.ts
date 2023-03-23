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

  getExpensesByYear(year : number){
    return this.http.get<ExpensesResponse>(`${environment.link}/api/expenses/get-data-year?year=${year}`);
  }

  getExpensesByDay(day: number, monthIndex: number, year: number){
    return this.http.get<ExpensesResponse>(`${environment.link}/api/expenses/get-data-day?day=${day}&month=${monthIndex}&year=${year}`);
  }
}
