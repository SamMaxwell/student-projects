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

const getManage = (req, res) => {
  const {
    session: { isLoggedIn },
  } = req;

  console.log(`\n\n\n\n\nGET MANAGE\n\n\n\n\n`);
  User
    .findAll({
      order: [['name', 'ASC']],
    })
    .then((data) => {
      console.log(data);
      const users = data.map((user) => user.get({ plain: true }));
      const enabledUsers = users.filter((user) => user.isEnabled);
      const disabledUsers = users.filter((user) => !user.isEnabled);
      console.log(enabledUsers);
      console.log(disabledUsers);
      res.render('users/manage-users', { isLoggedIn, enabledUsers, disabledUsers });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findAll: ${message}`);
      res.render('error', { isLoggedIn, message: 'Users not found' });
    });
};

const putUser = (req, res) => {
  if (req.body.password) res.status(405).json({ message: 'Cannot change password of a user.' });

  User
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.update: ${message}`);
      res.status(500).json({ message: 'could not update isEnabled for putUser' });
    });
};

const deleteUser = (req, res) => {
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
  getManage,
  putUser,
  deleteUser,
};
