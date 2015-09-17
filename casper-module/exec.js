var exec = require('child_process').exec;

var cmd = 'casperjs forms-duplicate-ids.js http://localhost:3000';

exec(cmd, function(err, stdout, stderr) {
	console.log(stdout)
});