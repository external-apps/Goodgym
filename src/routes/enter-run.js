const enterRun = (req, res) => {
  res.render('run', {
    user: req.user,
    scripts: [
      '/scripts/enterRun.js'
    ]
  });
};

module.exports = enterRun;
