const router = require('express').Router();
const multer = require('multer');
const shortid = require('shortid');
const File = require('../database/models/file.model');
const fs = require('fs');
const AdmZip = require('adm-zip');
const archiver = require('archiver');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

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
})



const upload = multer({ storage: storage, limits }).array('file');

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

const saveFileToDatabase = async (file) => {
	return await file.save()
}
router.route('/upload').post(uploadFile, (req, res) => {
	// console.log('saved ' + req.file.originalname)
	// console.log(shortid())
	console.log(req.files)
	const url = shortid();
	req.files.forEach(file => {
		const newfile = new File({
			url: url,
			originalName: file.originalname,
			multerName: file.filename,
			mimeType: file.mimetype
		});
		saveFileToDatabase(newfile)
			.then()
			.catch(err => {
				return res.json(err);
			})
	})
	res.json({ url });

});

router.route('/download/:link/info').get((req, res) => {
	const link = req.params.link;
	File.find({ url: link })
		.then(files => {
			if (files.length > 1) {
				return res.json({ originalName: "files.zip" });
			}
			const { originalName } = files[0];
			res.json({ originalName });
		})
		.catch(err => {
			// console.log(err)
			res.status(404).json(err);
		});
})

router.route('/download/:link').get((req, res) => {
	const link = req.params.link
	console.log(link)
	File.find({ url: link })
		.then(files => {
			if (files.length > 1) {
				// console.log('sending zip')
				// let zip = new AdmZip()

				// files.forEach(file => {
				// 	console.log('adding ', file);
				// 	// const content = "hello!" //fs.readFileSync(__dirname + '/../uploads/' + file.multerName)
				// 	// console.log('adding local', content);
				// 	// zip.addFile(file.originalName, fs.readFileSync(__dirname + '/../uploads/' + file.multerName));
				// 	console.log(__dirname + '/../uploads/' + file.multerName)
				// 	zip.addLocalFile(__dirname + '/../uploads/' + file.multerName);
				// });

				// // const toSend = zip.toBuffer();
				// zip.writeZip('toSend.zip');
				// // console.log(toSend)
				// // res.contentType(application/zip);
				// return res.download(__dirname + '/../toSend.zip', 'files.zip');

				const zipfile = archiver('zip');
				zipfile.on('error', (err) => {
					throw err;
				});
				// archive.file('./server.js', { name: 'file4.txt' });
				zipfile.pipe(res);
				files.forEach(file=>{
					zipfile.file('uploads/'+file.multerName,{name:file.originalName});
				});
				// zipfile.append('string cheese!', { name: 'file2.txt' });
				// console.log(__dirname+'/../uploads/')
				zipfile.finalize();
				return;

			} else if (files.length === 1) {
				return res.download(__dirname + '/../uploads/' + file.multerName, file.originalName);
			} else {
				res.status(404);
			}
			//console.log(fs.readFileSync(__dirname + '/../uploads/' + files[1].multerName))
			// console.log('found file ' + file.originalName)
			// console.log('sending file ' + file.multerName)
			// console.log(__dirname)
			// res.setHeader({
			// 	"Content-Disposition": `attachment;filename=${file.originalName}`,
			// 	"Content-Type": `${file.mimeType}`,
			// });
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;