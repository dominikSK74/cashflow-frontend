import { Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {MonthEnum} from "../enums/month-enum";
import {HomeService} from "../services/home.service";
import {ExpensesResponse} from "./expensesResponse";
import {SettingsService} from "../services/settings.service";
import {SnackBarService} from "../services/snack-bar.service";
import {MonthEnumPl} from "../enums/month-enum-pl";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  colors = [
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
  ];

  chartColor: string = "#fcd535";
  chartBorderColor: string = "#181a20";

  darkMode : boolean = false;
  month: string = "";
  monthIndex: number = 0;

  year: number = 0;

  day: number = 0;

  titleText : string = "";

  chart: Chart | undefined;

  expensesResponse : ExpensesResponse | undefined;

  chartType : string = "";
  chartTimeRange : string = "";

  firstDayByWeek : number = 0;
  firstMonthByWeek : number = 0;
  firstYearByWeek: number = 0;
  lastDayByWeek : number = 0;
  lastMonthByWeek : number = 0;
  lastYearByWeek: number = 0;

  cost : string = "cost: ";


  constructor(private homeService : HomeService,
              private settingsService : SettingsService,
              private snackBarService : SnackBarService) { }

  ngOnInit(): void {

    if(this.settingsService.getTheme() === "dark"){
      this.darkMode = true;
    }else{
      this.darkMode = false;
      this.chartBorderColor = "#fef7f1";
      this.chartColor = "#41403F";
    }

    if(this.settingsService.getLanguage() === 'pl'){
      this.cost = "koszt: ";
    }else{
      this.cost = "cost: ";
    }

    // @ts-ignore
    this.chartType = this.settingsService.getChartType();
    // @ts-ignore
    this.chartTimeRange = this.settingsService.getChartTimeRange();

    if(this.chartTimeRange === "month"){
      this.setCurrentDate();
      this.setTitleTextByMonth();
      this.getChartDataByMonth();
    }else if(this.chartTimeRange === "year"){
      this.setYear();
      this.setTitleTextByYear();
      this.getChartDataByYear();
    }else if(this.chartTimeRange === "day"){
      this.setCurrentDate();
      this.setTitleTextByDay();
      this.getChartDataByDay();
    }else if(this.chartTimeRange === "week"){
      this.setDateByWeek();
      this.getChartDataByWeek();
    }else{
      this.snackBarService.openRedSnackBar("Something went wrong. Refresh the page.");
    }
  }

  setDateByWeek(){
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    const sunday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + 1);
    sunday.setDate(today.getDate() - dayOfWeek + 7);

    this.firstDayByWeek = monday.getDate();
    this.firstMonthByWeek = monday.getMonth();
    this.firstYearByWeek = monday.getFullYear();

    this.lastDayByWeek = sunday.getDate();
    this.lastMonthByWeek = sunday.getMonth();
    this.lastYearByWeek = sunday.getFullYear();

    this.setTitleTextByWeek();
  }

  setTitleTextByWeek(){
    if(this.firstMonthByWeek !== this.lastMonthByWeek){
      if(this.firstYearByWeek !== this.lastYearByWeek){
        this.titleText = this.firstDayByWeek + "/" + (this.firstMonthByWeek+1) + "/" +this.firstYearByWeek + " - "
          + this.lastDayByWeek + "/" + (this.lastMonthByWeek+1) + "/" + this.lastYearByWeek;
      }else{
        this.titleText = this.firstDayByWeek + "/" + (this.firstMonthByWeek+1 )+ " - " + this.lastDayByWeek + "/" + (this.lastMonthByWeek+1) + "/" + this.lastYearByWeek;
      }
    }else{
      this.titleText = this.firstDayByWeek + " - " + this.lastDayByWeek + "/" + (this.firstMonthByWeek+1) + "/" + this.firstYearByWeek;
    }
  }

  setTitleTextByYear(){
    this.titleText = this.year.toLocaleString();
  }

  setTitleTextByDay(){
    this.titleText = this.day + " " + this.month + " " + this.year;
  }

  setYear(){
    this.year = this.getCurrentYear();
  }

  getCurrentMonth(){
    const date = new Date();
    return date.getMonth();
  }

  getCurrentDay(){
    const date = new Date();
    return date.getDate();
  }

  getCurrentYear(){
    const date = new Date();
    return date.getFullYear();
  }

  setCurrentDate(){
    this.monthIndex = this.getCurrentMonth();
    if(this.settingsService.getLanguage() === 'pl'){
      this.month = MonthEnumPl[this.monthIndex];
    }else{
      this.month = MonthEnum[this.monthIndex];
    }
    this.year = this.getCurrentYear();
    this.day = this.getCurrentDay();
  }

  getChartDataByMonth(){
    this.homeService.getExpensesByMonth(this.monthIndex, this.year)
      .subscribe( result => {
        this.expensesResponse = result
        if(result !== null){
          if(this.chartType === "doughnut"){
            this.renderDoughnutChart();
          }else if(this.chartType === "bar"){
            this.renderBarChart();
          }else if(this.chartType === "pie"){
            this.renderPieChart();
          }else{
            this.snackBarService.openRedSnackBar("Something went wrong. Refresh the page.");
          }
          // @ts-ignore
          document.getElementById("noData").style.display = "none";
        }else{
          // @ts-ignore
          document.getElementById("noData").style.display = "block";
        }
      });
  }

  setTitleTextByMonth(){
    this.titleText = this.year + " " + this.month.toUpperCase();
  }

  nextMonth(){
    if(this.chartTimeRange === "month"){
      if(this.monthIndex === 11){
        this.monthIndex = 0;
        this.year++;
      }else{
        this.monthIndex++;
      }
      if(this.settingsService.getLanguage() === 'pl'){
        this.month = MonthEnumPl[this.monthIndex];
      }else{
        this.month = MonthEnum[this.monthIndex];
      }
      this.setTitleTextByMonth();
      this.destroyChart();
      this.getChartDataByMonth();
    }else if(this.chartTimeRange === "year"){
      this.year++;
      this.setTitleTextByYear();
      this.destroyChart();
      this.getChartDataByYear();
    } else if(this.chartTimeRange === "day"){
      const date = new Date(this.year, this.monthIndex, this.day);
      date.setDate(this.day + 1);
      this.day = date.getDate();
      this.monthIndex = date.getMonth();
      this.year = date.getFullYear();
      if(this.settingsService.getLanguage() === 'pl'){
        this.month = MonthEnumPl[this.monthIndex];
      }else{
        this.month = MonthEnum[this.monthIndex];
      }
      this.setTitleTextByDay();
      this.destroyChart();
      this.getChartDataByDay();
    }else if(this.chartTimeRange === "week"){
      const firstDate = new Date(this.firstYearByWeek, this.firstMonthByWeek, this.firstDayByWeek);
      const lastDate = new Date(this.lastYearByWeek, this.lastMonthByWeek, this.lastDayByWeek);
      firstDate.setDate(this.firstDayByWeek + 7);
      lastDate.setDate(this.lastDayByWeek + 7);

      this.firstDayByWeek = firstDate.getDate();
      this.firstMonthByWeek = firstDate.getMonth();
      this.firstYearByWeek = firstDate.getFullYear();

      this.lastDayByWeek = lastDate.getDate();
      this.lastMonthByWeek = lastDate.getMonth();
      this.lastYearByWeek = lastDate.getFullYear();

      this.setTitleTextByWeek();
      this.destroyChart();
      this.getChartDataByWeek();
    }
  }

  previousMonth(){
    if(this.chartTimeRange ==="month"){
      if(this.monthIndex === 0){
        this.monthIndex = 11;
        this.year--;
      }else{
        this.monthIndex--;
      }
      if(this.settingsService.getLanguage() === 'pl'){
        this.month = MonthEnumPl[this.monthIndex];
      }else{
        this.month = MonthEnum[this.monthIndex];
      }
      this.setTitleTextByMonth();
      this.destroyChart();
      this.getChartDataByMonth();
    }else if(this.chartTimeRange === "year"){
      this.year--;
      this.setTitleTextByYear();
      this.destroyChart();
      this.getChartDataByYear();
    }else if(this.chartTimeRange === "day"){
      const date = new Date(this.year, this.monthIndex, this.day);
      date.setDate(this.day - 1);
      this.day = date.getDate();
      this.monthIndex = date.getMonth();
      this.year = date.getFullYear();
      if(this.settingsService.getLanguage() === 'pl'){
        this.month = MonthEnumPl[this.monthIndex];
      }else{
        this.month = MonthEnum[this.monthIndex];
      }
      this.setTitleTextByDay();
      this.destroyChart();
      this.getChartDataByDay();
    }else if(this.chartTimeRange === "week"){
      const firstDate = new Date(this.firstYearByWeek, this.firstMonthByWeek, this.firstDayByWeek);
      const lastDate = new Date(this.lastYearByWeek, this.lastMonthByWeek, this.lastDayByWeek);
      firstDate.setDate(this.firstDayByWeek - 7);
      lastDate.setDate(this.lastDayByWeek - 7);

      this.firstDayByWeek = firstDate.getDate();
      this.firstMonthByWeek = firstDate.getMonth();
      this.firstYearByWeek = firstDate.getFullYear();

      this.lastDayByWeek = lastDate.getDate();
      this.lastMonthByWeek = lastDate.getMonth();
      this.lastYearByWeek = lastDate.getFullYear();

      this.setTitleTextByWeek();
      this.destroyChart();
      this.getChartDataByWeek();
    }
  }

  destroyChart(){
    this.chart?.destroy();
  }

  renderDoughnutChart(){
    // @ts-ignore
    this.chart = new Chart("chart", {
      type: 'doughnut',
      data: {
        labels: this.expensesResponse?.categories,
        datasets: [{
          label: this.cost,
          borderColor: this.chartBorderColor,
          data: this.expensesResponse?.prices,
          backgroundColor: this.colors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels:{
              color: this.chartColor
            }
          },
          title: {
            display: true,
            text: this.titleText,
            color: this.chartColor
          }
        }
      }
    });
  }

  renderBarChart(){
    // @ts-ignore
    this.chart = new Chart("chart", {
      type: 'bar',
      data: {
        labels: this.expensesResponse?.categories,
        datasets: [{
          label: this.cost,
          borderColor: this.chartBorderColor,
          data: this.expensesResponse?.prices,
          backgroundColor: this.colors,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: this.chartColor
            },
          },
          x: {
            ticks: {
              color: this.chartColor
            },
          }
        },

        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
          title: {
            display: true,
            text: this.titleText,
            color: this.chartColor
          }
        }
      }
    });
  }

  renderPieChart(){
    // @ts-ignore
    this.chart = new Chart("chart", {
      type: 'pie',
      data: {
        labels: this.expensesResponse?.categories,
        datasets: [{
          label: this.cost,
          borderColor: this.chartBorderColor,
          data: this.expensesResponse?.prices,
          backgroundColor: this.colors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: this.chartColor
            }
          },
          title: {
            display: true,
            text: this.titleText,
            color: this.chartColor
          }
        }
      }
    });
  }

  getChartDataByYear(){
    this.homeService.getExpensesByYear(this.year)
      .subscribe( result => {
        this.expensesResponse = result
        if(result !== null){
          if(this.chartType === "doughnut"){
            this.renderDoughnutChart();
          }else if(this.chartType === "bar"){
            this.renderBarChart();
          }else if(this.chartType === "pie"){
            this.renderPieChart();
          }else{
            this.snackBarService.openRedSnackBar("Something went wrong. Refresh the page.");
          }
          // @ts-ignore
          document.getElementById("noData").style.display = "none";
        }else{
          // @ts-ignore
          document.getElementById("noData").style.display = "block";
        }
      });
  }
  getChartDataByDay(){
    this.homeService.getExpensesByDay(this.day, this.monthIndex, this.year)
      .subscribe( result => {
        this.expensesResponse = result
        if(result !== null){
          if(this.chartType === "doughnut"){
            this.renderDoughnutChart();
          }else if(this.chartType === "bar"){
            this.renderBarChart();
          }else if(this.chartType === "pie"){
            this.renderPieChart();
          }else{
            this.snackBarService.openRedSnackBar("Something went wrong. Refresh the page.");
          }
          // @ts-ignore
          document.getElementById("noData").style.display = "none";
        }else{
          // @ts-ignore
          document.getElementById("noData").style.display = "block";
        }
      });
  }

  getChartDataByWeek(){
    this.homeService.getExpensesByWeek(this.firstDayByWeek, this.firstMonthByWeek, this.firstYearByWeek,
      this.lastDayByWeek, this.lastMonthByWeek, this.lastYearByWeek)
      .subscribe( result => {
        this.expensesResponse = result
        if(result !== null){
          if(this.chartType === "doughnut"){
            this.renderDoughnutChart();
          }else if(this.chartType === "bar"){
            this.renderBarChart();
          }else if(this.chartType === "pie"){
            this.renderPieChart();
          }else{
            this.snackBarService.openRedSnackBar("Something went wrong. Refresh the page.");
          }
          // @ts-ignore
          document.getElementById("noData").style.display = "none";
        }else{
          // @ts-ignore
          document.getElementById("noData").style.display = "block";
        }
      });
  }
}
