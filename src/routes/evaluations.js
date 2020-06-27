const routes = require('express').Router();

const validateUserMw = require('./middleware/validateUser');
const evaluationCtrl = require('../controllers/evaluations');
const loadEvaluation = require('./middleware/loadEvaluation');

routes.post('/', validateUserMw , evaluationCtrl.create);
routes.get('/prospect/:prospectId' , evaluationCtrl.get );
routes.get('/:id', loadEvaluation , evaluationCtrl.getById); 
routes.put('/:id' , loadEvaluation , evaluationCtrl.update);
routes.delete('/:id' , loadEvaluation, evaluationCtrl.remove);
module.exports = routes;