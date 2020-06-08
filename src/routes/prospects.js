const routes = require('express').Router();
const validateUserMw = require('./middleware/validateUser')
const prospectsCtrl = require('../controllers/prospects')
routes.get('/', prospectsCtrl.get);
routes.post('/' , validateUserMw , prospectsCtrl.create);

module.exports = routes;