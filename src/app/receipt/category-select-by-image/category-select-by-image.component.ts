import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../services/category.service";
import {AddPrivateCategoryComponent} from "../add-private-category/add-private-category.component";

@Component({
  selector: 'app-category-select-by-image',
  templateUrl: './category-select-by-image.component.html',
  styleUrls: ['./category-select-by-image.component.css']
})
export class CategorySelectByImageComponent implements OnInit{
  selectedItem = undefined;
  items = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private categoryService: CategoryService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
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
    this.dialog.open(AddPrivateCategoryComponent);
  }
}
