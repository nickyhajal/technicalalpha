const isomorphicFetch = require('isomorphic-fetch');
let content = {};
let lastFetched = 0;
module.exports = new Promise((resolve, reject) => {
  const now = +new Date();
  if (now - episodesLastFetched > 60000) {
    rssParser.parseURL('http://technicalalpha.libsyn.com/rss', parseResponse);
  } else {
    resolve(episodes);
  }
});
