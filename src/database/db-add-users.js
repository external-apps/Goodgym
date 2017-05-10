const GoodGymDB = require('./db-connection');

const addUserToDB = (inputRun) => {
  let newRun = GoodGymDB({
    run: inputRun
  });

  newRun.save(function (err) {
    if (err) throw err;
    console.log('User created!');
  });
};

addUserToDB('run999');

module.exports = addUserToDB;
