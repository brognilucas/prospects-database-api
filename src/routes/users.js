const routes = require('express').Router();
const usersCtrl =  require('../controllers/users');

routes.post('/' , usersCtrl.create)