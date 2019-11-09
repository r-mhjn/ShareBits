const fs = require('fs');
const request = require('request-promise')
const QRCode = require('qrcode-terminal');

const displayQr = (link) => {
	QRCode.generate(link, { small: true });
}

const uploadFile = (path, callback) => {
	if (!fs.existsSync(path)) {
		console.error('invalid path')
		return false;
	}
	// console.log(path)
	let formData = {
		file: fs.createReadStream(path)
	}
	// axios.post('http://localhost:5000/file/upload', {
	// 	headers: {
	// 		'Content-Type': 'multipart/form-data'
	// 	},
	// 	formData: formData
	// })
	// 	.then(res => {
	// 		console.log(res.data)
	// 	})
	// 	.catch(e => {
	// 		console.log(e)
	// 	});
	// fs.createReadStream(path).pipe(request.post('http://localhost:5000/file/upload'))
	console.log('uploading file...')
	request.post('http://www.shbt.live/file/upload', {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		formData: formData
	})
		.then(res => {
			console.log('done!')
			const jsonRes = JSON.parse(res);
			console.log('share link: ' + 'http://shbt.live/' + jsonRes.url);
			console.log('or scan QR:')
			displayQr('http://shbt.live/' + jsonRes.url);
			callback(true);
		})
		.catch(err => {
			console.log('network error')
			callback(false);
		});
}

module.exports = {
	uploadFile
}