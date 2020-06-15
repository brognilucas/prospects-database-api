const routes = require('express').Router();
const usersCtrl =  require('../controllers/users');

routes.post('/sign-up' , usersCtrl.create)
routes.post('/sign-in' , usersCtrl.login)

module.exports = routes;