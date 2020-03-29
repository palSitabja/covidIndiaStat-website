const url='/data'
fetch(url).then((response)=>{
    response.json().then((data)=>{
        //console.log(data[0])
        const chart1=document.getElementById('line1')
        chart1.height=300;
        let lineChart1=new Chart(chart1,{
            type:'line',
            data:{
                labels:data[0][6],
                datasets:[{
                    label:'Daily Confirmed',
                    backgroundColor:'#FDF3BB',
                    borderColor:'#BA5200',
                    data:data[0][0],
                    fill:true
                },
                {
                    label:'Total Confirmed',
                    backgroundColor:'#fc9272',
                    borderColor:'#fc9272',
                    data:data[0][3],
                    fill:false
                }]
            },
            options:{
                scales:{
                    xAxes:[{
                        gridLines:{
                            drawOnChartArea:false
                        }
                    }],
                    yAxes:[{
                        gridLines:{
                            drawOnChartArea:false
                        }
                    }],
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
					display: true,
					text: 'Confirmed Cases'
                },
                tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
                },
            }    
        })
        const chart2=document.getElementById('line2')
        //chart2.height=400;
        let lineChart2=new Chart(chart2,{
            type:'line',
            data:{
                labels:data[0][6],
                datasets:[{
                    label:'Daily Deceased',
                    backgroundColor:'#FDBBCA',
                    borderColor:'#E81E51',
                    data:data[0][1],
                    fill:true
                },
                {
                    label:'Total Deceased',
                    backgroundColor:'#FB9EA3',
                    borderColor:'#FB9EA3',
                    data:data[0][4],
                    fill:false
                }]
            },
            options:{
                scales:{
                    xAxes:[{
                        gridLines:{
                            drawOnChartArea:false
                        }
                    }],
                    yAxes:[{
                        gridLines:{
                            drawOnChartArea:false
                        }
                    }],
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
					display: true,
					text: 'Deceased'
                },
                tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
                },
            }    
        })


        const chart3=document.getElementById('line3')
        //chart3.height=400;
        let lineChart3=new Chart(chart3,{
            type:'line',
            data:{
                labels:data[0][6],
                datasets:[{
                    label:'Daily Recovered',
                    backgroundColor:'#BBFDC7',
                    borderColor:'#31a354',
                    data:data[0][2],
                    fill:true
                },
                {
                    label:'Total Recovered',
                    backgroundColor:'#addd8e',
                    borderColor:'#addd8e',
                    data:data[0][5],
                    fill:false
                }]
            },
            options:{
                scales:{
                    xAxes:[{
                        gridLines:{
                            drawOnChartArea:false
                        }
                    }],
                    yAxes:[{
                        gridLines:{
                            drawOnChartArea:false
                        }
                    }],
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
					display: true,
					text: 'Recovery'
                },
                tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
                },
            }    
        })


        const bar1=document.getElementById('bar1')
        //chart3.height=800;
        let barchart1=new Chart(bar1,{
            type:'bar',
            data:{
                labels:data[1][3],
                datasets:[{
                    label:'Active',
                    backgroundColor:'#2b8cbe',
                    borderColor:'#2b8cbe',
                    data:data[1][0],
                    fill:true
                },
                {
                    label:'confirmed',
                    backgroundColor:'#a6bddb',
                    borderColor:'#a6bddb',
                    data:data[1][1],
                    fill:true
                },
                {
                    label:'deaths',
                    backgroundColor:'#E81E44',
                    borderColor:'#E81E44',
                    data:data[1][2],
                    fill:true
                }]
            },
            options:{
                responsive: true,
                maintainAspectRatio: false,
                title: {
					display: true,
					text: 'State Wise'
                },
                tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
                },
                scales: {
                    xAxes: [{
                        gridLines:{
                            drawOnChartArea:false
                        },
                        stacked: true,
                    }],
                    yAxes: [{
                        gridLines:{
                            drawOnChartArea:false
                        },
                        stacked: true
                    }]
                }
            }    
        })
        //console.log(parseInt(data[2][1]))
        //console.log(parseInt(data[1][1][0]))
        document.getElementById("conf").innerHTML=parseInt(data[1][1][0])//+parseInt(data[2][0])+
        document.getElementById("recover").innerHTML=parseInt(data[1][4][0])//+parseInt(data[2][2])
        document.getElementById("dec").innerHTML=parseInt(data[1][2][0])//+parseInt(data[2][1])
    })
})