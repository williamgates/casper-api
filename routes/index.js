var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

var cmd = 'casperjs casper-module/forms-duplicate-ids.js http://localhost:3000';

var out;
exec(cmd, function(err, stdout, stderr) {
	
	out = JSON.parse(stdout);
	console.log(out);
	return out;

});

router.get('/', function(req, res) {
	res.render('index', {
		title: 'Casper tests',
		messages: out
	});
});

module.exports = router;