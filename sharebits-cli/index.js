#!/usr/bin/env node

const yargs = require('yargs')
// const axios = require('axios')
const uploadModule = require('./uploadModule');
const downloadModule = require('./downloadModule');

const upload_options = {
	describe: 'name of file to be uploded',
	demand: 'true',
	alias: 'f',
	type: 'array'
}
const download_options = {
	describe: 'unique identifier',
	demand: 'true',
	alias: 'u'
}

const argv = yargs
	.command('push', 'Upload a file', {
		file: upload_options,
	})
	.command('get', 'Download a file', {
		uid: download_options
	})
	.help()
	.argv;

let choice = argv._[0];

switch (choice) {
	case 'push':
		//upload file
		const filePathArray = argv.file;
		console.log(filePathArray)
		uploadModule.uploadFile(filePathArray, (result) => {
			console.log(result ? 'file uploaded successfully' : 'failed to upload file(s).')
		});
		break;
	case 'get':
		//download file
		const uid = argv.uid;
		downloadModule.downloadFile(uid, (result) => {
			console.log(result ? 'file downloaded successfully' : 'failed to download file(s).')
		});
		break;
	default:
		console.log('invalid option')
		break;
}