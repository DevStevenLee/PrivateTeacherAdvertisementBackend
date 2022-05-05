
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const { TokenExpiredError } = require('jsonwebtoken');

const catchError = (err, next) => {
    if(err instanceof TokenExpiredError){
        console.log('token is expired');
        return next(new ErrorResponse("access_token_is_expired", 403));
    }

    return next(new ErrorResponse("접근 권한이 없습니다.", 403));
}

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let accessToken;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        accessToken = req.headers.authorization.split(' ')[1];
    }

    if(!accessToken){
        return next(
            new ErrorResponse('접근 권한이 없습니다.', 401)
        );
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
        if(err){
            return catchError(err, next);
        }

        req.user = await User.findById(decoded.id);
        next();
    });
});