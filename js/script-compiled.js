'use strict';

var fs = require('fs');
var superagent = require('superagent');

fs.readFile(__dirname + '/dog.txt', function (err, data) {
	console.log(' Bread: ' + data);

	superagent('get', 'https://dog.ceo/api/breeds/image/random').then(function (res) {
		console.log(res.body.message);
		fs.writeFile('dog-image.txt', res.body.message, function (err) {
			if (err) return console.log(err.message);

			console.log('Random save image file');
		});
	}).catch(function (err) {
		console.log(err.message);
	});
});
