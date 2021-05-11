const routes = require('express').Router();
const dayjs = require('dayjs');
const { User } = require('../../models');
const { login } = require('../../utils');

const LOCKOUT_FAILED_PASSWORD_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 5;

const lockoutStatuses = {};

const isUserLockedOut = (userEnteredName) => {
  const name = userEnteredName.toLowerCase();
  const status = lockoutStatuses[name] || {};
  return status.lockoutUntil > new Date() ? [true, status.lockoutUntil] : [false];
};

const getStatus = (userEnteredName) => {
  const name = userEnteredName.toLowerCase();
  let status = lockoutStatuses[name];

  if (!status || status.lockoutUntil) status = { failedPasswordAttempts: 0 };
  lockoutStatuses[name] = status;

  return status;
};

const deleteStatus = (userEnteredName) => {
  const name = userEnteredName.toLowerCase();
  delete lockoutStatuses[name];
};

const userFailedPasswordValidation = (name) => {
  const [isLockedOut] = isUserLockedOut(name);
  if (isLockedOut) return;

  const status = getStatus(name, true);

  status.failedPasswordAttempts += 1;

  if (status.failedPasswordAttempts === LOCKOUT_FAILED_PASSWORD_ATTEMPTS) {
    status.lockoutUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
  }
};

const userPassedPasswordValidation = deleteStatus;

const notLoggedIn = (res) => res
  .status(400)
  .json({ message: 'You entered an incorrect name or password' });

const lockedOut = (name, log, res, until) => {
  log.info(`User ${name} login locked out until ${until.toISOString()}`);

  const seconds = dayjs(until).diff(dayjs(), 's');

  res
    .status(400)
    .json({ message: `Your account has been locked out for ${Math.floor(seconds / 60)} minutes and  ${seconds % 60} seconds` });
};

routes.post('/login', (req, res) => {
  const { log, body: { name, password } } = req;

  const [isLockedOut, until] = isUserLockedOut(name);

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

        userFailedPasswordValidation(name);
        return notLoggedIn(res);
      }

      userPassedPasswordValidation(name);
      return login(req, res, user);
    })
    .catch(({ message } = {}) => {
      log.error(`User.findOne: ${message}`);
      res.status(500).end();
    });
});

routes.post('/logout', ({ log, session }, res) => {
  if (session.loggedIn) {
    session.destroy(({ message } = {}) => {
      if (message) log.error(`session.destroy: ${message}`);
      else res.log.info(`User ${session.name} logged out`);
      res.status(204).end();
    });
  } else {
    log.info('logout attempted when not logged in');
    res.status(404).end();
  }
});

module.exports = () => routes;
