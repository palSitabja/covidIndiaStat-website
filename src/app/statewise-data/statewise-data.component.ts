import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { CovidApiStatesService } from '../covid-api-states.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  grid: ApexGrid;
};
@Component({
  selector: 'app-statewise-data',
  templateUrl: './statewise-data.component.html',
  styleUrls: ['./statewise-data.component.css']
})
export class StatewiseDataComponent implements OnInit {
  // @Input()
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  stateValue: string;
  statewise: any[];
  statewiseconfirmed: any[] = []
  statewisedeaths: any[] = []
  state: any[] = []
  stateCodes: any
  stateNames:string[]=[]
  stateCodesData:any={
    "AN":"Andaman Nicobar",
    "AP":"Andhra Pradesh",
    "AR":"Arunachal Pradesh",
    "AS":"Assam",
    "BR":"Bihar",
    "CH":"Chandigarh",
    "CT":"Chhattisgarh",
    "DN":"Dadra Daman Diu",
    "DL":"Delhi",
    "GA":"Goa",
    "GJ":"Gujarat",
    "HR":"Haryana",
    "HP":"Himachal Pradesh",
    "JK":"Jammu Kashmir",
    "JH":"Jharkhand",
    "KA":"Karnataka",
    "KL":"Kerala",
    "LA":"Ladakh",
    "LD":"Lakshadweep",
    "MP":"Madhya Pradesh",
    "MH":"Maharashtra",
    "MN":"Manipur",
    "ML":"Meghalaya",
    "MZ":"Mizoram",
    "NL":"Nagaland",
    "OR":"Odisha",
    "PY":"Puducherry",
    "PB":"Punjab",
    "RJ":"Rajasthan",
    "SK":"Sikkim",
    "TN":"Tamil Nadu",
    "TG":"Telangana",
    "TR":"Tripura",
    "UP":"Uttar Pradesh",
    "UT":"Uttarakhand",
    "WB":"West Bengal"
};

  stateData: any;
  data: any=null;
  dailyconfirmed: any[] = [[], []];
  dailydeceased: any[] = [[], []];
  dailyrecovered: any[] = [[], []];
  error: string;

  active: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  delConfirmed: string;
  delDeaths: string;
  delRecovered: string;
  lastUpdate: any
  color1: ["#DA3442", "#2196F3"];
  upArrow = "&#8593"
  constructor(private stateService: CovidApiStatesService) {
    this.chartOptions = {
      series: [
        {
          name: "Active",
          data: this.statewiseconfirmed
        },
        {
          name: "Deaths",
          data: this.statewisedeaths
        },
      ],
      title: {
        text: "State Wise Cases",
        align: "center",
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#26A544'
        },
      },
      chart: {
        type: "bar",
        height: 1600,
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        //colors: ["#fff"]
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: this.stateNames,
        labels: {
          show: false
        }
      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toString();
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }

  ngOnInit(): void {
    this.stateService.getStatesData().subscribe(
      (data) => {
        this.data = data
        this.dataPreprocess()        
      },
      (error) => this.error = error
    )
    
  }

  dataPreprocess() {
    this.stateCodes=Object.keys(this.stateCodesData)
    for (const key in this.stateCodesData) {
      this.stateNames.push(this.stateCodesData[key])
    }

    this.stateCodes.forEach(st=>{
      //console.log(st);
      
      var stData=this.data[st]
      //console.log(stData);
      
      var currDate=Object.keys(stData.dates)[Object.keys(stData.dates).length-1]
      //console.log(stData.dates[currDate].delta);
      if(stData.dates[currDate].delta.confirmed==undefined)
        this.statewiseconfirmed.push(0)
      else
        this.statewiseconfirmed.push(stData.dates[currDate].delta.confirmed)

      if(stData.dates[currDate].delta.deceased==undefined)
        this.statewisedeaths.push(0)
      else
        this.statewisedeaths.push(stData.dates[currDate].delta.deceased)
    })
  }

  getStateData($event){
    this.dailyconfirmed=[[],[]]
    this.dailyrecovered=[[],[]]
    this.dailydeceased=[[],[]]
    console.log(this.stateValue);
    for (const key in this.stateCodesData) {
      if(this.stateCodesData[key]===this.stateValue){
        var stCode=key
        break
      }
    }
    this.statewise=this.data[stCode]
        for (var iterator in this.statewise['dates']) {
          if('delta' in this.statewise['dates'][iterator]){
            var currentDateTotal=this.statewise['dates'][iterator]['delta']
            if ("confirmed" in currentDateTotal) {
              if(currentDateTotal.confirmed>=0){
                this.dailyconfirmed[0].push(iterator)
                this.dailyconfirmed[1].push(currentDateTotal.confirmed)
              }
            }else{
              this.dailyconfirmed[0].push(iterator)
              this.dailyconfirmed[1].push(0)
            }

            if ("recovered" in currentDateTotal) {
              if(currentDateTotal.recovered>=0){
                this.dailyrecovered[0].push(iterator)
                this.dailyrecovered[1].push(currentDateTotal.recovered)
              }
            }else{
              this.dailyrecovered[0].push(iterator)
              this.dailyrecovered[1].push(0)
            }

            if ("deceased" in currentDateTotal) {
              if(currentDateTotal.deceased>0){
                this.dailydeceased[0].push(iterator)
                this.dailydeceased[1].push(currentDateTotal.deceased)
              }
            }else{
              this.dailydeceased[0].push(iterator)
              this.dailydeceased[1].push(0)
            }
          }         
        }
        var delta=this.statewise['dates'][iterator]['delta']
        this.lastUpdate = iterator
        //this.active = this.statewise[index].active
        this.delConfirmed = delta['confirmed']
        this.delDeaths = delta['deceased']
        this.delRecovered = delta['recovered']
        var total=this.statewise['dates'][iterator]['total']
        this.confirmed=total['confirmed']
        this.deaths=total['deceased']
        this.recovered=total['recovered']
        this.active='No Data'
  }
}
