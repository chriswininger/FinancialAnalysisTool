var express = require('express'),
    DataRequestHandler = require(__dirname + '/lib/dataRequestHandler.js'),
    UploadHandler = require(__dirname + '/lib/uploadHandler.js');

var port = 3000;

var app = new express();
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.redirect('/index.html');
});
app.use('/', express.static(__dirname + '/public'));

var dataRequestHandler = new DataRequestHandler(app);
var uploadHandler = new UploadHandler(app);

app.listen(port);
console.log('listening on port ' + port);