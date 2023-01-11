import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BoxService} from "../../services/box.service";

@Component({
  selector: 'app-enter-manually',
  templateUrl: './enter-manually.component.html',
  styleUrls: ['./enter-manually.component.css']
})
export class EnterManuallyComponent implements OnInit, OnDestroy{

  // @ts-ignore
  boxes: any[];
  constructor(private boxService:BoxService) {
  }
  ngOnInit() {
    this.boxes = [];
  }

  ngOnDestroy() {
    // @ts-ignore
    this.boxes = null;
  }

  addBox() {
    this.boxes.push({});
  }

  getValues(){
    console.log(this.boxService.getBoxes());
  }

  deleteBox(index: number) {
    this.boxes.splice(index, 1);
  }
}
