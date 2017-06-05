const enterRun = (req, res) => {
  res.render('run', {
    scripts: [
      '/scripts/enterRun.js'
    ]
  });
};

module.exports = enterRun;
