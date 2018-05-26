const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');

// middleware to verify a token
router.use(middlewares.verifyToken);

router.get('/', function(req, res, next) {
    res.render('dashboard', {
        mobile: req.decoded.mobile,
        id: req.decoded.id,
        name: req.decoded.name,
        email: req.decoded.email
    });
});

module.exports = router;