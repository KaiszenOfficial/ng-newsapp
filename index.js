const debug    = require('debug')('ng-newsapp:server');
const express  = require('express');
const http     = require('http');
const fetch    = require('node-fetch');
const bluebird = require('bluebird');
const cors     = require('cors');
const path     = require('path');

require('dotenv').config();

fetch.Promise = bluebird;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var VIEWS_PATH = path.join(__dirname, 'views');

app.engine('html', require('ejs').renderFile);
app.set('views', VIEWS_PATH);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'views')));

const APIKEY = process.env.API_KEY;

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/sources/:language', (req, res) => {
	let language = req.params.language;
	let url = `https://newsapi.org/v2/sources?language=${language}`

	fetch(url, {
		method: 'GET', 
		headers: {
			'X-Api-Key': APIKEY
		}
	})
	.then(response => response.json())
	.then(data => {
		return res.status(200).send({ sources: data.sources }).end();
	})
	.catch(error => {
		return res.status(500).send(error).end();
	});
});

app.get('/headlines/:source', (req, res) => {
	let source = req.params.source;
	let url = `https://newsapi.org/v2/top-headlines?sources=${source}`

	fetch(url, {
		method: 'GET', 
		headers: {
			'X-Api-Key': APIKEY
		}
	})
	.then(response => response.json())
	.then(data => {
		let headlines = data.articles.map((a, i) => ({...a, id: i}))
		return res.status(200).send({ headlines: headlines, total: data.totalResults }).end();
	})
	.catch(error => {
		return res.status(500).send(error).end();
	});
});

app.get('/article/search', (req, res) => {
	let query = req.query.q;
	let url = `https://newsapi.org/v2/everything?q=${query}`

	fetch(url, {
		method: 'GET', 
		headers: {
			'X-Api-Key': APIKEY
		}
	})
	.then(response => response.json())
	.then(data => {
		return res.status(200).send({ headlines: data.articles, total: data.totalResults }).end();
	})
	.catch(error => {
		return res.status(500).send(error).end();
	});
});


const server = http.createServer(app);

const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, host, () => {
	debug('Listening on %s:%s', host, port);
});
