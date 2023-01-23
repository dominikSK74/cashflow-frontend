import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  public myArray = [];
  option:string = "enter manually";

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('data')) {
        this.option = "edit data";
        let test = JSON.parse(<string>params.get('data'));
        for(let i = 0; i<test.length; i++){
          // @ts-ignore
          this.myArray.push(test[i]);
        }
        this.myArray.forEach( element => {
          const date = element["date"];
          //@ts-ignore
          element["date"] = date.toString().substring(0,10);
        })
      } else {
        this.myArray = [];
      }
    });
  }

  enterManually(){
    this.router.navigate(["receipt/enter-manually"]);
  }
}
