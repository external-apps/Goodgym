const apiKey = process.env.API_KEY;

const taskSheet = (req, res) => {
  res.render('home', {
    apiKey: apiKey,
    scripts: [
      '/scripts/index.js',
      '/scripts/tasksheet.js',
      '/scripts/home.js',
      '/scripts/google-maps.js'
    ]
  });
};

module.exports = taskSheet;
