var express = require('express');
var app = express();
//var exec = require("child_process").exec;
var browserify = require('browserify');
var fs = require('fs');
var UglifyJS = require('uglify-js');

var bundler = browserify(__dirname + '/main.js');

bundler.transform({
  global: true
}, 'uglifyify');

bundler.bundle()
  .pipe(fs.createWriteStream(__dirname + '/bundle.js')
  	.on('finish', function() {
  		var result = UglifyJS.minify('bundle.js', {
			mangle: true,
			compress: {
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			}
		});
  		fs.writeFileSync('bundle.js', result.code);
  		runServer()
  	}));

//exec("browserify main.js -o bundle.js",runServer());

function runServer (){
	app.set('port', (process.env.PORT || 5000));

	app.use(express.static(__dirname + '/'));

	app.get('/', function(request, response) {
	  response.render('index');
	});

	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});
}