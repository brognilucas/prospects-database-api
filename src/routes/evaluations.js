const routes = require('express').Router();

const validateUserMw = require('./middleware/validateUser');
const evaluationCtrl = require('../controllers/evaluations');
const loadEvaluation = require('./middleware/loadEvaluation');

routes.post('/', validateUserMw , evaluationCtrl.create);
routes.get('/prospect/:prospectCode' , evaluationCtrl.get );
routes.get('/:code', loadEvaluation , evaluationCtrl.getByCode); 
routes.put('/:code' , loadEvaluation , evaluationCtrl.update);
routes.delete('/:code' , loadEvaluation, evaluationCtrl.remove);
module.exports = routes;