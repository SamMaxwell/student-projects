const dayjs = require('dayjs');

const LOCKOUT_FAILED_PASSWORD_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 5;

const deleteStatus = (lockoutStatuses, userEnteredName) => {
  const name = userEnteredName.toLowerCase();
  // eslint-disable-next-line no-param-reassign
  delete lockoutStatuses[name];
};

const getStatus = (lockoutStatuses, userEnteredName) => {
  const name = userEnteredName.toLowerCase();
  let status = lockoutStatuses[name];

  if (!status || status.lockoutUntil) status = { failedPasswordAttempts: 0 };
  // eslint-disable-next-line no-param-reassign
  lockoutStatuses[name] = status;

  return status;
};

const isUserLockedOut = (lockoutStatuses, userEnteredName) => {
  const name = userEnteredName.toLowerCase();
  const status = lockoutStatuses[name] || {};
  return status.lockoutUntil > new Date() ? [true, status.lockoutUntil] : [false];
};

const lockedOut = (name, log, res, until) => {
  log.info(`User ${name} login locked out until ${until.toISOString()}`);

  const totalSeconds = dayjs(until).diff(dayjs(), 's');
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  res
    .status(400)
    .json({
      message: `Your account has been locked out for ${minutes} minutes and  ${seconds} seconds`,
    });
};

const login = (req, res, user) => req
  .session
  .save((err) => {
    const { message } = err || {};
    if (message) {
      req.log.error(`req.session.save: ${message}`);
      res.status(500).json({ message: 'could not create new session' });
      return;
    }

    req.log.info(`User ${user.name} logged in`);

    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.isEnabled = user.isEnabled;
    req.session.isAdmin = user.isAdmin;
    req.session.isLoggedIn = true;

    res.json(user);
  });

const notLoggedIn = (res) => res
  .status(400)
  .json({ message: 'You entered an incorrect name or password' });

const userFailedPasswordValidation = (lockoutStatuses, name) => {
  const [isLockedOut] = isUserLockedOut(lockoutStatuses, name);
  if (isLockedOut) return;

  const status = getStatus(lockoutStatuses, name, true);

  status.failedPasswordAttempts += 1;

  if (status.failedPasswordAttempts === LOCKOUT_FAILED_PASSWORD_ATTEMPTS) {
    status.lockoutUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
  }
};

const userPassedPasswordValidation = deleteStatus;

module.exports = {
  getStatus,
  isUserLockedOut,
  lockedOut,
  login,
  notLoggedIn,
  userFailedPasswordValidation,
  userPassedPasswordValidation,
};
