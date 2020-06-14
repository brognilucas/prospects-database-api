const router = require('express').Router();
const prospectsRoute = require('./prospects');
const usersRoute = require('./users');

router.get('/', (req, res) => {
    throw 'Illegal request'
});
router.use('/users', usersRoute);
router.use('/prospects', prospectsRoute);
module.exports = router;
