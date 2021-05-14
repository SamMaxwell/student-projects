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
  User
    .update({
      isEnabled: 1,
    }, {
      where: { id: req.body.userid },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.update: ${message}`);
      res.status(500).json({ message: 'could not update enable' });
    });
};

const disableUser = (req, res) => {
  User
    .update({
      isEnabled: 0,
    }, {
      where: { id: req.body.userid },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.update: ${message}`);
      res.status(500).json({ message: 'could not update disable' });
    });
};

const deleteUser = (req, res) => {
  User
    .destroy({
      where: { id: req.body.userid },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.delete: ${message}`);
      res.status(500).json({ message: 'could not delete user' });
    });
};

module.exports = {
  manageUsers,
  enableUser,
  disableUser,
  deleteUser,
};
