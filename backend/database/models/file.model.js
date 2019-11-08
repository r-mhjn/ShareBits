const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	url: { type: String, required: true, max: 10, default: null },
	originalName: { type: String, required: true, max: 100 },
	multerName: { type: String, required: true, max: 100, default: null },
	mimeType: { type: String, required: true, default: null },
}, {
		timestamps: true
	});

module.exports = mongoose.model("File", fileSchema);