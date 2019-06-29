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

const getDocPic = async() => {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(` Bread: ${data}`);
		const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		console.log(res.body.message);
		
		await writeFilePro('dog-image.txt', res.body.message);
		console.log('Random dog image saved to file!')
	} catch (err) {
		console.log(err);
		
		//throw err;
	}
	//return '2: READY 🐶';
}


(async ()=>{
	try {
		console.log('1: Will get dog pics!');
		await getDogPic();
		console.log('3: Done getting dog pics!');
	} catch (err) {
		console.log('ERROR 💥');
	}
})();



// try {
// 	console.log('1: Will get dog pics!');
// 	 getDogPic().then(x=>{
// 		 console.log(x);
// 		 console.log('3: Done getting dog pics!');
// 	 });
//
//
// } catch (err) {
// 	console.log('ERROR 💥');
// }



// readFilePro(`${__dirname}/dog.txt`).then(data => {
// 	console.log(` Bread: ${data}`);
// 	return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// })
// .then(res => {
// 		console.log(res.body.message);
// 		return
// 		}).then(() => {
// 	console.log('Random dog image saved to file!');
// }).catch(err => {
// 		console.log(err.message);
// 	});











