const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const router = require('../routes/auth');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Check whether email exists or not.
// @route   POST /auth/has/email
// @access  Public
exports.hasEmail = asyncHandler(async (req, res, next) => {
    const { email }  = req.body;

    if (!email){
        return next(
            new ErrorResponse("이메일을 입력해주세요.", 400)
        );
    }

    const user = await User.findOne({ email: email}).select('+password');
    

    const hasEmail = user ? true : false;


    res.status(201).json({
      success: true,
      data: hasEmail
    });
});


// @desc    Create new user.
// @route   POST /auth/signup
// @access  Public
exports.signup = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    sendTokenResponse(user, 200, res);
});

// @desc    Register user
// @route   POST /auth/signin
// @access  Public
exports.signin = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;


    // Validate email & password
    if(!email || !password){
        return next(
            new ErrorResponse('이메일과 비밀번호를 입력해주세요', 400)
        );
    }

    const user = await User.findOne({ email: email }).select('+password');


    if(!user){
        return next(
            new ErrorResponse('유효하지 않은 계정입니다', 401)
        );
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(
            new ErrorResponse('Invalid credentials', 401)
        );
    }

    sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    res
        .status(statusCode)
        .json({
            success: true,
            token
        });
};