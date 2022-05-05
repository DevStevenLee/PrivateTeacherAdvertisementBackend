
const express = require('express');

const {
    hasEmail,
    signup,
    signin,
    refresh
} = require('../controllers/auth');
const router = express.Router();


router.route('/has/email').post(hasEmail);
router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/refresh').post(refresh);

module.exports = router;