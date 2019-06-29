
const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`,(err,data)=>{
 console.log(` Bread: ${data}`)
	
	superagent('get',`https://dog.ceo/api/breeds/image/random`)
	.then(res => {
		console.log(res.body.message)
		fs.writeFile('dog-image.txt',res.body.message,err=>{
			if (err) return	console.log(err.message);
			
			console.log('Random save image file');
		})
	}).catch(err=> {console.log(err.message)})
});









