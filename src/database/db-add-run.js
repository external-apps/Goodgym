const { Run } = require('./db-connection');
const findOneRun = require('./db-find-one');
const updateRun = require('./db-update-run');

const addRunToDB = (inputRun, cb) => {
  let newRun = Run({
    runId: inputRun.runId,
    task: inputRun.task,
    location: inputRun.location,
    purpose: inputRun.purpose,
    contact: inputRun.contact,
    risk: inputRun.risk,
    email: inputRun.email,
    mapDetails: inputRun.mapDetails,
    startPoint: inputRun.startPoint,
    endPoint: inputRun.endPoint
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
