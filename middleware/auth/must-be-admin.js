const mustBeAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    res.redirect('/users/my-profile');
  } else {
    next();
  }
};

module.exports = mustBeAdmin;
