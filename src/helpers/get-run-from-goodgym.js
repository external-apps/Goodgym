const request = require('request');
const safeJsonParse = require('./safe-json-parse');

const getRunFromGoodGym = (paramId, cb) => {
  request('https://www.goodgym.org/getHappenings', (err, res, body) => {
    if (err) return cb(err);
    if (res.statusCode === 200) {
      var runs = safeJsonParse(body).items;
      var run = runs.filter(run => run.id === +paramId);
      if (run.length > 0) {
        return cb(null, run);
      } else {
        return cb(new Error('No run found in database'));
      }
    } else {
      return cb(new Error(`Server error: ${res.statusCode}`));
    }
  });
};

module.exports = getRunFromGoodGym;
