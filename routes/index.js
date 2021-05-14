const router = require('express').Router();
const { getRoutes } = require('../utils');
const homeController = require('../controllers/home-controller');

module.exports = (logger) => {
  router.get('/', homeController.index);
<<<<<<< HEAD
=======
  router.get('/login', homeController.login);
  router.get('/user', userController.userEnabled);
>>>>>>> 7ac3005 (Added admin middleware, change duplicate higher route not-is-enabled to /user)
  router.use(getRoutes(logger, __dirname, __filename));
  return router;
};