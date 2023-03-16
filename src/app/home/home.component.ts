import { Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {MonthEnum} from "../enums/month-enum";
import {HomeService} from "../services/home.service";
import {ExpensesResponse} from "./expensesResponse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  month: string = "";
  monthIndex: number = 0;

  year: number = 0;

  titleText : string = "";

  chart: Chart | undefined;

  expensesResponse : ExpensesResponse | undefined;

  constructor(private homeService : HomeService) { }

  ngOnInit(): void {
    this.setCurrentDate();
    this.setTitleText();
    this.getChartData();
  }

  renderChart(){
    // @ts-ignore
    this.chart = new Chart("chart", {
      type: 'doughnut',
      data: {
        labels: this.expensesResponse?.categories,
        datasets: [{
          label: 'Cost: ',
          data: this.expensesResponse?.prices,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 100, 32)',
            'rgb(72, 209, 204)',
            'rgb(238, 130, 238)',
            'rgb(154, 50, 205)',
            'rgb(255, 0, 255)',
            'rgb(0, 255, 0)',
            'rgb(30, 144, 255)',
            'rgb(255, 215, 0)',
            'rgb(128, 0, 128)',
            'rgb(255, 69, 0)',
            'rgb(0, 139, 139)',
            'rgb(255, 165, 0)',
            'rgb(147, 112, 219)',
            'rgb(0, 255, 255)',
            'rgb(0, 128, 128)',
            'rgb(124, 252, 0)',
            'rgb(0, 206, 209)',
            'rgb(240, 128, 128)',
            'rgb(255, 192, 203)',
            'rgb(255, 20, 147)',
            'rgb(255, 0, 0)',
            'rgb(255, 255, 0)',
            'rgb(30, 144, 255)',
            'rgb(0, 100, 0)',
            'rgb(0, 0, 255)',
            'rgb(128, 0, 0)',
            'rgb(255, 182, 193)',
            'rgb(165, 42, 42)',
            'rgb(240, 230, 140)',
            'rgb(127, 255, 212)',
            'rgb(218, 165, 32)',
            'rgb(46, 139, 87)',
            'rgb(32, 178, 170)',
            'rgb(123, 104, 238)',
            'rgb(160, 82, 45)',
            'rgb(0, 128, 128)',
            'rgb(154, 205, 50)',
            'rgb(0, 250, 154)',
            'rgb(0, 191, 255)',
            'rgb(210, 105, 30)',
            'rgb(178, 34, 34)',
            'rgb(218, 112, 214)',
            'rgb(95, 158, 160)',
            'rgb(50, 205, 50)',
            'rgb(0, 255, 127)',
            'rgb(138, 43, 226)',
            'rgb(218, 165, 32)',
            'rgb(233, 150, 122)',
            'rgb(147, 112, 219)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: this.titleText
          }
        }
      }
    });
  }

  getCurrentMonth(){
    const date = new Date();
    return date.getMonth();
  }

  getCurrentYear(){
    const date = new Date();
    return date.getFullYear();
  }

  setCurrentDate(){
    this.monthIndex = this.getCurrentMonth();
    this.month = MonthEnum[this.monthIndex];
    this.year = this.getCurrentYear();
  }

  getChartData(){
    this.homeService.getExpensesByMonth(this.monthIndex, this.year)
      .subscribe( result => {
        this.expensesResponse = result
        if(result !== null){
          this.renderChart();
          // @ts-ignore
          document.getElementById("noData").style.display = "none";
        }else{
          // @ts-ignore
          document.getElementById("noData").style.display = "block";
          //TODO: INFO O BRAKU WYNIKOW
        }
      });
  }

  setTitleText(){
    this.titleText = this.year + " " + this.month.toUpperCase();
  }

  nextMonth(){
    if(this.monthIndex === 11){
      this.monthIndex = 0;
      this.year++;
    }else{
      this.monthIndex++;
    }
    this.month = MonthEnum[this.monthIndex];
    this.setTitleText();
    this.destroyChart();
    this.getChartData();
  }

  previousMonth(){
    if(this.monthIndex === 0){
      this.monthIndex = 11;
      this.year--;
    }else{
      this.monthIndex--;
    }
    this.month = MonthEnum[this.monthIndex];
    this.setTitleText();
    this.destroyChart();
    this.getChartData();
  }

  destroyChart(){
    this.chart?.destroy();
  }
}
