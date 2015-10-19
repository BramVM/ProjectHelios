/*// to surve localy use http://localhost:8080/
var express = require('express');
var app = express();
var path = require('path');
var exec = require("child_process").exec;
//var compressor = require('node-minify');

app.use(express.static(__dirname + '/'));

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + 'index.html'));
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP ||'127.0.0.1'

function runServer (){
	app.listen(server_port, server_ip_address, function () {
	  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
	});
}

exec("browserify main.js -o bundle.js",runServer());*/

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});