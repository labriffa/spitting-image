var express = require("express"),
    axios = require("axios"),
    hasher = require("./modules/hash-generator"),
    app = express(),
    cookieParser = require("cookie-parser");

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(require("stylus").middleware(__dirname + '/stylus'));
app.use('/css', express.static(__dirname + '/css'));
app.use(cookieParser());

// API Image Search with Query and Possible Offset
app.get('/api/imagesearch/:query', function(req, res){
    
    var query = req.params.query,
        endpoint = 'https://www.googleapis.com/customsearch/v1?',
        key = 'AIzaSyBu2AyIh8IlY3AhTHHhWLBYVgfsiRkr3KQ',
        cx = '010064230611557154673:oe8ajuocquc',
        searchType = 'image';
    
    // check if our offset is actually a number
    if(!isNaN(req.query.offset)) {
        var offset = req.query.offset;    
    }
    
    var url = endpoint + 'key=' + key + '&q=' + query + '&searchType=' + searchType + '&cx=' + cx + ( offset ? '&start=' + offset : '' );
    
    // set the random cookie name for search history results
    res.cookie('spitting-image-'+hasher.generate(), JSON.stringify({ 'term': query, 'when': new Date() }));
    
    // make the request to the Google Custom Search API
    axios.get(url)
        .then(function(response){
            var imageResultsRaw = response.data.items;
            
            if(!imageResultsRaw) {
                res.send({'error': 'no search results were returned'});
            }
            
            // gather the search results
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
            res.json({'error': error.code})
        });
});

// API Image Search Home
app.get('/api/imagesearch/', function(req, res){
    res.json({'error': 'Please provide a search query'}); 
});

// API Image Search Latest Searches
app.get('/api/latest/imagesearch/', function(req, res){
    
    // get the cookie key names that apply to our application
    var historyKeys = JSON.stringify(req.cookies).match(/"spitting-image.+?"/g);
    var historyObj =  [];
    
    for(var i = 0; i < historyKeys.length; i++) {
        var key = req.cookies[historyKeys[i].replace(/"/g,'')];
        if(key) {
            historyObj.push(
                {
                    'term': JSON.parse(key).term,
                    'when': JSON.parse(key).when,
                }
            );
        }
    }
    res.json(historyObj.reverse());
});

// Homepage
app.get('/', function(req, res){
    res.render('index');
});

app.get('/*', function(req, res){
    res.json({'error': 'requested page not found'});
});

app.listen(process.env.PORT||8080);