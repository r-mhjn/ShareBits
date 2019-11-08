const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const port = process.env.PORT | 5000;
var uri = process.env.ATLAS_URI;

mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.error('connected to mongodb database successfully');
}).on('error', () => {
	console.error('error connecting to the database');
});

app.use(morgan('short'));
app.use(express.json());

app.listen(port, () => {
	console.log("server up on port " + port)
});