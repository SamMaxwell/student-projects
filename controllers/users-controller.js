const { User } = require('../models');

const updateUser = (req, res, id, changes, errorMessage = 'could not update user') => {
  User
    .update(changes, { where: { id } })
    .then(() => {
      res.status(200).end();
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.update: ${message}`);
      res.status(500).json({ message: errorMessage });
    });
};

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

  updateUser(req, res, userId, { skills, accomplishments }, 'could not save profile');
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

const manageGet = (req, res) => {
  const {
    session: { isLoggedIn },
  } = req;

  User
    .findAll({
      order: [['name', 'ASC']],
    })
    .then((data) => {
      const users = data.map((user) => user.get({ plain: true }));
      const enabledUsers = users.filter((user) => user.isEnabled);
      const disabledUsers = users.filter((user) => !user.isEnabled);
      res.render('users/manage-users', { isLoggedIn, enabledUsers, disabledUsers });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { isLoggedIn, message: 'Users not found' });
    });
};

const userPut = (req, res) => {
  const { params: { id }, body: { password } } = req;

  if (password) res.status(405).json({ message: 'Cannot change password of a user.' });

  updateUser(req, res, id, req.body, 'could not update user');
};

const userDelete = (req, res) => {
  User
    .destroy({
      where: { id: req.params.id },
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
  myProfileGet,
  myProfilePost,
  userGet,
  manageGet,
  userPut,
  userDelete,
};
