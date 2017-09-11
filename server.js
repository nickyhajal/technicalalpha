const next = require('next');
const dotenv = require('dotenv').config();
const routes = require('./routes');
const assets = require('./utils/assets');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const express = require('express');
const server = express();
app.prepare().then(() => {
  server.get('/api/assets', assets);
  server.use(handler);
  server.listen(3000);
});
