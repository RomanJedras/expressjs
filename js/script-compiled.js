'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

var getDocPic = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var data, res;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return readFilePro(__dirname + '/dog.txt');

					case 3:
						data = _context.sent;

						console.log(' Bread: ' + data);
						_context.next = 7;
						return superagent.get('https://dog.ceo/api/breed/' + data + '/images/random');

					case 7:
						res = _context.sent;

						console.log(res.body.message);

						_context.next = 11;
						return writeFilePro('dog-image.txt', res.body.message);

					case 11:
						console.log('Random dog image saved to file!');
						_context.next = 17;
						break;

					case 14:
						_context.prev = 14;
						_context.t0 = _context['catch'](0);

						console.log(_context.t0);

						//throw err;

					case 17:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 14]]);
	}));

	return function getDocPic() {
		return _ref.apply(this, arguments);
	};
}();

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
	return regeneratorRuntime.wrap(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.prev = 0;

					console.log('1: Will get dog pics!');
					_context2.next = 4;
					return getDogPic();

				case 4:
					console.log('3: Done getting dog pics!');
					_context2.next = 10;
					break;

				case 7:
					_context2.prev = 7;
					_context2.t0 = _context2['catch'](0);

					console.log('ERROR 💥');

				case 10:
				case 'end':
					return _context2.stop();
			}
		}
	}, _callee2, undefined, [[0, 7]]);
}))();

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
