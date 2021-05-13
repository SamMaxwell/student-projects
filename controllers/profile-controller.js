const { User } = require('../models');

const profileGet = (req, res) => {
  const {
    session: { userId, isEnabled },
  } = req;

  User
    .findByPk(userId)
    .then(({ skills, accomplishments }) => {
      res.render('profile', { isEnabled, skills, accomplishments });
    })
    .catch(({ message } = {}) => {
      req.log.error(`User.findByPk: ${message}`);
      res.render('error', { message: 'User not found' });
    });
};

const profilePost = (req, res) => {
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
  profileGet,
  profilePost,
};
