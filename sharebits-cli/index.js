#!/usr/bin/env node

const yargs = require('yargs')
const axios = require('axios')

const upload_options = {
	describe: 'name of file to be uploded',
	demand: 'true',
	alias: 'f'
}
const download_options = {
	describe: 'unique identifier',
	demand: 'true',
	alias: 'u'
}

const argv = yargs
	.command('push', 'Upload a file', {
		file: upload_options
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
		break;
	case 'get':
		//download file
	default:
		console.log('invalid option')
		break;
}

console.log(choice)