import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Expenses} from "../settings/manage-expenses/expenses";

@Injectable({
  providedIn: 'root'
})
export class ManageExpensesService {


  constructor(private http : HttpClient) { }

  getExpenses(){
    return this.http.get<Expenses[]>(`${environment.link}/api/expenses/get-all-user-expenses`);
  }

  deleteExpense(expenseId : string){
    return this.http.delete(`${environment.link}/api/expenses/delete-expense/${expenseId}`);
  }

  getExpense(expenseId : string){
    return this.http.get<Expenses> (`${environment.link}/api/expenses/get-expense-by-id?expenseId=${expenseId}`)
  }

  editExpense(expense : Expenses){
    return this.http.put(`${environment.link}/api/expenses/edit-expense`, expense);
  }
}
