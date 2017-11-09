const fs = require('fs');

let patrons = {};
let lastFetched = 0;

const getPatrons = () =>
  new Promise((resolve, reject) => {
    const now = +new Date();
    const nums = { god: 1, fb: 2, oprah: 3, exec: 15 };
    const finish = () => {
      Object.keys(patrons).forEach(k => {
        const avail = nums[k] - patrons[k].length;
        for (let i = 0; i < avail; i++) {
          patrons[k].push('Available');
        }
      });
      resolve(patrons);
    };
    if (now - lastFetched > 60000) {
      fs.readFile(
        '/var/www/technicalalpha/content/patreonwall.json',
        (err, data) => {
          patrons = JSON.parse(data);
          finish();
        },
      );
    } else {
      finish();
    }
  });

module.exports = getPatrons;
