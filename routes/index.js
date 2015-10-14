var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

//var cmd = 'casperjs casper-module/forms-duplicate-ids.js http://localhost:3000';

var cmd = 'casperjs casper-module/linked-images.js ';
var out = {};
var url = '';
// exec(cmd, function(err, stdout, stderr) {
	
// 	out = JSON.parse(stdout);
// 	console.log(out);
// 	return out;

// });

router.get('/', function(req, res) {
	res.render('index', {
		title: 'Casper tests',
		messages: out
	});
});

router.post('/', function(req, res) {

	out = {};
	cmd += req.body.url;

	exec(cmd, function(err, stdout, stderr) {
	
		out = JSON.parse(stdout);
		
		console.log(cmd);
		console.log(out);

		display(out);
		return out;



	});

	// res.render('results', {
	// 	title: 'Test results',
	// 	messages: out
	// });
	function display(out) {
		res.render('results', {
			title: 'Results',
			messages: out
		});
	}

	
});

router.get('/images', function(req, res) {
	res.render('images', {
		title: 'Images test page',
		messages: 'test'
	});
});


module.exports = router;