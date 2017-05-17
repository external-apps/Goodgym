const GoodGymDB = require('./db-connection');
const findOneRun = require('./db-find-one');

const updateRun = (inputRun) => {
  const updateOption = {
    '$set': {
      'run.task': inputRun.task,
      'run.location': inputRun.location,
      'run.purpose': inputRun.purpose,
      'run.contact': inputRun.contact,
      'run.risk': inputRun.risk
    }
  };

  GoodGymDB.findOneAndUpdate({'run.runId': inputRun.runId}, updateOption, (err, run) => {
    if (err) throw err;
    console.log(run, 'Updated run!');
  });
};

const addRunToDB = (inputRun, cb) => {
  let newRun = GoodGymDB({
    run: inputRun
  });

  const saveRun = () => {
    newRun.save((err) => {
      if (err) return cb(err);
      console.log('Run created!');
      return cb(null, inputRun);
    });
  };

  findOneRun(inputRun.runId, (err, run) => {
    if (err) throw new Error(err);
    if (run.length > 0) {
      console.log('duplicate');
      updateRun(inputRun);
    } else {
      console.log('not duplicate');
      saveRun();
    }
  });
};

module.exports = addRunToDB;
