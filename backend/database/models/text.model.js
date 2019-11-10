const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
	url: { type: String, required: true, max: 10, default: null },
	data: { type: String, required: true, max:500, default: "" },
}, {
		timestamps: true
	});

module.exports = mongoose.model("Text", textSchema);