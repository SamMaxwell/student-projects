const routes = require('express').Router();
const authController = require('../../controllers/auth-controller');

routes.get('/login', authController.loginGet);
routes.post('/login', authController.loginPost);
routes.get('/logout', authController.logoutGet);
routes.post('/signup', authController.signupPost);

module.exports = () => routes;
