const express = require('express');
const app=express();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1d1324fef2124ed187895300a5127710');
const port = process.env.PORT||5000;
const cors=require('cors');
const { response } = require('express');
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Api is Working');
})


app.get('/news/:id',(req,res)=>{
  // take country code from url
  const countryId = req.params.id;
  console.log(countryId);
  // call news api for get the news data
  newsapi.v2.topHeadlines({
    country: countryId
  }).then(response => {
    if(response.totalResults === 0){
      res.status(404).json({msg:'Data not found'})
    }else{
      res.send(response);
    }
  }).catch(err=>{
    res.status(500).json({msg:'Data not found'})
  })
})

app.listen(port);