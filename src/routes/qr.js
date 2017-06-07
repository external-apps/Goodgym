const qr = (req, res) => {
  res.render('qr', {
    scripts: [
      '/scripts/index.js',
      '/scripts/qr.js',
      '/scripts/yoti-init.js'
    ]
  });
};

module.exports = qr;
