const routes = require('express').Router();

const validateUserMw = require('./middleware/validateUser');
const prospectsCtrl = require('../controllers/prospects');
const loadProspect = require('./middleware/loadProspect')

routes.get('/', prospectsCtrl.get);
routes.get('/:code', validateUserMw, loadProspect, prospectsCtrl.getByCode)
routes.put('/:code', validateUserMw , loadProspect, prospectsCtrl.put)
routes.delete('/:code', validateUserMw, loadProspect, prospectsCtrl.remove);
routes.post('/', validateUserMw, prospectsCtrl.create);

module.exports = routes;