var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
//var users = require('./routes/users');
//var tables = require('./routes/tables');
//var decusoft = require('./routes/decusoft');

console.log('loading mongoose moodule');

var mongoose = require('mongoose');

//console.log('done: ' + mongoose);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//Connecting to mongo db
/*mongoose.db.on('error', function() {
    console.error('MongoDB connection error..!');
});

mongoose.db.on('open', function() {
    console.log('MongoDB connections is okay...!');
});*/

var mongooseOptions = {
    db: {
        native_parser: true
    },
    server: {
        poolSize: 5
    }
};

mongoose.connect('mongodb://localhost/carparking', mongooseOptions);

//Loading all models in nodelmodel directory
//console.log('Directory name' + __dirname);

fs.readdirSync(__dirname + '/models').forEach(function(fileName){
    console.log(fileName + ' schema is loading');
    if(~fileName.indexOf('.js')) {
        require(__dirname + '/models/' + fileName);
    }
});

//Make our mongoose object accessible to our router
app.use(function(req,res,next){
    req.mongoose = mongoose;
    next();
});

app.use('/', index);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log('Error handler is attached');
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
module.exports = app;
app.listen(8080);