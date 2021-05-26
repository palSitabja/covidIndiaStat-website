import { Time } from '@angular/common';
import { Component, OnInit,Input, ViewChild,OnChanges } from '@angular/core';

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
  selector: 'app-selected-state',
  templateUrl: './selected-state.component.html',
  styleUrls: ['./selected-state.component.css']
})
export class SelectedStateComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartDailyConfirm: any;
  public chartDailyDeath:any;
  public chartDailyRecovery:any;
  @Input() active:number;
  @Input() confirmed:number;
  @Input() deaths:number;
  @Input() recovered:number;
  @Input() delConfirmed:number;
  @Input() delDeaths:number;
  @Input() delRecovered:number;
  @Input() lastUpdate:Time;
  @Input() stateCode:string;
  error:string
  stateData:any
  @Input() dailyconfirmed:any[]
  @Input() dailydeceased:any[]
  @Input() dailyrecovered:any[]
  data:any[]=[];
  color1=["#3E50B3"]
  color2=["#26A544"]
  color3=["#DA3442"]
  constructor() { }

  ngOnInit(): void {}
   ngOnChanges():void{
    this.chartDailyConfirm = {
      series: [
        {
          type: "area",
          name: "Daily Confirmed",
          data: this.dailyconfirmed[1]
        },
      ],
      title: {
        text: "Daily Confirmed",
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
        type: "area",
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
        categories: this.dailyconfirmed[0]
      },
      yaxis: {//to make yaxis visible comment this part 'yaxis{}'
        labels: {
          show: false,
        },
      },
    };


    this.chartDailyRecovery = {
      series: [
        {
          type: "area",
          name: "Daily Recovery",
          data: this.dailyrecovered[1]
        },
      ],
      title: {
        text: "Daily Recovery",
        align: "center",
        offsetY: 10,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#26A544'
        },
      },
      xaxis: {
        type: "datetime",
        categories: this.dailyrecovered[0]
      },
    }

    this.chartDailyDeath = {
      series: [
        {
          type: "area",
          name: "Daily Deceased",
          data: this.dailydeceased[1]
        },
      ],
      title: {
        text: "Daily Deceased",
        align: "center",
        offsetY: 10,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#DA3442'
        },
      },
      xaxis: {
        type: "datetime",
        categories: this.dailydeceased[0]
      },
    }
   }

}
