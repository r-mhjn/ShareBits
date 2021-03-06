const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const fileRouter = require('./routes/file');
const textRouter = require('./routes/text');

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

app.use(cors());
app.use(morgan('short'));
app.use(express.json());
app.use('/file', fileRouter);
app.use('/text', textRouter);

app.use(express.static(__dirname + '/../frontend-app/build'));
app.use(express.static(__dirname + '/../frontend-download-app/build'));

app.get('/', (req, res) => {
	const link = req.params.link
	console.log(link)
	res.sendFile('index.html', { root: __dirname + '/../frontend-app/build' });
})
app.get('/:link', (req, res) => {
	const link = req.params.link
	console.log(link)
	res.sendFile('index.html', { root: __dirname + '/../frontend-download-app/build' });
})

app.listen(port, () => {
	console.log("server up on port " + port)
});