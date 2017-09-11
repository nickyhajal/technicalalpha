const fs = require('fs');
const checkStream = require('./checkStream');
const episodes = require('./episodes');
const getPatrons = require('./getPatrons');

const assets = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  Promise.all([checkStream, episodes, getPatrons]).then(r => {
    const [live, episodes, patrons] = r;
    console.log(aboutMd);
    res.send({
      live,
      episodes,
      patrons,
    });
  });
};
module.exports = assets;
