module.exports = {
  index: ({ session: { isLoggedIn, isEnabled } = {} }, res) => {
    if (!isLoggedIn) {
      res.redirect('/login');
    } else if (!isEnabled) {
      res.render('not-enabled', {
        isLoggedIn,
      });
    } else {
      res.render('home', {
        isLoggedIn,
      });
    }
  },
  login: (req, res) => {
    res.render('login');
  },
};
