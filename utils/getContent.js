require('isomorphic-fetch');
let content = {};
let lastFetched = 0;

module.exports = () =>
  new Promise((resolve, reject) => {
    const now = +new Date();
    if (now - lastFetched > 60000) {
      Promise.all([
        fetch(
          'https://raw.githubusercontent.com/nickyhajal/technicalalpha/master/content/about.md',
        ),
        fetch(
          'https://raw.githubusercontent.com/nickyhajal/technicalalpha/master/content/strings.json',
        ),
      ])
        .then(vals => {
          const [aboutRsp, stringsRsp] = vals;
          Promise.all([
            aboutRsp.text(),
            stringsRsp.text(),
          ]).then(([about, strings]) => {
            content = {
              about,
              strings: JSON.parse(strings),
            };
            lastFetched = now;
            resolve(content);
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      resolve(content);
    }
  });
