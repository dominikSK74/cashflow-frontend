import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReceiptService} from "../services/receipt.service";
import {SnackBarService} from "../services/snack-bar.service";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  public myArray = [];
  uploadedImage: File | undefined;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private receiptService:ReceiptService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('data')) {
        let test = JSON.parse(<string>params.get('data'));
        for(let i = 0; i<test.length; i++){
          // @ts-ignore
          this.myArray.push(test[i]);
        }
        this.myArray.forEach( element => {
          let date = element["date"];
          let newDate = new Date(date);
          newDate.setDate(newDate.getDate() + 1);
          let newDateString = newDate.toISOString();
          //@ts-ignore
          element["date"] = newDateString.toString().substring(0,10);
        })
      } else {
        this.myArray = [];
      }
    });
  }

  enterManually(){
    this.router.navigate(["receipt/enter-manually"]);
  }

  confirm(){
    if(this.myArray.length > 0){
      this.receiptService.addExpenses(this.myArray).subscribe(()=>{
        this.snackBarService.openGreenSnackBar("Your receipt has been added");
        this.router.navigate(["/home"]);
      });
    }else{
      this.snackBarService.openRedSnackBar("Your receipt is empty!");
    }
  }

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
    if (this.uploadedImage) {
      this.receiptService.uploadImage(this.uploadedImage);
    }
  }
}
