const routes = require('express').Router();
const authController = require('../../controllers/auth-controller');

routes.post('/login', authController.loginPost);
routes.post('/logout', authController.logoutPost);
routes.post('/signup', authController.signupPost);

module.exports = () => routes;
