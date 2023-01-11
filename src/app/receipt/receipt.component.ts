import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {

  constructor(private router:Router) { }

  enterManually(){
    this.router.navigate(["/receipt/enter-manually"]);
  }
}
