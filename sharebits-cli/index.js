#!/usr/bin/env node

const yargs = require('yargs')
// const axios = require('axios')
const uploadModule = require('./uploadModule');
const downloadModule = require('./downloadModule');
const textModule = require('./textModule');

const upload_options = {
	describe: 'name of file to be uploded',
	demandOption: false,
	alias: 'f',
	type: 'array'
}
const download_options = {
	describe: 'unique identifier',
	demand: true,
	alias: 'u'
}
const text_options = {
	describe: 'text to share',
	demand: 'true',
	alias: 't',
	type: 'string'
}

const argv = yargs
	.command('push', 'Upload a file', {
		file: upload_options,
		text: text_options,
	})
	.command('get', 'Download a file', {
		uid: download_options,
	})
	.command('gettext', 'Download a text', {
		uid: download_options,
	})
	.help()
	.argv;

let choice = argv._[0];

const filePathArray = argv.file;
const text = argv.text;
const uid = argv.uid;
switch (choice) {
	case 'push':
		//upload file
		if (filePathArray !== undefined) {
			console.log(filePathArray)
			uploadModule.uploadFile(filePathArray, (result) => {
				console.log(result ? 'file uploaded successfully' : 'failed to upload file(s).')
			});
		} else if (text) {
			console.log(text)
			textModule.uploadText(text, (result) => {
				console.log(result ? 'text uploaded successfully' : 'failed to upload text.')
			});
		} else {
			console.log('provide text or file as arguments.')
		}
		break;
	case 'get':
		//download file
		downloadModule.downloadFile(uid, (result) => {
			console.log(result ? 'file downloaded successfully' : 'failed to download file(s).')
		});
		break;
	case 'gettext':
		//download text
		const uid = argv.uid;
		textModule.downloadText(uid, (result) => {
			console.log(result ? 'text downloaded successfully' : 'failed to download file(s).')
		});
		break;
	default:
		console.log('invalid option')
		break;
}