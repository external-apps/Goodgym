const { GoodGymDB } = require('./db-connection');

const findOneRun = (runId, cb) => {
  GoodGymDB.find({'run.runId': runId}, (err, run) => {
    if (err) return cb(err);
    cb(null, run);
  });
};

module.exports = findOneRun;
