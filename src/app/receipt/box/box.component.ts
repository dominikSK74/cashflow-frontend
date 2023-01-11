import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BoxService} from "../../services/box.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit, OnDestroy {

  box: any = {};

  constructor(private boxService:BoxService) {
  }

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
}
