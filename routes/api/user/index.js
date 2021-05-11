const userRoutes = require('express').Router();
const { User } = require('../../../models');
const { login } = require('../../../utils');

userRoutes.post('/', (req, res) => User
  .create({
    name: req.body.name,
    password: req.body.password,
  })
  .then((user) => login(req, res, user))
  .catch(({ message } = {}) => {
    req.log.error(`User.create: ${message}`);
    res.status(500).json({ message: 'could not create new user' });
  }));

userRoutes.post('/:id', (req, res) => User
  .update({
    name: req.body.name,
    password: req.body.password,
  })
  .then((user) => login(req, res, user))
  .catch(({ message } = {}) => {
    req.log.error(`User.create: ${message}`);
    res.status(500).json({ message: 'could not update user' });
  }));

module.exports = () => userRoutes;
