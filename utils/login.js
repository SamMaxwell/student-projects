const login = (req, res, user) => req
  .session
  .save((err) => {
    const { message } = err || {};
    if (message) {
      req.log.error(`req.session.save: ${message}`);
      res.status(500).json({ message: 'could not create new session' });
      return;
    }

    req.log.info(`User ${user.name} logged in`);

    req.session.userId = user.id;
    req.session.name = user.name;
    req.session.isEnabled = user.isEnabled;
    req.session.isAdmin = user.isAdmin;
    req.session.loggedIn = true;

    res.json(user);
  });

module.exports = login;
