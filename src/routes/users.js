const routes = require('express').Router();
const usersCtrl =  require('../controllers/users');

routes.post('/sign-up' , usersCtrl.create)
routes.post('/sign-in' , usersCtrl.login)
routes.post('/logout', usersCtrl.logout)
module.exports = routes;