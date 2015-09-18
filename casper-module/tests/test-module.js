exports.test = function() {

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
			        	url: url,
			        	wcag: '4.1.1',
			        	message: 'The ID: "' + sorted_arr[i]  + '" has been used more than once.'
			        });
			    }
			}
		}
			
		
	});

	casper.run(function() {
		console.log(JSON.stringify(output));
		casper.exit();
	});
};