const { User } = require('../models');

const myProfileGet = (req, res) => {
  const {
    session: { userId, isEnabled, isLoggedIn },
  } = req;

  User
    .findByPk(userId)
    .then(({ skills, accomplishments }) => {
      res.render('users/my-profile', {
        isLoggedIn, isEnabled, skills, accomplishments,
      });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findByPk: ${message}`);
      res.render('error', { isLoggedIn, message: 'User not found' });
    });
};

const myProfilePost = (req, res) => {
  const {
    body: { skills, accomplishments },
    session: { userId },
  } = req;

  User
    .update({
      skills,
      accomplishments,
    }, {
      where: { id: userId },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.update: ${message}`);
      res.status(500).json({ message: 'could not save profile' });
    });
};

const userGet = (req, res) => {
  const {
    params: { id },
    session: { isLoggedIn },
  } = req;

  User
    .findByPk(id)
    .then(({ name, skills, accomplishments }) => {
      res.render('users/user', {
        isLoggedIn, name, skills, accomplishments,
      });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findByPk: ${message}`);
      res.render('error', { isLoggedIn, message: 'User not found' });
    });
};

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

module.exports = {
  myProfileGet,
  myProfilePost,
  userGet,
  manageUsers,
};
