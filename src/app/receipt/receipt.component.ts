import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

interface test {
  name: string;
  cost: string;
  category: string;
  date: string;
}
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  myArray = [];
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('data')) {
        this.myArray = JSON.parse(<string>params.get('data'));

        //TODO


      } else {
        this.myArray = [];
      }
    });
  }

  enterManually(){
    this.router.navigate(["receipt/enter-manually"]);
  }
}
