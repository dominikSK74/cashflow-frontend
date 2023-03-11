import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getExpensesByMonth(monthIndex : number){
    console.log("pobiore teraz dane z tego miesiaca:");
    console.log(monthIndex);

    //TODO: WZIAC POD UWAGE JESZCZE ROK
    //      INDEX MIEISACA ZAPISAC W OGOLNEJ ZMIENNEJ BO PO TEJ ZMIENNEJ BEDA SIE STRZALKI PRZEMIESZCZAC
  }
}
