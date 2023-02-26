import {Component, OnInit} from '@angular/core';
import {UploadImageResponse} from "../uploadImageResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorySelectComponent} from "../category-select/category-select.component";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  uploadImageResponse: UploadImageResponse[] | undefined;
  product: UploadImageResponse = new UploadImageResponse("", 0, "", "");
  productForm: FormGroup = new FormGroup({});
  index: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const index = params.get('index');
      // @ts-ignore
      this.index = index;
      this.uploadImageResponse = history.state.data;

      // @ts-ignore
      this.product = { ...this.uploadImageResponse?.[index] };

      if(!this.product || !this.uploadImageResponse){
        this.router.navigate(["/receipt"]);
      }else{
        this.productForm = new FormGroup({
          name: new FormControl(this.product?.name, [Validators.required]),
          cost: new FormControl(this.product?.cost, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]),
          categories: new FormControl(this.product?.categories, [Validators.required]),
          date: new FormControl(this.product?.date, [Validators.required])
        });
      }
    });
  }

  selectCategoryDialog(){
    const dialogRef = this.dialog.open(CategorySelectComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.product.categories = result;
    });
  }

  confirm() {
    this.productForm.setValue(this.product);
    if(!this.productForm.invalid){
      const index = parseInt(this.index);
      if (this.uploadImageResponse) {

        if(this.product.date !== this.uploadImageResponse[index].date){
          let date = this.product.date;
          let newDate = new Date(date);
          newDate.setDate(newDate.getDate() + 1);
          let newDateString = newDate.toISOString();
          this.product.date = newDateString;
        }
        this.uploadImageResponse[index] = this.product;
      }
      this.fixDate();
      this.router.navigate(['/receipt', {data: JSON.stringify(this.uploadImageResponse)}]);
    }else{
      this.snackBarService.openRedSnackBar("The given data is not correct");
    }
  }

  cancel(){
    this.fixDate();
    this.router.navigate(['/receipt', {data: JSON.stringify(this.uploadImageResponse)}]);
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
}
