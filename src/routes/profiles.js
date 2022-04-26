
const express = require('express');
const {
    getTeachersProfiles,
    getMyProfile,
    createMyProfile,
    updateMyProfile,
    deleteMyProfile,
    uploadProfilePhoto
} = require('../controllers/profiles');

const router = express.Router()

const { protect } = require('../middleware/auth');

router 
    .route('/teachers')
    .get(protect, getTeachersProfiles);

router
    .route('/me')
    .get(protect, getMyProfile)
    .post(protect, createMyProfile)
    .put(protect, updateMyProfile)
    .delete(protect, deleteMyProfile);

router
    .route('/upload/my/photo')
    .put(protect, uploadProfilePhoto);

module.exports = router;