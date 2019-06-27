const express = require('express');
const bodyParser = require('body-parser');
const os = require("os");
const fs = require('fs');
const app = express();
let stringifyFile = null;


app.use(bodyParser.json());


app.get('/getNote', function(req, res) {
	fs.readFile('./test.json', 'utf8', function(err, data) {
		if (err) throw err;
		stringifyFile = data;
		res.send(`
       ${JSON.stringify(data, null, 4)}
    `);
	});
});


app.post('/updateNote/:note', function(req, res) {
	stringifyFile = JSON.stringify(req.params.note, null, 4) ;
     fs.readFile('./test.json', 'utf8', (error,data)=>{
	     if (error) throw error;
	     stringifyFile += os.EOL + data + os.EOL + ` Craeted on ${Date.now()}`;
     	fs.writeFile('./test.json',stringifyFile,(error, data)=>{
	        if (error) throw error;
	        fs.readFile('./menu.json', 'utf8', (error,data)=>{
		        stringifyFile += os.EOL + data +` Craeted on ${Date.now()}`;
		        fs.writeFile('./log.json',stringifyFile,error =>{
			        if (error) throw error;
		        })
	        })
     		res.send(stringifyFile);
        })
     });
});


app.use(function (req, res, next) {
	res.removeHeader('X-Powered-By');
	next();
	res.locals.data= 'Dane dodane wczesniej'
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});


app.listen(3000);


