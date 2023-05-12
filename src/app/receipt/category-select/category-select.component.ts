import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddPrivateCategoryComponent} from "../add-private-category/add-private-category.component";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit{
  items = [];
  selectedItem: any;
  darkMode : boolean = false;

  // @ts-ignore
  dialogRef : MatDialogRef<AddPrivateCategoryComponent>;

  constructor(private categoryService:CategoryService,
              private dialog:MatDialog,
              private settingsService : SettingsService) {
  }

  ngOnInit(): void {

    if(this.settingsService.getTheme() === 'dark'){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }

    this.categoryService.getCategories().subscribe((data)=> {
      let category = JSON.parse(data);
      for (let i = 0; i < category.length; i++){
        //@ts-ignore
        this.items.push(category[i]);
      }
    })
  }

  selectItem(item:any){
    this.selectedItem = item;
  }

  addNewCategory(){
    this.selectedItem = undefined;
    this.dialogRef = this.dialog.open(AddPrivateCategoryComponent);

    this.dialogRef.afterClosed().subscribe(()=>{
      this.items = [];
      this.categoryService.getCategories().subscribe((data)=> {
        let category = JSON.parse(data);
        for (let i = 0; i < category.length; i++){
          //@ts-ignore
          this.items.push(category[i]);
        }
      })
    });
  }
}
