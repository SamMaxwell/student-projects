const { User } = require('../models');
const {
  isUserLockedOut, lockedOut, login, notLoggedIn,
  userFailedPasswordValidation, userPassedPasswordValidation,
} = require('../services/auth-services');

const lockoutStatuses = {};

const loginGet = (req, res) => {
  res.render('login');
};

const loginPost = (req, res) => {
  const { log, body: { name, password } } = req;

  const [isLockedOut, until] = isUserLockedOut(lockoutStatuses, name);

  if (isLockedOut) {
    lockedOut(name, log, res, until);
    return;
  }

  User
    .findOne({ where: { name } })
    .then((user) => {
      if (!user) {
        log.info(`User supplied unknown name ${name}`);
        return notLoggedIn(res);
      }

      return user.checkPassword(password);
    })
    .then(({ user, validPassword }) => {
      if (!validPassword) {
        if (validPassword === false) {
          log.info(`User with name ${name} supplied wrong password`);
        }

        userFailedPasswordValidation(lockoutStatuses, name);
        return notLoggedIn(res);
      }

      userPassedPasswordValidation(lockoutStatuses, name);
      return login(req, res, user);
    })
    .catch(({ message } = {}) => {
      log.error(`User.findOne: ${message}`);
      res.status(500).end();
    });
};

const logoutPost = ({ log, session }, res) => {
  if (session.isLoggedIn) {
    session.destroy(({ message } = {}) => {
      if (message) log.error(`session.destroy: ${message}`);
      else res.log.info(`User ${session.name} logged out`);
      res.status(204).end();
    });
  } else {
    log.info('logout attempted when not logged in');
    res.status(400).end();
  }
};

const signupPost = (req, res) => {
  const { log, body: { name, password } } = req;

  User
    .create({ name, password })
    .then((user) => login(req, res, user))
    .catch(({
      errors: [{ message: firstError } = ''] = [],
      message,
    } = {}) => {
      if (/name.*unique/i.test(firstError)) {
        log.info(`User attempted to signup with duplicate name ${name}`);
        res.status(400).send({ message: 'A user with the same name has already signed up' });
      } else if (/password.*rules/i.test(message)) {
        log.info('User entered password does not satisfy rules');
        res.status(400).send({ message });
      } else {
        log.error(`signup: ${message}`);
        res.status(500).end();
      }
    });
};

module.exports = {
  loginGet,
  loginPost,
  logoutPost,
  signupPost,
};
