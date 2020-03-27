const express=require('express')
const request=require('request')
const path=require('path')
const hbs=require('hbs')
const port=3000
app=express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
const url='https://api.covid19india.org/data.json'
var data=[[[],[],[],[],[],[],[]],[[],[],[],[],[]]]
var delta=[]
//console.log(publicDirectoryPath+viewsPath+partialsPath);

request.get({url,json:true},(error,response)=>{
    if(error){
        res.status(500).send(error)
    }else{
        response.body.cases_time_series.forEach(element => {
            data[0][0].push(element.dailyconfirmed)
            data[0][1].push(element.dailydeceased)
            data[0][2].push(element.dailyrecovered)
            data[0][3].push(element.totalconfirmed)
            data[0][4].push(element.totaldeceased)
            data[0][5].push(element.totalrecovered)
            data[0][6].push(element.date)
        });
        //console.log(data[0][0][0]);
        response.body.statewise.forEach(element1=>{
            data[1][0].push(element1.active)
            data[1][1].push(element1.confirmed)
            data[1][2].push(element1.deaths)
            data[1][3].push(element1.state)
            data[1][4].push(element1.recovered)
        })
        delta.push(response.body.key_values[0].confirmeddelta)
        delta.push(response.body.key_values[0].deceaseddelta)
        delta.push(response.body.key_values[0].recovereddelta)
        data.push(delta)
        //console.log(data)
    }
})

app.get('',(req,res)=>{
    res.render('index',{})
})

app.get('/data', (req, res) => {
    res.send(data)
    //res.render('index',{})
})
app.listen(port,()=>{
    console.log("App running on port 3000");
})
