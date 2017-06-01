module.exports = (req, res, next) => {
  console.log(req.isAuthenticated(), 'req from middleware');
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};
