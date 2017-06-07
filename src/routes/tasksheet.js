const getRun = require('../helpers/get-run-from-goodgym.js');

const taskSheet = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) {
        console.error(err);
        res.render('error', { error: 'No run found in our database!' });
        return;
      }
      res.render('task-sheet', {
        run: run,
        scripts: [
          '/scripts/task-sheet.js'
        ]
      });
    });
  }
};

module.exports = taskSheet;
