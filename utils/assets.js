const fs = require('fs');
const checkStream = require('./checkStream');
const episodes = require('./episodes');
const getPatrons = require('./getPatrons');
const getContent = require('./getContent');

const assets = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  Promise.all([
    checkStream(),
    episodes(),
    getPatrons(),
    getContent(),
  ]).then(r => {
    const [live, episodes, patrons, content] = r;
    res.send({
      live,
      episodes,
      patrons,
      content,
    });
  });
};
module.exports = assets;
