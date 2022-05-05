const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const router = require('../routes/auth');
const { TokenExpiredError } = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Check whether email exists or not.
// @route   POST /auth/has/email
// @access  Public
exports.hasEmail = asyncHandler(async (req, res, next) => {
    const { email }  = req.body;

    console.log(req.body);

    if (!email){
        return next(
            new ErrorResponse("이메일을 입력해주세요.", 400)
        );
    }

    const user = await User.findOne({ email: email}).select('+password').lean();
    

    const hasEmail = user ? true : false;

    console.log(hasEmail);

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

    sendTokensResponse(user, 200, res);
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

    sendTokensResponse(user, 200, res);
});

// @desc    Refresh tokens
// @route   POST /auth/refresh
// @access  Public
exports.refresh = asyncHandler( async (req, res, next) => {
    const { refreshToken } = req.body;

    
    //console.log("it's not verified");
    
    if(!refreshToken){
        return next(new ErrorResponse("접근 권한이 필요합니다.", 403));
    }


    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
       
        if(err instanceof TokenExpiredError){
            return next(new ErrorResponse("refresh_token_is_expired", 403));
        } else if(err){
            return next(new ErrorResponse("접근 권한이 없습니다.", 403));
        }
        
        const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRE
        });

        
        //console.log("it's verified");

        //console.log("access token", accessToken);
        res.status(200).json({
            accessToken
        });
    });

})


// Get token from model, create cookie and send response
const sendTokensResponse = (user, statusCode, res) => {
    // Create token
    const accessToken = user.getAccessJwtToken();
    const refreshToken = user.getRefreshToken();

    res
        .status(statusCode)
        .json({
            success: true,
            accessToken,
            refreshToken
        });
};