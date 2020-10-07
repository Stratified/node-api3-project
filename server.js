const express = require('express');

const server = express();

//custom middleware

const logger = (req, res, next) => {
	const time = new Date().toISOString();
	console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`);
	next();
};

server.use(logger);

server.listen(5555, () => {
	console.log('Server listening in on port 5555.');
});

module.exports = server;
