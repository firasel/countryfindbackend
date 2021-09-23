const express = require('express');
const app=express();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1d1324fef2124ed187895300a5127710');
const port = process.env.PORT||3000;
const cors=require('cors');
const { response } = require('express');
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Api is Working');
})


app.get('/news/:id',(req,res)=>{
  const countryId = req.params.id
  console.log(countryId);
  newsapi.v2.topHeadlines({
    country: countryId
  }).then(response => {
    console.log(response.length);
    res.send(response);
  }).catch(err=>{
    res.send('Request Not accepted');
  })
})

  app.listen(port,()=> console.log("started"))