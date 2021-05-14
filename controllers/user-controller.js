const { User } = require('../models');

const getNotIsEnabled = (req, res) => {
  User
    .findAll({
      order: [['name', 'ASC']],
      where: { isEnabled: 0 },
    })
    .then((users) => {
      const disabled = users.map((user) => user.get({ plain: true }));
      res.render('users', { users: disabled });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { message: 'Users not found' });
    });
};

module.exports = {
  getNotIsEnabled,
};
