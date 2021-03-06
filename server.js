const next = require('next');
const dotenv = require('dotenv').config();
const routes = require('./routes');
const assets = require('./utils/assets');
const getRedirectUrl = require('./utils/getRedirectUrl');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const express = require('express');
const server = express();

// https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
app.prepare().then(() => {
  server.get('/api/assets', assets);
  server.get('/api/redirectUrl', getRedirectUrl);
  server.use(handler);
  server.listen(3000);
});
