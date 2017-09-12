require('isomorphic-fetch');
let content = {};
let lastFetched = 0;

module.exports = new Promise((resolve, reject) => {
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
      .then(async vals => {
        const [aboutRsp, stringsRsp] = vals;
        const about = await aboutRsp.text();
        const strings = await stringsRsp.text();
        console.log(strings);
        resolve({
          about,
          strings: JSON.parse(strings),
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    resolve(content);
  }
});
