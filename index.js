var express = require('express');
var app = express();

var routes = require('./routes');

app.set('views', './views');

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', routes);

app.listen(3000, function() {
	console.log('Listening on port 3000');
});