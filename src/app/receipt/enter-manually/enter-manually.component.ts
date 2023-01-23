import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BoxService} from "../../services/box.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../services/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-enter-manually',
  templateUrl: './enter-manually.component.html',
  styleUrls: ['./enter-manually.component.css']
})
export class EnterManuallyComponent implements OnInit, OnDestroy{

  // @ts-ignore
  boxes: any[];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]),
    categories: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  constructor(private boxService:BoxService,
              private snackBarService:SnackBarService,
              private route:ActivatedRoute,
              private router: Router) {
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
    const myBoxes = this.boxService.getBoxes();
    let valid = true;
    myBoxes.forEach(box=>{
      this.form.controls.name.setValue(box.name);
      this.form.controls.cost.setValue(box.cost);
      this.form.controls.categories.setValue(box.categories);
      this.form.controls.date.setValue(box.date);

      if(this.form.invalid){
        valid = false;
      }
    });

    if(valid && (this.boxes.length > 0)){
      this.snackBarService.openGreenSnackBar("Receipt added");
      this.router.navigate(['/receipt', {data: JSON.stringify(myBoxes)}]);
    }else{
      this.snackBarService.openRedSnackBar("The given data is not correct");
    }
  }

  deleteBox(index: number) {
    this.boxes.splice(index, 1);
  }
}
