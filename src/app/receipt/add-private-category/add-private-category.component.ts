import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-add-private-category',
  templateUrl: './add-private-category.component.html',
  styleUrls: ['./add-private-category.component.css']
})
export class AddPrivateCategoryComponent implements OnInit{
  name:any;
  darkMode : boolean = false;

  constructor(private categoryService:CategoryService,
              private snackBarService:SnackBarService,
              private settingsService:SettingsService) {
  }

  ngOnInit(): void {
    if(this.settingsService.getTheme() === 'dark'){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }
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
