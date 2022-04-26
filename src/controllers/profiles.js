
const Profile = require('../models/Profile');
const User = require('../models/User');

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require('path');


// @desc    Get all profiles of teachers
// @route   GET /profiles/teachers
// @access  Public
exports.getTeachersProfiles = asyncHandler(async (req, res, next) => {
    const teachers = await Profile.find({ user: { "$ne": req.user.id }});

    res.status(200).json({ success: true, data: teachers });
});

// @desc    Get my profile
// @route   GET /profiles/me
// @access  Private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;

    const me = await Profile.findOne({ user: req.body.user });

    res.status(200).json({ success: true, data: me });
});

// @desc    Create my profile
// @route   POST /profiles/me
// @access  Private
exports.createMyProfile = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;

    const profile = await Profile.create(req.body);

    res.status(201).json({
        success: true,
        data: profile 
    });
});

// @desc    Update my profile
// @route   PUT /profiles/me
// @access  Private
exports.updateMyProfile = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;

    let profile = await Profile.findOne({ user: req.body.user })

    if(!profile){
        return next(
            new ErrorResponse("해당 ID로 프로필을 찾을 수 없습니다", 404)
        );
    }

    profile = await Profile.findOneAndUpdate({ user: req.body.user }, req.body,{
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: req.body
    });
});


// @desc    Delete my profile
// @route   DELETE /profiles/me
// @access  Private
exports.deleteMyProfile = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;

    const profile = await Profile.findOne({ user: req.body.user });

    if(!profile){
        return next(
            new ErrorResponse("해당 ID로 프로필을 찾을 수 없습니다", 404)
        );
    }

    profile.remove();

    res.status(200).json({ success: true, data: req.body })
});



// @desc    Upload photo for bootcamp
// @route   PUT /profiles/upload/my/photo
// @access  Private 
exports.uploadProfilePhoto = asyncHandler(async (req, res) => {
    req.body.user = req.user.id;

    let file = req.body.photo.photo;

    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(
            new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
        );
    }

    file = file.uri;
    
    const profile = await Profile.findOneAndUpdate(
        { user:  req.body.user },
        { photo: { uri: file }}, 
        { runValidators: true}
    );

    res.status(200).json({ success: true, data: profile })
});

