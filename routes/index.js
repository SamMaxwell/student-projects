const router = require('express').Router();
const { getRoutes } = require('../utils');
const homeController = require('../controllers/home-controller');
<<<<<<< HEAD
=======
// const userController = require('../controllers/user-controller');
>>>>>>> 21e9a5f (removed admin lock temporarily, added short error handlebar, fixed user controller sending sorted name isNotEnabled)

module.exports = (logger) => {
  router.get('/', homeController.index);
<<<<<<< HEAD
=======
  router.get('/login', homeController.login);
<<<<<<< HEAD
  router.get('/user', userController.userEnabled);
>>>>>>> 7ac3005 (Added admin middleware, change duplicate higher route not-is-enabled to /user)
=======
  // router.get('/user', userController.userEnabled);
>>>>>>> 21e9a5f (removed admin lock temporarily, added short error handlebar, fixed user controller sending sorted name isNotEnabled)
  router.use(getRoutes(logger, __dirname, __filename));
  return router;
};