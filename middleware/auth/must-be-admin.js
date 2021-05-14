const mustBeAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    res.redirect('/profile');
  } else {
    next();
  }
};

module.exports = mustBeAdmin;
