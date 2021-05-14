const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const mustBeAdmin = require('../../middleware/auth/must-be-admin');
const manageController = require('../../controllers/manage-controller');

routes.get('/manage', mustBeLoggedIn, mustBeAdmin, manageController.manageUsers);
routes.put('/manage/enable', mustBeLoggedIn, mustBeAdmin, manageController.enableUser);
routes.put('/manage/disable', mustBeLoggedIn, mustBeAdmin, manageController.disableUser);
routes.delete('/manage/delete', mustBeLoggedIn, mustBeAdmin, manageController.deleteUser);

module.exports = () => routes;
