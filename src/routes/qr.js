const qr = (req, res) => {
  res.render('qr', {
    user: req.user,
    appId: process.env.APP_ID,
    scenarioId: process.env.SCENARIO_ID,
    scripts: [
      '/scripts/index.js',
      '/scripts/qr.js',
      '/scripts/yoti-init.js'
    ]
  });
};

module.exports = qr;
