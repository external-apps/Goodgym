const GoodGymDB = require('./db-connection');

const addRunToDB = (inputRun) => {
  let newRun = GoodGymDB({
    run: inputRun
  });

  newRun.save(function (err) {
    if (err) throw err;
    console.log('User created!');
  });
};

addRunToDB('run888');

module.exports = addRunToDB;
