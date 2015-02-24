'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var http = require('http');
var querystring = require('querystring');

var port = 3000;

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');

    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');

    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

app.get('/getCheckins', function(request, response, next) {
    var esIP = "192.168.1.77:9200";
    var endpont = "/events/event/_search";

    var elasticsearch = require('elasticsearch');
    var client = new elasticsearch.Client({
        host: esIP,
        log: 'trace'
    });

    client.search({
        index: 'events',
        type: 'event',
        body: {
            "from":0,
            "size":10,
            "query" : {
                "filtered" : {
                    "filter" : {
                        "range" : {
                            "_timestamp" : {
                                "gt" : "now-1000m"
                            }
                        }
                    }
                }
            }
        }
    }).then(function (body) {
        var hits = body.hits.hits;
        /*response.send(JSON.stringify({data: hits}));*/
        response.send({data: "aaa"});
    }, function (error) {
        response.send({data: "aaa"});
    });




});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
