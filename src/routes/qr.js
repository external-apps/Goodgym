const qr = (req, res) => {
  res.render('qr', {
    user: req.user,
    scripts: [
      '/scripts/index.js',
      '/scripts/qr.js',
      '/scripts/yoti-init.js'
    ]
  });
};

module.exports = qr;
