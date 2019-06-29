'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var os = require("os");
var fs = require('fs');
var app = express();
var stringifyFile = null;

app.use(bodyParser.json());

var readFilePro = function readFilePro(file) {
	return new Promise(function (res, rej) {
		fs.readFile(file, 'utf-8', function (err, data) {
			if (err) rej('I could not find that file');
			console.log(res(data) ? res(data) : 'null');
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

app.get('/getNote', function (req, res) {
	fs.readFile('./test.json', 'utf8', function (err, data) {
		if (err) throw err;
		stringifyFile = data;
		res.send('\n       ' + JSON.stringify(data, null, 4) + '\n    ');
	});
});

app.post('/updateNote/:note', function (req, res) {
	stringifyFile = JSON.stringify(req.params.note, null, 4);
	readFilePro(__dirname + '/test.json').then(function (data) {

		return stringifyFile += os.EOL + data + os.EOL + (' Craeted on ' + Date.now());
	}).then(function () {
		console.log(req.params.note);
		return writeFilePro(__dirname + '/test.json', stringifyFile).then(function () {
			console.log('success!');
		}).then(function () {
			readFilePro(__dirname + '/menu.json').then(function (data) {
				return stringifyFile += os.EOL + data + (' Craeted on ' + Date.now());
			}).then(function () {
				return writeFilePro(__dirname + '/log.json', stringifyFile).then(function () {
					console.log('success!');

					res.send(stringifyFile);
				});
			});
		});
	}).catch(function (err) {
		console.log(err.message);
	});
});

// app.post('/updateNote/:note', function(req, res) {
// 	stringifyFile = JSON.stringify(req.params.note, null, 4) ;
//      fs.readFile('./test.json', 'utf8', (error,data)=>{
// 	     if (error) throw error;
// 	     stringifyFile += os.EOL + data + os.EOL + ` Craeted on ${Date.now()}`;
//      	fs.writeFile('./test.json',stringifyFile,(error, data)=>{
// 	        if (error) throw error;
// 	        fs.readFile('./menu.json', 'utf8', (error,data)=>{
// 		        stringifyFile += os.EOL + data +` Craeted on ${Date.now()}`;
// 		        fs.writeFile('./log.json',stringifyFile,error =>{
// 			        if (error) throw error;
// 		        })
// 	        })
//      		res.send(stringifyFile);
//         })
//      });
// });


app.use(function (req, res, next) {
	res.removeHeader('X-Powered-By');
	next();
	res.locals.data = 'Dane dodane wczesniej';
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});

app.listen(3000);
