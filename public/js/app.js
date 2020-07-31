const url='/data'
fetch(url).then((response)=>{
    response.json().then((data)=>{
        var options_daily = {
            chart: {
              height: 'auto',
              type: "line",
              redrawOnParentResize: true,
              toolbar: {
                show: false
              }
            },
            colors:['#3F51B5','#61D800',],
            grid: {
                show: false,
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 4,
                  // colors:['#008FFB','#ff0000','#21891d'],
              },
            series: [
              {
                type: "line",
                name: "Daily Confirmed",
                data: data[0][0]
              },
              {
                type: "area",
                name: "Daily Recovery",
                data: data[0][2],
              },
            ],
            fill: {
              type:'solid',
              opacity: [1, 0.2],
              // colors:['#008FFB','#ff0000','#21891d'],
              // type: "gradient",
              // gradient: {
              //   shadeIntensity: 1,
              //   opacityFrom: 0.7,
              //   opacityTo: 0.9,
              //   stops: [0, 90, 100]
              // }
            },
            xaxis: {
                labels: {
                    show: false,
                },
              categories:data[0][6],
            },
            yaxis: {//to make yaxis visible comment this part 'yaxis{}'
                labels: {
                    show: false,
                },
            },
            legend: {
              position: 'top',
              offsetY: 40,
              fontSize: '14px',
              fontfamily: 'Poppins'
            },
        };
        var options_total = {
            chart: {
              height: 'auto',
              type: "line",
              redrawOnParentResize: true,
              toolbar: {
                show: false
              }
            },
            colors:['#29B6F6','#009688',],
            grid: {
                show: false,
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
                width: 4,
                    // colors:['#008FFB','#ff0000','#21891d'],
            },
            series: [
              {
                name: "Total Confirm",
                data:data[0][3],
                type: "line",
              },
              {
                name: "Total Recovery",
                data: data[0][5],
                type: "area",
              },
            //   {
            //     name: "Total Deceased",
            //     data: data[0][4],
            //   }
            ],
            fill: {
              type:'solid',
              opacity: [1, 0.2],
              // colors:['#008FFB','#ff0000','#21891d'],
              // type: "gradient",
              // gradient: {
              //   shadeIntensity: 1,
              //   opacityFrom: 0.7,
              //   opacityTo: 0.9,
              //   stops: [0, 90, 100]
              // }
            },
            xaxis: {
                labels: {
                    show: false,
                },
              categories:data[0][6],
            },
            yaxis: {//to make yaxis visible comment this part 'yaxis{}'
                labels: {
                    show: false,
                },
            },
            legend: {
              position: 'top',
              offsetY: 40,
              fontSize: '14px',
              fontfamily: 'Poppins'
            },
          };
          var options_death = {
            chart: {
              height: 'auto',
              // width:'100%',
              type: "area",
              redrawOnParentResize: true,
              toolbar: {
                show: false
              }
            },
            colors:['#F06292','#FF8A80',],
            grid: {
                show: false,
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 4,
                  // colors:['#008FFB','#ff0000','#21891d'],
              },
            series: [
              {
                name: "Total Deceased",
                data: data[0][4]
              },
            //   {
            //     name: "Daily Recovery",
            //     data: data[0][2],
            //   },
              {
                // type:'line',
                name: "Daily Deceased",
                data: data[0][1],
              }
            ],
            fill: {
              // colors:['#008FFB','#ff0000','#21891d'],
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
              }
            },
            xaxis: {
                labels: {
                    show: false,
                },
              categories:data[0][6],
            },
            yaxis: {//to make yaxis visible comment this part 'yaxis{}'
                labels: {
                    show: false,
                },
            },
            legend: {
              position: 'top',
              offsetY: 40,
              fontSize: '14px',
              fontfamily: 'Poppins'
            },
        };
          var options_stateWise = {
            series: [{
            name: 'Active',
            data:data[1][0],
          }, {
            name: 'Confirmed',
            data: data[1][1],
          }, {
            name: 'Deaths',
            data:data[1][2],
          },],
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,

            toolbar: {
                show: false
              }
        
          },
          dataLabels: {
            enabled: false
          },
          colors:['#6200EE','#E0D2FC','#F06292',],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            
            categories: data[1][3],
          },
          yaxis:{
            labels: {
              show: false,
            },
          },
          legend: {
            position: 'right',
            offsetY: 40,
            fontSize: '14px',
            fontfamily: 'Poppins'
          },
          fill: {
            opacity: 0.8
          }
          };
        var chart_daily = new ApexCharts(document.querySelector("#chart1"), options_daily);
        var chart_total = new ApexCharts(document.querySelector("#chart2"), options_total);
        var chart_stateWise = new ApexCharts(document.querySelector("#chart_ststeWise"), options_stateWise);
        var chart_death=new ApexCharts(document.querySelector("#chart_death"),options_death);
        chart_daily.render();
        chart_total.render();
        chart_stateWise.render();
        chart_death.render();
    })
})
// function toogleModal(event) {
//   var modal = document.getElementById("myModal");
//   var span = document.getElementsByClassName("close")[0];
//   modal.style.display = "block";
//   // event.preventDefault();
// }
var modal = document.getElementById("myModal");
document.getElementById("about_btn").addEventListener("click", function(event){
  
  
  modal.style.display = "block";
  event.preventDefault()
});
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}