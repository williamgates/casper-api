/*
* script finds images with no alt attributes
* logs to console, captures img 
*
* usage: casperjs capture-missing-alts.js <url>
*/


var casper = require('casper').create();
var system = require('system');
var url = system.args[4];
var images, counter = 0;

// get images' info 
casper.start(url, function() {
	images = this.getElementsInfo('img');
	return images;
});

casper.run(function() {
	
	console.log('----------- Images on the page ' + url + ' -------------');
	this.each(images, function(self, image) {
		if (image.attributes.alt === undefined) {
			console.log('Image: ' + image.attributes.src + ' has a missing alt attribute. It is captured as: image-' + counter + '.png');
			this.capture('missing-alts/image-' + counter + '.png', {
				top: image.y,
		        left: image.x,
		        width: image.width,
		        height: image.height
			});
			counter++;
		} else {
			console.log('Image: ' + image.attributes.src + '. Alt text: ' + image.attributes.alt);
		}

	})

	casper.exit();
});