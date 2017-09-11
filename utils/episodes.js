let episodes = [];
let episodesLastFetched = 0;
const rssParser = require('rss-parser');
module.exports = new Promise((resolve, reject) => {
  const now = +new Date();
  const parseResponse = (err, parsed) => {
    if (err) {
      resolve(episodes);
    } else {
      episodes = parsed.feed.entries;
      episodesLastFetched = now;
      resolve(episodes);
    }
  };
  if (now - episodesLastFetched > 3600000) {
    rssParser.parseURL('http://technicalalpha.libsyn.com/rss', parseResponse);
  } else {
    resolve(episodes);
  }
});
