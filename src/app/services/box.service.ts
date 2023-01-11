import { Injectable } from '@angular/core';
import {EnterManuallyComponent} from "../receipt/enter-manually/enter-manually.component";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  boxes: any[] = [];

  addBox(box: any) {
    this.boxes.push(box);
  }

  removeBox(box: any) {
    const index = this.boxes.indexOf(box);
    console.log(index);
    if (index > -1) {
      this.boxes.splice(index, 1);
    }
  }

  getBoxes() {
    return this.boxes;
  }

  getIndex(box:any){
    return this.boxes.indexOf(box);
  }
}
