const request = require('request');

const getRunFromGoodGym = (paramId, cb) => {
  request('https://www.goodgym.org/getHappenings', (err, res, body) => {
    if (err) return cb(err);
    if (!err && res.statusCode === 200) {
      JSON.parse(body).items.forEach((run) => {
        if (run.id === +paramId) {
          return cb(null, run);
        }
      });
    }
  });
};

module.exports = getRunFromGoodGym;
