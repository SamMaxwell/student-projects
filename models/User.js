const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db');

class User extends Model {
  checkPassword(password) {
    return bcrypt
      .compare(password, this.password)
      .then((validPassword) => ({ user: this, validPassword }));
  }
}

const validatePassword = (password) => {
  const rules = [
    ['\\d', 'contains at least one numeric digit'],
    ['[a-z]', 'contains at least one lower case alphabetic character'],
    ['[A-Z]', 'contains at least one upper case alphabetic character'],
    ['[`~!@#$%^&*()-_=+{}[\\]|;:\'",<.>/? ]', 'contains at least one special character'],
  ];

  const totalSatisfied = rules
    .reduce(
      (satisfied, [pattern]) => satisfied + ((new RegExp(pattern)).test(password) ? 1 : 0),
      0,
    );

  if (password.length < 8 || password.length > 32 || totalSatisfied < 3) {
    throw new Error('password does not satisfy eligibility rules');
  }
};

const hash = (loginPassword, user) => bcrypt
  .hash(loginPassword, 10)
  .then((password) => {
    // eslint-disable-next-line no-param-reassign
    user.password = password;
    return user;
  });

const hook = ({ create } = {}) => (user) => {
  if (!user.password) {
    if (create) throw new Error('password is required');
    return user;
  }
  validatePassword(user.password);
  return hash(user.password, user);
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  skills: {
    type: DataTypes.STRING(2000),
  },
  accomplishments: {
    type: DataTypes.STRING(2000),
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  hooks: {
    beforeCreate: hook({ create: true }),
    beforeUpdate: hook(),
  },
  sequelize: db,
});

module.exports = User;
