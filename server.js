const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('assets'));


app.get('/', function (req, res) {
	res.sendFile('/index.html')
});

app.get('/userform', function (req, res) {
	
	const response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};
	res.json(response);
});

app.use(function(req, res, next){
	console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!');
	next();
});

const server = app.listen(3000, 'localhost', function() {
	const host = server.address().address;
	const port = server.address().port;
	
	console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});


