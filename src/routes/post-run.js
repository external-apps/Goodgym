const addToDatabase = require('../database/db-add-run');

const postRun = (req, res) => {
  if (process.env.NODE_ENV === 'testing') {
    res.send().status(200);
    return;
  }
  const body = req.body;
  addToDatabase(body, (err) => {
    if (err) {
      console.log(err);
      res.json('POST request not made!');
    } else {
      res.json('Run added to database');
    }
  });
};

module.exports = postRun;
