module.exports = {
  index: ({ session: { isLoggedIn, isEnabled } = {} }, res) => {
    if (!isLoggedIn) {
      res.redirect('/auth/login');
    } else if (!isEnabled) {
      res.redirect('/users/my-profile');
    } else {
      res.render('home', { isLoggedIn });
    }
  },
};
