var casper = require('casper').create();
var system = require('system');
var url = system.args[4];
var fs = require('fs');
var _ = require('underscore');
// for JSON
var output = [];
var counter = 0;

var formControls;
var uniqueFormControls;
var duplicates = [];

// filename
var fname = new Date().getTime() + '.json';
var save = fs.pathJoin(fs.workingDirectory, 'logs', fname);

casper.start(url, function() {
	formControls = this.getElementsAttribute('input, select, textarea', 'id');
	return formControls;
});

casper.then(function() {
	uniqueFormControls = _.uniq(formControls);
	if (uniqueFormControls.length < formControls.length) {
		var sorted_arr = formControls.sort();
		for (var i = 0; i < formControls.length - 1; i++) {
		    if (sorted_arr[i + 1] == sorted_arr[i]) {
		        duplicates.push(sorted_arr[i]);

		        output.push({
		        	message: '4.1.1-4: Form elements have duplicate ids: ' + sorted_arr[i] 
		        })
		    }
		}
	}
		
	
});

casper.run(function() {
	console.log(JSON.stringify(output));
	casper.exit();
});