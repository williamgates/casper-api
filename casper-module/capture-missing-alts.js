var casper = require('casper').create();
var system = require('system');
var url = system.args[4];

// an empty array
var images, counter = 0;

// get all image's element bounds
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