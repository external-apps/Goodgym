const addRunnerToDatabase = require('../database/db-add-runner');

const postRunner = (req, res) => {
  if (process.env.NODE_ENV === 'testing') {
    res.send().status(200);
    return;
  }
  const body = req.body;
  addRunnerToDatabase(body, (err) => {
    if (err) {
      console.log(err);
      res.json('POST request not made!');
    } else {
      res.json('Runner added to database');
    }
  });
};

module.exports = postRunner;
