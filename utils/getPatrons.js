const fs = require('fs');

const getPatrons = () =>
  new Promise((resolve, reject) => {
    const nums = { god: 1, fb: 2, oprah: 3, exec: 15 };
    fs.readFile('/var/www/content/patreonwall.json', (err, data) => {
      console.log(data);
      const patrons = JSON.parse(data);
      Object.keys(patrons).forEach(k => {
        const avail = nums[k] - patrons[k].length;
        for (let i = 0; i < avail; i++) {
          patrons[k].push('Available');
        }
      });
      resolve(patrons);
    });
    // const patrons = {
    //   god: [],
    //   fb: ['Jetrix'],
    //   oprah: ['BSTULLKIT'],
    //   exec: [
    //     'JoeMcDong',
    //     'Sir Homes',
    //     'Postal Panda',
    //     'Jamaican Jazz',
    //     'Adam B',
    //     'ToadOfSteel',
    //     'Naeli',
    //     'Derek P',
    //     'Frysiee',
    //     'IceWulfie',
    //   ],
    // };
  });

module.exports = getPatrons;
