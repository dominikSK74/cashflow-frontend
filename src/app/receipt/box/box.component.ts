import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BoxService} from "../../services/box.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CategorySelectComponent} from "../category-select/category-select.component";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit, OnDestroy {
  box: any = {};

  constructor(private boxService:BoxService,
              private dialog:MatDialog) {}

  ngOnInit() {
    this.boxService.addBox(this.box);
  }

  ngOnDestroy() {
    this.boxService.removeBox(this.box);
  }

  @Output() delete = new EventEmitter<number>();
  deleteBox() {
    this.delete.emit(this.boxService.getIndex(this.box));
  }

  selectCategoryDialog(){
    const dialogRef = this.dialog.open(CategorySelectComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.box.categories = result;
    });
  }
}
