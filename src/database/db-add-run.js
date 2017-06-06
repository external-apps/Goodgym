const { Run } = require('./db-connection');

const addRunToDB = (inputRun, cb) => {
  const updateOption = {
    '$set': {
      task: inputRun.task,
      location: inputRun.location,
      purpose: inputRun.purpose,
      contact: inputRun.contact,
      risk: inputRun.risk,
      email: inputRun.email
    }
  };

  const options = { upsert: true, new: true };

  Run.findOneAndUpdate({runId: inputRun.runId}, updateOption, options, cb);
};

module.exports = addRunToDB;
