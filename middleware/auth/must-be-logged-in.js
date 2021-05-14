const mustBeLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

module.exports = mustBeLoggedIn;
