import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../services/settings.service";
import {CategorySelectComponent} from "../../../receipt/category-select/category-select.component";
import {MatDialog} from "@angular/material/dialog";
import {Expenses} from "../expenses";
import {ActivatedRoute, Router} from "@angular/router";
import {ManageExpensesService} from "../../../services/manage-expenses.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-expense-edit',
  templateUrl: './manage-expense-edit.component.html',
  styleUrls: ['./manage-expense-edit.component.css']
})
export class ManageExpenseEditComponent implements  OnInit{
  darkMode : boolean = false;

  id : string | null = "";
  product : Expenses = new Expenses("", "", 0, "", "");

  productForm: FormGroup = new FormGroup({});

  constructor(private settingsService : SettingsService,
              private dialog : MatDialog,
              private route : ActivatedRoute,
              private manageExpensesService : ManageExpensesService,
              private router : Router) {
  }

  ngOnInit(): void {

    if (this.settingsService.getTheme() === 'dark') {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;
    });

    if (this.id != null) {
      this.manageExpensesService.getExpense(this.id).subscribe(result =>{
        this.product = result;

        let date = new Date(this.product.date);
        date.setDate(date.getDate()-1);
        this.product.date = date.toISOString();

        this.productForm = new FormGroup({
          id : new FormControl(this.product.id, [Validators.required]),
          name: new FormControl(this.product?.name, [Validators.required]),
          cost: new FormControl(this.product?.cost, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]),
          categories: new FormControl(this.product?.categories, [Validators.required]),
          date: new FormControl(this.product?.date, [Validators.required])
        });
      });
    }
  }

  selectCategoryDialog(){
    const dialogRef = this.dialog.open(CategorySelectComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.product.categories = result;
    });
  }

  confirm() {
    this.productForm.setValue(this.product);
    if (!this.productForm.invalid) {
      this.manageExpensesService.editExpense(this.product).subscribe();
      setTimeout(()=>{
        this.router.navigate(['/settings/manage-expenses']);
      }, 60)
    }
  }

  back(){
    this.router.navigate(["/settings/manage-expenses"]);
  }
}
