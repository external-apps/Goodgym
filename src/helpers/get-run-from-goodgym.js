const request = require('request');
const safeJsonParse = require('./safe-json-parse');

const getRunFromGoodGym = (paramId, cb) => {
  request(`https://www.goodgym.org/api/happenings/${paramId}`, (err, res, body) => {
    if (err) { return cb(err); }
    const response = safeJsonParse(body).item;
    if (res.statusCode === 200) {
      if (response) {
        return cb(null, response);
      } else {
        return cb(new Error(`No run found for ID: ${paramId}`));
      }
    } else {
      return cb(new Error(`Server error: ${res.statusCode}`));
    }
  });
};

module.exports = getRunFromGoodGym;
