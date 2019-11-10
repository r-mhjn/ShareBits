const axios = require('axios')
const QRCode = require('qrcode-terminal');

const displayQr = (link) => {
	QRCode.generate(link, { small: true });
}

const uploadText = (text, callback) => {
	console.log('uploading text...')
	axios.post('http://shbt.live/text/upload', {
		text: text
	})
		.then(res => {
			console.log('share link: ' + 'http://www.shbt.live/text/download/' + res.data.url);
			// displayQr('http://shbt.live/' + res.data.url);
			callback(true)
		})
		.catch(err => {
			console.log(err)
			callback(false)
		})
}

const downloadText = (link) => {
	console.log('downloading text...')
	axios.get('http://www.shbt.live/text/download/'+link)
		.then(res => {
			console.log('heres the text: ')
			console.log(res.data.data)
		})
		.catch(err => {
			console.log('network err')
		})
}

module.exports = {
	uploadText,
	downloadText
}