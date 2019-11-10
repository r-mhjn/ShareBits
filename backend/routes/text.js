const router = require('express').Router();
const shortid = require('shortid');
// const archiver = require('archiver');
const Text = require('../database/models/text.model')

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

router.route('/upload').post((req, res) => {
	if (req.body.text == undefined) {
		return res.status(400).json('text required')
	}
	const text = new Text({
		url: shortid(),
		data: req.body.text,
	});
	text.save()
		.then(text => {
			res.json(text)
		})
		.catch(err => {
			res.status(400).json(err)
		})
})

router.route('/download/:link').get((req, res) => {
	Text.findOne({ url: req.params.link })
		.then(text => {
			res.send(text);
		})
		.catch(err => {
			res.status(400).json(err);
		});
})

module.exports=router;