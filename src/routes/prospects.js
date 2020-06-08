const routes = require('express').Router();
const prospectsCtrl = require('../controllers/prospects')
routes.get('/', prospectsCtrl.get );

module.exports = routes;