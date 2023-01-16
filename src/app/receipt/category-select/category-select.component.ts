import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit{
  items = [];

  constructor(private categoryService:CategoryService) {
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
}
