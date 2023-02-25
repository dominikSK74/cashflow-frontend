import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FormGroup} from "@angular/forms";
import {UploadImageResponse} from "../receipt/uploadImageResponse";

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

    return this.http.post<UploadImageResponse[]>(`${environment.link}/api/expenses/upload-image`, imageFormData);
  }

  setCategoryToProduct(name: string, category: string){
    const request = {
      name: name,
      category: category
    }
    return this.http.post(`${environment.link}/api/products/set-category`, request);
  }
}
