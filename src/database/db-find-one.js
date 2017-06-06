const { Run } = require('./db-connection');

const findOneRun = (runId, cb) => {
  Run.findOne({runId: runId}, (err, run) => {
    if (err) return cb(err);
    cb(null, run);
  });
};

module.exports = findOneRun;
