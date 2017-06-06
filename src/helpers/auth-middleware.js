const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.returnTo = req.url;
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
