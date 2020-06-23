const routes = require('express').Router();
const usersCtrl =  require('../controllers/users');
const validateUser = require('./middleware/validateUser');
const loadUser = require('./middleware/loadUsers');

routes.post('/sign-up' , usersCtrl.create);
routes.post('/sign-in' , usersCtrl.login);
routes.post('/logout', usersCtrl.logout);
routes.post('/validate-session', validateUser, usersCtrl.validateSession) 
routes.get('/list' , validateUser, usersCtrl.get);
routes.get('/:code' ,validateUser, loadUser , usersCtrl.getByCode);
routes.put('/:code' , validateUser, loadUser, usersCtrl.update)
routes.put('/:code', validateUser, loadUser , usersCtrl.remove)
module.exports = routes;