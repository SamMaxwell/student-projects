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

module.exports = {
  myProfileGet,
  myProfilePost,
};
