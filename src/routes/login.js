const login = (req, res) => {
  res.render('login', {
    scripts: [
      '/scripts/login.js'
    ]
  });
};

module.exports = login;
