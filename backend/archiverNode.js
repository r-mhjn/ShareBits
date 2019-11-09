const fs = require('fs')
const archiver = require('archiver')

let output = fs.createWriteStream(__dirname + '/example.zip')
let archive = archiver('zip', {
	zlib: { level: 9 }
})

output.on('close', function () {
	console.log(archive.pointer() + ' total bytes');
	console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function () {
	console.log('Data has been drained');
});

archive.on('warning', function (err) {
	if (err.code === 'ENOENT') {
		// log warning
	} else {
		// throw error
		throw err;
	}
});

archive.on('error', function (err) {
	throw err;
});

const archiveFile=()=>{
	
}