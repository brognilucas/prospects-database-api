const router = require('express').Router();
const prospectsRoute = require('./prospects');
router.get('/', (req, res) => {
    throw 'Illegal request'
});

router.use('/prospects', prospectsRoute);

module.exports = router;
