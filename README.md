# spitting-image

* Provides image URLs, alt text and page urls for a set of images relating to a given search string.
* You can paginate through the responses by adding a ?offset=2 parameter to the URL.
* You can also get a list of the most recently submitted search strings.

## Examples
### Search Query > Images

https://spitting-image.herokuapp.com/api/imagesearch/freecodecamp
#### Returns
[{ 
"url": "https://avatars0.githubusercontent.com/u/9892522?v=3&s=200",
"snippet": "Free Code Camp",
"thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDt-65rSRLA4wlR_Qg4ZrKN3OhITsgQ6Pcg7f3kJhg5oqv3ouJ1A5lU1U",
"context": "https://github.com/FreeCodeCamp"
},
...
]

### Search Query with Pagination > Images

https://spitting-image.herokuapp.com/api/imagesearch/freecodecamp?offset=2
#### Returns

[{ 
"url": "http://www.i-programmer.info/images/stories/News/2016/April/B/freecodecamp1.jpg",
"snippet": "Note that Jquery comes before ...",
"thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSESe7xmBOcXwBoyG0FLY4VFOCZ31yzu1xg6K5nWUEliKZ6X8_z2YUbyXQ",
"context": "http://www.i-programmer.info/news/150-training-a-education/9698-freecodecamp-not-just-a-bootcamp.html"
},
...
]

### Search History

https://spitting-image.herokuapp.com/api/latest/imagesearch/
#### Returns
[{ 
"term": "freecodecamp",
"when": "2017-01-01T01:56:29.991Z"
},
...
]
