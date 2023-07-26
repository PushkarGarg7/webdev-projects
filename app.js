const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    

});

app.post("/",function(req,res){
    var city=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=284813fb6d099f1061b442c604c34a60&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const icon=weatherdata.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>"+temp+"</h1>");
            res.write(weatherdata.weather[0].description);
            res.write("<img src="+imgurl+">");
            res.send();
           
            
        });
    });

});
app.listen(3000,function(){
    console.log("server is running");
});