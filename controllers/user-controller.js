const { User } = require('../models');

const userEnabled = (req, res) => {
  const {
    session: { userId },
  } = req;

  User
    .findByPk(userId)
    .then(({ isEnabled }) => {
      res.render('user', { isEnabled });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findByPk: ${message}`);
      res.render('error', { message: 'User not found' });
    });
};

module.exports = {
  userEnabled,
};
