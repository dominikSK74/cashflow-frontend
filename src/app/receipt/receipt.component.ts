import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReceiptService} from "../services/receipt.service";
import {SnackBarService} from "../services/snack-bar.service";
import {UploadImageResponse} from "./uploadImageResponse";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CategorySelectByImageComponent} from "./category-select-by-image/category-select-by-image.component";
import {SettingsService} from "../services/settings.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  uploadedImage: File | undefined;

  uploadImageResponse: UploadImageResponse[] | undefined;

  darkMode : boolean = false;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private receiptService:ReceiptService,
              private snackBarService: SnackBarService,
              private dialog: MatDialog,
              private settingsService : SettingsService,
              private translate : TranslateService) { }

  ngOnInit() {
    if(this.settingsService.getTheme() === 'dark'){
      this.darkMode = true;
    }else{
      this.darkMode = false;
    }

    this.route.paramMap.subscribe(params =>{
      if(params.get('data')){
        this.uploadImageResponse = JSON.parse(<string>params.get('data'));

        this.uploadImageResponse?.forEach( element =>{
          let date = element.date;
          let newDate = new Date(date);
          newDate.setDate(newDate.getDate() + 1);
          let newDateString = newDate.toISOString();
          element.date = newDateString.toString().substring(0,10);
        });
      }
    });
  }

  enterManually(){
    this.router.navigate(["receipt/enter-manually"]);
  }

  confirm(){
    if(this.uploadImageResponse){
      if(this.uploadImageResponse?.length > 0){
        this.receiptService.addExpenses(this.uploadImageResponse).subscribe(()=>{
          this.snackBarService.openGreenSnackBar(this.translate.instant('SNACKBAR_RECEIPT_ADDED'));
          this.router.navigate(["/home"]);
        }, error => {
          this.snackBarService.openRedSnackBar(this.translate.instant('SNACKBAR_RECEIPT_ERR'))
        });
      }else{
        this.snackBarService.openRedSnackBar(this.translate.instant('SNACKBAR_RECEIPT_EMPTY'));
      }
    }else {
      this.snackBarService.openRedSnackBar(this.translate.instant('SNACKBAR_RECEIPT_EMPTY'));
    }
  }

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
    if (this.uploadedImage) {
      this.receiptService.uploadImage(this.uploadedImage)
        .subscribe((data: UploadImageResponse[]) =>{
          this.uploadImageResponse = data;

          this.fixDate();
          this.checkCategoriesRecursively();

        }, (error : any) => {
          this.snackBarService.openRedSnackBar("Make sure that your photo is clear and that the store" +
            " from which the receipt is issued is supported by us.");
      });
    }
  }

  public checkCategoriesRecursively(index = 0){
    if(this.uploadImageResponse){
      const currentObj = this.uploadImageResponse[index];

      if(!currentObj){
        this.router.navigate(['/receipt', {data: JSON.stringify(this.uploadImageResponse)}]);
        return;
      }

      if (currentObj.categories === null) {
        this.openDialog(currentObj.name).afterClosed().subscribe((result) => {
          if(!result){
            this.checkCategoriesRecursively(index);
          }else{
            if (this.uploadImageResponse) {
              this.uploadImageResponse[index].categories = result;
            }

            this.receiptService.setCategoryToProduct(currentObj.name, result)
              .subscribe();

            this.checkCategoriesRecursively(index + 1);
          }
        });
      } else {
        this.checkCategoriesRecursively(index + 1);
      }
    }
  }

  openDialog(name: string): MatDialogRef<CategorySelectByImageComponent> {
    return this.dialog.open(CategorySelectByImageComponent, {
      data: name
    });
  }

  fixDate(){
    this.uploadImageResponse?.forEach( element => {
      let date = element.date;
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      let newDateString = newDate.toISOString();
      //@ts-ignore
      element.date = newDateString.toString().substring(0,10);
    });
  }

  edit(index : any) {
    this.router.navigate(['receipt/edit-product', index], { state: { data: this.uploadImageResponse } });
  }
}
