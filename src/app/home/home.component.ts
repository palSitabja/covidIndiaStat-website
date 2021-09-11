import { ViewChild } from '@angular/core';
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
import { CovidApiStatesService } from '../covid-api-states.service';
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
  today_confirmed=0;
  today_active=0;
  today_recovered=0;
  today_deaths=0;
  today_date
  date:any[]=[];

  dailyconfirmed: any[] = [[], []];
  dailydeceased: any[] = [[], []];
  dailyrecovered: any[] = [[], []];
  vaccineD1: any[] = [[], []];
  vaccineD2: any[] = [[], []];
  dailyTest: any[] = [[], []];

  total_confirmed:number=0
  total_deaths:number=0
  total_active:number=0
  total_recovered:number=0
  vaccinationData:any
  color1=["#3E50B3","#26A544"]
  color2=["#DA3442"]
  constructor(private dataService:CovidApiStatesService){
    this.chartDailyConfirm = {
      series: [
        {
          type:"area",
          name: "Daily Confirmed",
          data: this.dailyconfirmed[1]
        },
        {
          type:"area",
          name: "Daily Recovery",
          data: this.dailyrecovered[1]
        }
      ],
      title: {
        text: "Daily Recovery & Daily Confirmed",
        align: "center",
        offsetY: 10,
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
        categories:this.dailyconfirmed[0]
      },
      yaxis: {//to make yaxis visible comment this part 'yaxis{}'
        labels: {
            show: false,
        },
    },
    };

    this.chartDailyDeath = {
      series: [
        {
          name: "Daily Deceased",
          data: this.dailydeceased[1]
        }
      ],
      title: {
        text: "Daily Deceased",
        align: "center",
        offsetY: 10,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color: '#DA3442'
        },
      },
    };
  }
  fetchData(){
    this.dataService.getStatesData().subscribe(
      data=>{
        //localStorage.clear()
        //localStorage.setItem('data',JSON.stringify(data.TT))
        this.data=data.TT
        //console.log(this.data);
        
        for (var iterator in this.data.dates) {
          //console.log(iterator);
          var currentDateTotal=this.data.dates[iterator].delta
          if ("confirmed" in currentDateTotal) {
            this.dailyconfirmed[0].push(iterator)
            this.dailyconfirmed[1].push(currentDateTotal.confirmed)
          }else{
            this.dailyconfirmed[0].push(iterator)
            this.dailyconfirmed[1].push(0)
          }

          if ("recovered" in currentDateTotal) {
            this.dailyrecovered[0].push(iterator)
            this.dailyrecovered[1].push(currentDateTotal.recovered)
          }else{
            this.dailyrecovered[0].push(iterator)
            this.dailyrecovered[1].push(0)
          }

          if ("deceased" in currentDateTotal) {
            this.dailydeceased[0].push(iterator)
            this.dailydeceased[1].push(currentDateTotal.deceased)
          }else{
            this.dailydeceased[0].push(iterator)
            this.dailydeceased[1].push(0)
          }

          if ("tested" in currentDateTotal) {
            this.dailyTest[0].push(iterator)
            this.dailyTest[1].push(currentDateTotal.tested)
          }else{
            this.dailyTest[0].push(iterator)
            this.dailyTest[1].push(0)
          }

          if ("vaccinated1" in currentDateTotal) {
            this.vaccineD1[0].push(iterator)
            this.vaccineD1[1].push(currentDateTotal.vaccinated1)
          }else{
            this.dailyTest[0].push(iterator)
            this.dailyTest[1].push(0)
          }

          if ("vaccinated2" in currentDateTotal) {
            this.vaccineD2[0].push(iterator)
            this.vaccineD2[1].push(currentDateTotal.vaccinated2)
          }else{
            this.dailyTest[0].push(iterator)
            this.dailyTest[1].push(0)
          }          
        }
        this.total_confirmed=this.data.dates[iterator].total.confirmed
        this.today_confirmed=this.dailyconfirmed[1][this.dailyconfirmed[1].length-1]

        this.total_active=this.data.dates[iterator].total.confirmed
        this.today_active=this.chartDailyConfirm[this.dailyconfirmed.length-1]

        this.total_recovered=this.data.dates[iterator].total.recovered
        this.today_recovered=this.dailyrecovered[1][this.dailyrecovered[1].length-1]

        this.total_deaths=this.data.dates[iterator].total.deceased
        this.today_deaths=this.dailydeceased[1][this.dailydeceased[1].length-1]

        this.today_date=this.dailyconfirmed[0][this.dailyconfirmed[0].length-1]
                
        // this.vaccinationData=this.data.tested[this.data.tested.length-1]
        // localStorage.setItem('tested',JSON.stringify(this.vaccinationData))
        // //console.log(this.vaccinationData);
        // this.data.cases_time_series.forEach(element => {
        //   //console.log(element);
        //   this.dailyconfirmed.push(element.dailyconfirmed)
        //   this.dailyrecovered.push(element.dailyrecovered)
        //   this.dailydeceased.push(element.dailydeceased)
        //   this.date.push(element.date)
        //   //console.log(this.dailyconfirmed);
        // });
        
        
        // this.total_active=this.data.statewise[0].active
        // this.total_confirmed=this.data.statewise[0].confirmed
        // this.total_deaths=this.data.statewise[0].deaths
        // this.total_recovered=this.data.statewise[0].recovered
      },
      error=>this.errorMsg=error,
    )
  }
  monthToshort(month:string){
    const mon=month.split(' ')
    const map = new Map()
    map.set('January','Jan')
    map.set('February','Feb')
    map.set('March','Mar')
    map.set('April','Apr')
    map.set('May','May')
    map.set('June','Jun')
    map.set('July','Jul')
    map.set('August','Aug')
    map.set('September','Sep')
    map.set('October','Oct')
    map.set('November','Nov')
    map.set('December','Dec')
    //console.log();
    
    const result=mon[0]+' '+map.get(mon[1])+' '+mon[2]
    return result
  }
  ngOnInit(): void {
    this.fetchData();
  }

}
