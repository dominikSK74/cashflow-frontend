import { Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-add-private-category',
  templateUrl: './add-private-category.component.html',
  styleUrls: ['./add-private-category.component.css']
})
export class AddPrivateCategoryComponent {
  name:any;

  constructor(private categoryService:CategoryService,
              private snackBarService:SnackBarService) {
  }

  addCategory(){
    if(this.categoryService.checkCategory(this.name)){
      this.categoryService.addPrivateCategory(this.name).subscribe(()=>{
        this.snackBarService.openGreenSnackBar("Your category has been added");
      });
    }else{
      this.snackBarService.openRedSnackBar("ERROR: You have entered an empty field or this category already exists.");
    }
  }
}
