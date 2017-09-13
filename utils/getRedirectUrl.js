const fetch = require('isomorphic-fetch');

const assets = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  fetch(req.query.url).then(rsp => {
    res.send({ url: rsp.url });
  });
};
module.exports = assets;
