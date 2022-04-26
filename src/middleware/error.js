const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log(error);
    console.log(err.name);

    if(err.name === 'CastError'){
        const message = `해당 ID를 찾을 수 없습니다. ${ err.value }`;
        error = new ErrorResponse(message, 404);
    }

    if(err.name === 'ReferenceError'){
        const message = `ErrorResponse가 규정되지 않았습니다.`;
        error = new ErrorResponse(message, 422);
    }

    if(err.code === 11000){
        const message = `필드의 동일한 값이 입력되었습니다.`;
        error = new ErrorResponse(message, 400);
    }

    if(err.name === 'ValidationError'){
        const message = Object.values(error.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });

}   

module.exports = errorHandler;