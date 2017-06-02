const qr = (req, res) => {
  res.render('qr', {
    scripts: [
      '/scripts/index.js',
      '/scripts/qr.js'
    ]
  });
};

module.exports = qr;
