import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
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
  ApexFill
} from "ng-apexcharts";
import { CovidApiService } from '../covid-api.service';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Output()
  // customevent: EventEmitter<any[]> = new EventEmitter<any[]>();

  @ViewChild("chart") chart: ChartComponent;
  public chartDailyConfirm: any;
  public chartDailyDeath:any;
  title = 'covidIndiaStat-website';
  data:any=null;
  errorMsg:string="";
  dailyconfirmed:any[]=[];
  dailydeceased:any[]=[];
  dailyrecovered:any[]=[];
  date:any[]=[];
  total_confirmed:number=0
  total_deaths:number=0
  total_active:number=0
  total_recovered:number=0
  color1=["#3E50B3","#26A544"]
  color2=["#DA3442"]
  constructor(private dataService:CovidApiService){
    this.chartDailyConfirm = {
      series: [
        {
          type:"area",
          name: "Daily Confirmed",
          data: this.dailyconfirmed
        },
        {
          type:"line",
          name: "Daily Recovery",
          data: this.dailyrecovered
        }
      ],
      title: {
        text: "Daily Recovery & Daily Confirmed",
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#3E50B3'
        },
      },
      chart: {
        height: 270,
        type: "area",
        toolbar: {
          show: false,
        }
      },
      grid:{
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
        categories:this.date
      },
      yaxis: {//to make yaxis visible comment this part 'yaxis{}'
        labels: {
            show: false,
        },
    },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

    this.chartDailyDeath = {
      series: [
        {
          name: "Daily Deceased",
          data: this.dailydeceased
        }
      ],
      title: {
        text: "Daily Deceased",
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color: '#DA3442'
        },
      },
      chart: {
        height: 270,
        type: "area",
        toolbar: {
          show: false,
        }
      },
      grid:{
        show: false,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories:this.date
      },
      yaxis: {//to make yaxis visible comment this part 'yaxis{}'
        labels: {
            show: false,
        },
    },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }
  fetchData(){
    this.dataService.getData().subscribe(
      data=>{
        this.data=data
        console.log(this.data);
        this.data.cases_time_series.forEach(element => {
          //console.log(element);
          this.dailyconfirmed.push(element.dailyconfirmed)
          this.dailyrecovered.push(element.dailyrecovered)
          this.dailydeceased.push(element.dailydeceased)
          this.date.push(element.date)
          //console.log(this.dailyconfirmed);
        });
        localStorage.setItem('statewise',JSON.stringify(this.data.statewise))        
        this.total_active=this.data.statewise[0].active
        this.total_confirmed=this.data.statewise[0].confirmed
        this.total_deaths=this.data.statewise[0].deaths
        this.total_recovered=this.data.statewise[0].recovered
      },
      error=>this.errorMsg=error,
    )
  }

  ngOnInit(): void {
    this.fetchData();
  }

}
