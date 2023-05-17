import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {Expenses} from "./expenses";
import {ManageExpensesService} from "../../services/manage-expenses.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-expenses',
  templateUrl: './manage-expenses.component.html',
  styleUrls: ['./manage-expenses.component.css']
})
export class ManageExpensesComponent implements OnInit{
  darkMode : boolean = false;
  expenses : Expenses[] | undefined;

  constructor(private settingsService : SettingsService,
              private manageExpensesService : ManageExpensesService,
              private snackbarService : SnackBarService,
              private translate : TranslateService,
              private router : Router) {

  }

  ngOnInit() {
    if (this.settingsService.getTheme() === 'dark') {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
    this.manageExpensesService.getExpenses().subscribe(result =>{
      this.expenses = result;
    });
  }

  delete(expenseId : string){
      this.manageExpensesService.deleteExpense(expenseId).subscribe(() =>{
        this.snackbarService.openGreenSnackBar(this.translate.instant('SNACKBAR_DELETE_EXPENSE'));
        this.expenses = [];
        this.manageExpensesService.getExpenses().subscribe(result =>{
          this.expenses = result;
        });
      });
  }

  editProduct(expenseId : string){
    this.router.navigate(["/settings/manage-expenses/edit", expenseId]);
  }
}
