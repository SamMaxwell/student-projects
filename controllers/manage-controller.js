const { User } = require('../models');

const manageUsers = (req, res) => {
  User
    .findAll({
      order: [['name', 'ASC']],
    //   where: { isEnabled: 0 },
    })
    .then((users) => {
      const statuses = users.map((user) => user.get({ plain: true }));
      res.render('users/manage-users', { users: statuses });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { message: 'Users not found' });
    });
};

const enableUser = (req, res) => {
  User.findByPk(req.body.userid).then((user) => {
    res.json(user);
  })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { message: 'Users not found' });
    });
};

const disableUser = (req, res) => {
  User.findByPk(req.body.userid).then((user) => {
    res.json(user);
  })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { message: 'Users not found' });
    });
};

const deleteUser = (req, res) => {
  User.findByPk(req.body.userid).then((user) => {
    res.json(user);
  })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { message: 'Users not found' });
    });
};

module.exports = {
  manageUsers,
  enableUser,
  disableUser,
  deleteUser,
};
