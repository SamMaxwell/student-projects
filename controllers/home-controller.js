module.exports = {
  index: ({ session: { isLoggedIn, isEnabled } = {} }, res) => {
    if (!isLoggedIn) {
      res.redirect('/login');
    } else if (!isEnabled) {
      res.redirect('/profile', { isEnabled });
    } else {
      res.render('home', { isLoggedIn });
    }
  },
  login: (req, res) => {
    res.render('login');
  },
};
