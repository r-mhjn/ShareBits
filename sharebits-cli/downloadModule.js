const fs = require('fs');
const axios = require('axios')

const fetchInfo = (link, callback) => {
	console.log('fetching file info')
	axios.get('http://www.shbt.live/file/download/' + link + '/info')
		.then(res => {
			// console.log(res.data)
			callback(res.data);
		})
		.catch(err => {
			// console.log(err)
			callback({});
		});
}

const downloadFile = (link, callback) => {
	fetchInfo(link, (info) => {
		if (info.originalName === undefined) {
			console.log('file not found')
			return callback(false);
		}
		console.log('downloading file')
		const file = fs.createWriteStream(info.originalName);
		axios.get('http://www.shbt.live/file/download/' + link, { responseType: 'stream' })
			.then(res => {
				res.data.pipe(file);
			})
			.catch(err => {
				fs.unlink(info.originalName);
				console.log('network error')
				return callback(false);
			});
		file.on('finish', () => {
			file.close();
			callback(true);
		})
	})
}

module.exports = {
	downloadFile
}