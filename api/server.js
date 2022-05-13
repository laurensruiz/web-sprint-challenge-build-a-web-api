const express = require('express');
const server = express();

//need to add router and middleware here
const projRouter = require('./projects/projects-router')

server.use(express.json())
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', projRouter)

module.exports = server;
