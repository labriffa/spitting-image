var express = require("express");
var axios = require("axios");
var app = express();

app.get('/api/imagesearch/:query', function(req, res){
    
    var query = req.params.query,
        endpoint = 'https://www.googleapis.com/customsearch/v1?',
        key = 'AIzaSyBu2AyIh8IlY3AhTHHhWLBYVgfsiRkr3KQ',
        cx = '010064230611557154673:oe8ajuocquc',
        searchType = 'image';
    
    if(!isNaN(req.query.offset)) {
        var offset = req.query.offset;    
    }
    
    var url = endpoint + 'key=' + key + '&q=' + query + '&searchType=' + searchType + '&cx=' + cx + ( offset ? '&start=' + offset : '' );
    
    axios.get(url)
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