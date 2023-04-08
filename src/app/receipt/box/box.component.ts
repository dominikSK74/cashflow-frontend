import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BoxService} from "../../services/box.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CategorySelectComponent} from "../category-select/category-select.component";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit, OnDestroy {
  box: any = {};
  @Output() delete = new EventEmitter<number>();

  darkMode : boolean = false;

  boxForm = new FormGroup({
    name: new FormControl(this.box.name, [Validators.required]),
    cost: new FormControl(this.box.cost, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]),
    categories: new FormControl(this.box.categories, [Validators.required]),
    date: new FormControl(this.box.date, [Validators.required])
  });


  constructor(private boxService:BoxService,
              private dialog:MatDialog,
              private settingsService : SettingsService) {}

  ngOnInit() {
    if(this.settingsService.getTheme() === 'dark'){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }
    this.boxService.addBox(this.box);
  }

  ngOnDestroy() {
    this.boxService.removeBox(this.box);
  }

  deleteBox() {
    this.delete.emit(this.boxService.getIndex(this.box));
  }

  selectCategoryDialog(){
    const dialogRef = this.dialog.open(CategorySelectComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.box.categories = result;
    });
  }

  get name() {
    return this.box.get('name');
  }

  get cost() {
    return this.box.get('cost');
  }

  get categories() {
    return this.box.get('categories');
  }

  get date(){
    return this.box.get('date');
  }
}
