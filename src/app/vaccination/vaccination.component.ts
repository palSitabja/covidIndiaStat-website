import { Component, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexTheme,
  ApexFill,
} from "ng-apexcharts";
export type chartDailyConfirm = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  grid:ApexGrid;
  theme:ApexTheme
  fill:ApexFill;
  yaxis:ApexYAxis
};
@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {
  dose1:any
  dose2:any
  dose1Percent:string
  dose2Percent:string
  totalPopulation:number=1366400000
  public chartDose1:any;
  public chartDose2:any;
  constructor() { }

  ngOnInit(): void {
    this.dose1=JSON.parse(localStorage.getItem('dose1'))
    this.dose2=JSON.parse(localStorage.getItem('dose2'))
    this.dose1Percent=Math.round((JSON.parse(localStorage.getItem('totalDose1'))/this.totalPopulation)*100).toString()+"%"
    this.dose2Percent=Math.round((JSON.parse(localStorage.getItem('totalDose2'))/this.totalPopulation)*100).toString()+"%"
    this.chartDose1 = {
      series: [
        {
          type: "bar",
          name: "Dose 1 Vaccinated",
          data: this.dose1[1]
        },
      ],
      title: {
        text: "Dose 1 Vaccinated",
        align: "center",
        offsetY: 10,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#3E50B3'
        },
      },
      chart: {
        height: '180px',
        type: "bar",
        toolbar: {
          show: false,
        }
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 4
      },
      xaxis: {
        type: "datetime",
        categories: this.dose1[0]
      },
      yaxis: {//to make yaxis visible comment this part 'yaxis{}'
        labels: {
          show: false,
        },
      },
    };


    this.chartDose2 = {
      series: [
        {
          type: "bar",
          name: "Dose 2 Vaccinated",
          data: this.dose2[1]
        },
      ],
      title: {
        text: "Dose 2 Vaccinated",
        align: "center",
        offsetY: 10,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#3E50B3'
        },
      },
      chart: {
        height: '180px',
        type: "bar",
        toolbar: {
          show: false,
        }
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 4
      },
      xaxis: {
        type: "datetime",
        categories: this.dose2[0]
      },
      yaxis: {//to make yaxis visible comment this part 'yaxis{}'
        labels: {
          show: false,
        },
      },
    };
  }

}
