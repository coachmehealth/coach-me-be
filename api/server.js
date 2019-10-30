const express = require('express');
const configureMiddleware = require('./middleware');

const basicRoute = require('../routes/basicRoute.js');
const coachRoute = require('../routes/coachRoute/coachRoute.js');
const forgotRoute = require('../routes/forgotPassword.js');

const server = express();

configureMiddleware(server);

server.use('/clientRoute', basicRoute);

server.use('/coachRoute', coachRoute);

server.use('/forgotRoute', forgotRoute);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world from base server' });
});

module.exports = server;
