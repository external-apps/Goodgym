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
