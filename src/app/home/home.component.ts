import { Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(){
    const chart = new Chart("chart", {
      type: 'doughnut',
      data: {
        labels: ['Przykład 1', 'Przykład 2', 'Przykład 3'],
        datasets: [{
          label: 'Doughnut chart example',
          data: [10, 20, 30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
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
}
