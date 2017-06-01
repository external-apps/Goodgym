const request = require('request');

const getRunFromGoodGym = (paramId, cb) => {
  request(`https://goodgym-staging-pr-646.herokuapp.com/api/happenings/${paramId}`, (err, res, body) => {
    if (err) return cb(err);
    if (!err && res.statusCode === 200) {
      return cb(null, JSON.parse(body).item);
    }
  });
};

module.exports = getRunFromGoodGym;
