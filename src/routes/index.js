const router = require('express').Router();
const prospectsRoute = require('./prospects');
const usersRoute = require('./users');
const evaluationRouter = require('./evaluations');
router.get('/', (req, res) => {
    throw 'Illegal request'
});
router.use('/users', usersRoute);
router.use('/prospects', prospectsRoute);
router.use('/evaluations', evaluationRouter)
module.exports = router;
