const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const profileController = require('../../controllers/profile-controller');

routes.get('/', mustBeLoggedIn, profileController.profileGet);
routes.post('/', mustBeLoggedIn, profileController.profilePost);

module.exports = () => routes;
