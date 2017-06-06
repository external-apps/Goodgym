const authMiddleware = (req, res, next) => {
  console.log(req.isAuthenticated(), 'req from middleware');
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
