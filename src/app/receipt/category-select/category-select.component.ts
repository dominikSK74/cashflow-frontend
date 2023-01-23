import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPrivateCategoryComponent} from "../add-private-category/add-private-category.component";

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit{
  items = [];
  selectedItem: any;

  constructor(private categoryService:CategoryService,
              private dialog:MatDialog) {
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
