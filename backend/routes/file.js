const router = require('express').Router();
const multer = require('multer');
const shortid = require('shortid');
const File = require('../database/models/file.model');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const limits = { fileSize: 1024 * 1024 * 50 }
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	// filename: (req, file, cb) => {
	// 	const encoded=btoa();
	// 	console.log(file.filename)
	// 	cb(null, file.originalname);
	// },
});



const upload = multer({ storage: storage, limits }).single('file');

const uploadFile = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			if (err.code === 'LIMIT_FILE_SIZE') {
				res.status(406).json(err);
			} else if (err instanceof multer.MulterError) {
				res.status(400).json(err);
			}
		}
		else {
			return next();
		}
	});
}

router.route('/upload').post(uploadFile, (req, res) => {
	// console.log('saved ' + req.file.originalname)
	// console.log(shortid())
	const file = new File({
		url: shortid(),
		originalName: req.file.originalname,
		multerName: req.file.filename,
		mimeType: req.file.mimetype
	});
	file.save()
		.then(() => {
			res.json(file);
		})
		.catch(err => {
			res.json(err);
		})
});

router.route('/download/:link').get((req, res) => {
	const link = req.params.link
	console.log(link)
	File.findOne({ url: link })
		.then(file => {
			console.log('found file ' + file.originalName)
			console.log('sending file ' + file.multerName)
			console.log(__dirname)
			// res.setHeader({
			// 	"Content-Disposition": `attachment;filename=${file.originalName}`,
			// 	"Content-Type": `${file.mimeType}`,
			// });
			res.download(__dirname + '/../uploads/' + file.multerName, file.originalName);
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;