import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  grid:ApexGrid;
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
  statewise:any[];
  statewiseactive:any[]=[]
  statewiseconfirmed:any[]=[]
  statewisedeaths:any[]=[]
  statewiselastupdatedtime:any[]=[]
  statewiserecovered:any[]=[]
  state:any[]=[]
  color1:["#DA3442","#2196F3"]
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Active",
          data: this.statewiseactive
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
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
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
      grid:{
        show: false,
      },
      xaxis: {
        categories: this.state,
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
          formatter: function(val) {
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
    this.statewise=JSON.parse(localStorage.getItem('statewise'))
    console.log(this.statewise);
    this.dataPreprocess()
  }
  dataPreprocess(){
    this.statewise.sort((a,b)=>b.active-a.active)

    console.log(this.statewise);
    this.statewise.forEach(element => {
      this.statewiseactive.push(element.active)
      this.statewiseconfirmed.push(element.confirmed)
      this.statewisedeaths.push(element.deaths)
      this.statewiselastupdatedtime.push(element.lastupdatedtime)
      this.statewiserecovered.push(element.recovered)
      if (element.state==="Jammu and Kashmir") {
        this.state.push("J&K")
      } else if (element.state==="Andaman and Nicobar Islands")  {
        this.state.push("Andaman")
      }else if (element.state==="Dadra and Nagar Haveli and Daman and Diu")  {
        this.state.push("Daman_Diu")
      }
      else this.state.push(element.state)
    });
  }
}
