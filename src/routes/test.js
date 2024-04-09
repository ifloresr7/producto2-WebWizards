const express = require('express');
const { homepage } = require('../controllers/homepage');
const router = express.Router();

// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
//   });

router.get('/', homepage);

router.get('/1', homepage);

module.exports = router;
