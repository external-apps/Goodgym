const { Run } = require('./db-connection');

const addRunnerToDB = (inputRun, cb) => {
  const updateOption = {
    '$addToSet': {
      runners: inputRun.runner
    }
  };
  Run.findOneAndUpdate({runId: inputRun.runId}, updateOption, cb);
};

module.exports = addRunnerToDB;
