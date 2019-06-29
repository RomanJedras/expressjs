const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
	return new Promise((res, rej)=>{
		fs.readFile(file,(err, data)=>{
			if (err) rej('I could not find that file')
			console.log(res(data))
		})
	})
}

const writeFilePro = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, err => {
			if (err) reject('Could not write file 😢');
			resolve('success');
		});
	});
};




readFilePro(`${__dirname}/dog.txt`).then(data => {
	console.log(` Bread: ${data}`);
	return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res => {
		console.log(res.body.message);
		return writeFilePro('dog-image.txt',res.body.message)
		}).then(() => {
	console.log('Random dog image saved to file!');
}).catch(err => {
		console.log(err.message);
	});











