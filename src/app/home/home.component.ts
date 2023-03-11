import { Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {MonthEnum} from "../enums/month-enum";
import {HomeService} from "../services/home.service";

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

  constructor(private homeService : HomeService) { }

  ngOnInit(): void {
    this.setCurrentDate();
    this.setTitleText();
    this.getChartData();

    this.renderChart();
  }

  renderChart(){
    this.chart = new Chart("chart", {
      type: 'doughnut',
      data: {
        labels: ['Przykład 1', 'Przykład 2', 'Przykład 3', 'Przykład 4', 'Przykład 5', 'Przykład 6', 'Przykład 7'],
        datasets: [{
          label: 'Cost: ',
          data: [10.51, 20, 30, 25],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 100, 32)'
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
    this.homeService.getExpensesByMonth(this.monthIndex);
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
    this.getChartData();
    this.destroyChart();
    this.renderChart();
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
    this.getChartData();
    this.destroyChart();
    this.renderChart();
  }

  destroyChart(){
    this.chart?.destroy();
  }
}
