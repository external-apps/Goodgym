// const getRun = require('../helpers/get-run-from-goodgym');

// const taskSheet = (req, res) => {
//   const paramId = req.params.id;
//   if (paramId !== 'favicon.ico') {
//     getRun(paramId, (err, run) => {
//       if (err) {
//         console.error(err);
//         res.render('error', { error: 'No run found in our database!' });
//         return;
//       }
//       res.render('task-sheet', {
//         run: run
//       });
//     });
//   }
// };
const apiKey = process.env.API_KEY;

const taskSheet = (req, res) => {
  res.render('task-sheet', {
    apiKey: apiKey,
    scripts: [
      '/scripts/home.js',
      '/scripts/google-maps.js',
      '/scripts/index.js'
    ]
  });
};

module.exports = taskSheet;
