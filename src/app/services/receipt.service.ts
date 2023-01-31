import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  addExpenses(array:any){
    return this.http.post(`${environment.link}/api/expenses/add`, array);
  }

  uploadImage(uploadedImage:File){
    const imageFormData = new FormData();
    imageFormData.append('image', uploadedImage, uploadedImage.name);

    this.http.post(`${environment.link}/api/expenses/upload-image`, imageFormData, { observe: 'response'})
      .subscribe((response) =>{
        if(response.status === 200){
          console.log("status 200");
        }else{
          console.log("error");
        }
      });
  }
}
