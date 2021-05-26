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
  statewiseactive: any[] = []
  statewiseconfirmed: any[] = []
  statewisedeaths: any[] = []
  statewiselastupdatedtime: any[] = []
  statewiserecovered: any[] = []
  state: any[] = []
  stateCode: string


  stateData: any;
  data: any;
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
  lastUpdate: Time
  color1: ["#DA3442", "#2196F3"];
  upArrow = "&#8593"
  constructor(private stateService: CovidApiStatesService) {
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
    this.statewise = JSON.parse(localStorage.getItem('statewise'))
    //console.log(this.statewise);
    this.dataPreprocess()

    this.stateService.getStatesData().subscribe(
      (data) => {
        this.data = data
      },
      (error) => this.error = error
    )
  }
  dataPreprocess() {
    this.statewise.sort((a, b) => b.active - a.active)

    //console.log(this.statewise);
    this.statewise.forEach(element => {
      this.statewiseactive.push(element.active)
      this.statewiseconfirmed.push(element.confirmed)
      this.statewisedeaths.push(element.deaths)
      this.statewiselastupdatedtime.push(element.lastupdatedtime)
      this.statewiserecovered.push(element.recovered)
      if (element.state === "Jammu and Kashmir") {
        this.state.push("J&K")
      } else if (element.state === "Andaman and Nicobar Islands") {
        this.state.push("Andaman")
      } else if (element.state === "Dadra and Nagar Haveli and Daman and Diu") {
        this.state.push("Daman_Diu")
      }
      else this.state.push(element.state)
    });
  }
  getStateData($event) {
    //console.log($event);
    //console.log(this.stateValue);
    for (let index = 0; index < this.statewise.length; index++) {
      if (this.statewise[index].state === this.stateValue) {
        //console.log("matched");
        this.lastUpdate = this.statewise[index].lastupdatedtime
        this.active = this.statewise[index].active
        this.confirmed = this.statewise[index].confirmed
        this.deaths = this.statewise[index].deaths
        this.recovered = this.statewise[index].recovered
        this.stateCode = this.statewise[index].statecode

        this.dailyconfirmed = [[], []];
        this.dailydeceased = [[], []];
        this.dailyrecovered = [[], []];
        this.stateData = this.data[this.stateCode]
        //console.log(Object.keys(this.stateData.dates).pop());
        var date = Object.keys(this.stateData.dates).pop()
        //console.log(this.stateData.dates[date]);

        if ("delta" in this.stateData.dates[date]) {
          if ("confirmed" in this.stateData.dates[date].delta) {
            this.delConfirmed = this.stateData.dates[date].delta.confirmed
          } else {
            this.delConfirmed = "No Data"
          }
          if ("recovered" in this.stateData.dates[date].delta) {
            this.delRecovered = this.stateData.dates[date].delta.recovered
          } else {
            this.delRecovered = "No Data"
          }
          if ("deceased" in this.stateData.dates[date].delta) {
            this.delDeaths = this.stateData.dates[date].delta.deceased
          } else {
            this.delDeaths = "No Data"
          }

        } else {
          this.delDeaths = "No Data"
          this.delRecovered = "No Data"
          this.delConfirmed = "No Data"
        }



        for (var iterator in this.stateData.dates) {

          if ("delta" in this.stateData.dates[iterator]) {
            if ("confirmed" in this.stateData.dates[iterator].delta) {
              this.dailyconfirmed[0].push(iterator)
              this.dailyconfirmed[1].push(this.stateData.dates[iterator].delta.confirmed)
            }
            if ("recovered" in this.stateData.dates[iterator].delta) {
              this.dailyrecovered[0].push(iterator)
              this.dailyrecovered[1].push(this.stateData.dates[iterator].delta.recovered)
            }
            if ("deceased" in this.stateData.dates[iterator].delta) {
              this.dailydeceased[0].push(iterator)
              this.dailydeceased[1].push(this.stateData.dates[iterator].delta.deceased)
            }
          }
        }
      }

    }
  }
}
