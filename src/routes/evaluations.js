const routes = require('express').Router();

const validateUserMw = require('./middleware/validateUser');
const evaluationCtrl = require('../controllers/evaluations');
const loadProspect = require('./middleware/loadProspect')


routes.post('/', validateUserMw , evaluationCtrl.create)

module.exports = routes;