const { User } = require('../models');

const getNotIsEnabled = (req, res) => {
  User
    .findAll({
      order: 'id ASC',
      where: { isEnabled: false },
    })
    .then((users) => {
      res.render('user', users);
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { message: 'User not found' });
    });
};

module.exports = {
  getNotIsEnabled,
};
