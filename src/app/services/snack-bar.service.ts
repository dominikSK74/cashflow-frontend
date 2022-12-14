import { Injectable } from '@angular/core';
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { }

  openRedSnackBar(message:String){
    // @ts-ignore
    this.snackBar.open(message, "", {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: "end",
      verticalPosition: "top"
    })
  }

  openGreenSnackBar(message:String){
    //@ts-ignore
    this.snackBar.open(message, "", {
      duration: 5000,
      panelClass: ['green-snackbar'],
      horizontalPosition: "end",
      verticalPosition: "top"
    })
  }
}
