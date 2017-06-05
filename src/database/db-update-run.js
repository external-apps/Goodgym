const { Run } = require('./db-connection');

const updateRun = (inputRun) => {
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

  Run.findOneAndUpdate({runId: inputRun.runId}, updateOption, (err, run) => {
    if (err) throw err;
    console.log(run, 'Updated run!');
  });
};

module.exports = updateRun;
