var casper = require('casper').create();
var system = require('system');
var url = system.args[4];
var fs = require('fs');
// for JSON
var output = [];
var counter = 0;

// filename
var fname = new Date().getTime() + '.json';
var save = fs.pathJoin(fs.workingDirectory, 'logs', fname);

casper.start(url, function() {
	links = this.getElementsInfo('a img');
	return links;
});

casper.then(function() {
	this.each(links, function(self, image) {
		if (image.attributes.alt === undefined) { // no alt text
			output.push({ 
				WCAG: '2.4.4-1: Linked image has missing alt text.',
				message: 'Linked image has no alt text',
				image: image.attributes.src,
				imageID: 'image-' + counter
			});
			this.capture('image-' + counter + '.png', {
				top: image.y,
		        left: image.x,
		        width: image.width,
		        height: image.height
			});
			counter++;
		} 
	});
});

casper.run(function() {
	// write out file in json
	fs.write(save, JSON.stringify(output), 'w');
	casper.exit();
});