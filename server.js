var express = require("express");
var axios = require("axios");
var app = express();

app.get('/', function(req, res){
    axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyBu2AyIh8IlY3AhTHHhWLBYVgfsiRkr3KQ&q=cat&searchType=image&cx=010064230611557154673:oe8ajuocquc')
        .then(function(response){
            var imageResultsRaw = response.data.items;
            var imageResults = [];
            for(var i = 0; i < imageResultsRaw.length; i++) {
                var obj = {
                    'url': imageResultsRaw[i].link,
                    'snippet': imageResultsRaw[i].snippet,
                    'thumbnail': imageResultsRaw[i].image.thumbnailLink,
                    'context': imageResultsRaw[i].image.contextLink,
                }
                imageResults.push(obj);
            }
            res.json(imageResults);
        })
        .catch(function(error){
            console.log(error);
        });
});

app.listen(process.env.PORT||8080);