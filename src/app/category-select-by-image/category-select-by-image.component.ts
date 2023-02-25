import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-category-select-by-image',
  templateUrl: './category-select-by-image.component.html',
  styleUrls: ['./category-select-by-image.component.css']
})
export class CategorySelectByImageComponent {
  selectedItem = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }

  test(){
    // @ts-ignore
    this.selectedItem = "HEJKA NAKLEJKA";
  }
}
