const request = require('request');

const getRunFromGoodGym = (paramId, cb) => {
  request('https://www.goodgym.org/getHappenings', (err, res, body) => {
    if (err) return cb(err);
    if (res.statusCode === 200) {
      var runs = JSON.parse(body).items;
      if (!runs.find(run => { return run.id === +paramId; })) {
        return cb(new Error('No run found in database'));
      } else {
        runs.forEach(run => {
          if (run.id === +paramId) {
            return cb(null, run);
          }
        });
      }
    }
  });
};

module.exports = getRunFromGoodGym;
