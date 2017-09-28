const TwitchApi = require('twitch-api');
let status = false;
let lastCheck = 0;
module.exports = () =>
  new Promise((resolve, reject) => {
    const now = +new Date();
    if (now - lastCheck > 30000) {
      const twitch = new TwitchApi({
        clientId: process.env.TWITCH_KEY,
        clientSecret: process.env.TWITCH_SECRET,
        redirectUri: null,
        scopes: [],
      });
      lastCheck = now;
      twitch.getChannelStream('technicalalpha', (err, rsp) => {
        status =
          rsp !== undefined && rsp.stream !== undefined && rsp.stream !== null;
        resolve(status);
      });
    } else {
      resolve(status);
    }
  });
