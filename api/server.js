const express = require('express');
const helmet = require('helmet');

const ProjectsRouter = require('../projects/projects-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/work', ProjectsRouter);

server.get('/', (req, res) => {
	res.send('<h1>Hello World</h1>');
});

module.exports = server;