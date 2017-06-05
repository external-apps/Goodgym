const Run = require('./db-connection');

const findOneRun = (runId, cb) => {
  Run.find({'run.runId': runId}, (err, run) => {
    if (err) return cb(err);
    cb(null, run);
  });
};

module.exports = findOneRun;
