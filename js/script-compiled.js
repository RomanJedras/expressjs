'use strict';

var fs = require('fs');
var superagent = require('superagent');

var readFilePro = function readFilePro(file) {
	return new Promise(function (res, rej) {
		fs.readFile(file, function (err, data) {
			if (err) rej('I could not find that file');
			console.log(res(data));
		});
	});
};

var writeFilePro = function writeFilePro(file, data) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(file, data, function (err) {
			if (err) reject('Could not write file 😢');
			resolve('success');
		});
	});
};

readFilePro(__dirname + '/dog.txt').then(function (data) {
	console.log(' Bread: ' + data);
	return superagent.get('https://dog.ceo/api/breed/' + data + '/images/random');
}).then(function (res) {
	console.log(res.body.message);
	return writeFilePro('dog-image.txt', res.body.message);
}).then(function () {
	console.log('Random dog image saved to file!');
}).catch(function (err) {
	console.log(err.message);
});
