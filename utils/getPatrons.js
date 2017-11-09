const fs = require('fs');

const getPatrons = () =>
  new Promise((resolve, reject) => {
    const nums = { god: 1, fb: 2, oprah: 3, exec: 15 };
    fs.readFile(
      '/var/www/technicalalpha/content/patreonwall.json',
      (err, data) => {
        const patrons = JSON.parse(data);
        Object.keys(patrons).forEach(k => {
          const avail = nums[k] - patrons[k].length;
          for (let i = 0; i < avail; i++) {
            patrons[k].push('Available');
          }
        });
        resolve(patrons);
      },
    );
  });

module.exports = getPatrons;
