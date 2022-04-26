
const express = require('express');

const {
    hasEmail,
    signup,
    signin
} = require('../controllers/auth');
const router = express.Router();


router.route('/has/email').post(hasEmail);
router.route('/signup').post(signup);
router.route('/signin').post(signin);

module.exports = router;