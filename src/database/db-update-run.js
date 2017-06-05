const Run = require('./db-connection');

const updateRun = (inputRun) => {
  const updateOption = {
    '$set': {
      'run.task': inputRun.task,
      'run.location': inputRun.location,
      'run.purpose': inputRun.purpose,
      'run.contact': inputRun.contact,
      'run.risk': inputRun.risk,
      'run.email': inputRun.email
    }
  };

  Run.findOneAndUpdate({'run.runId': inputRun.runId}, updateOption, (err, run) => {
    if (err) throw err;
    console.log(run, 'Updated run!');
  });
};

module.exports = updateRun;
