const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	name: { type: String, required: true, max: 100 },
	encodedName: { type: String, required: false, max: 100, default: null }
}, {
		timestamps: true
	});

module.exports = mongoose.model("File", fileSchema);