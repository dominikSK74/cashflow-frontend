import { Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {MonthEnum} from "../enums/month-enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  month: string = "";

  constructor() { }

  ngOnInit(): void {
    this.setCurrentMonth();
    this.renderChart();
  }

  renderChart(){
    const chart = new Chart("chart", {
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
        responsive: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Example Doughnut Chart'
          }
        }
      }
    });
  }

  getCurrentMonth(){
    const date = new Date();
    return date.getMonth();
  }

  setCurrentMonth(){
    const monthIndex = this.getCurrentMonth();
    this.month = MonthEnum[monthIndex];
  }
}
