const router = require('express').Router();
const { getRoutes } = require('../utils');
const homeController = require('../controllers/home-controller');
const userController = require('../controllers/user-controller');

module.exports = (logger) => {
  router.get('/', homeController.index);
  router.get('/login', homeController.login);
  router.get('/user', userController.userEnabled);
  router.use(getRoutes(logger, __dirname, __filename));
  return router;
};
