var express = require('express');
var app     = express();
var server  = require('http').createServer(app).listen(process.env.PORT || 5000);

// express

app.use('/public/css',  express.static(__dirname + '/public/css'));
app.use('/public/img',  express.static(__dirname + '/public/img'));
app.use('/public/js',   express.static(__dirname + '/public/js'));
app.use('/public/obj',  express.static(__dirname + '/public/obj'));

app.get('/', function (req, resp) {
  resp.render('index.jade');
});
