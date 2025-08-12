class AppError extends Error{
    constructor(message,statusCode){
        super(message)
        this,statusCode=statusCode
    }
}


class NotFoundError extends AppError{
    constructor(message){
        super(message)
        this.statuscode=404
    }
}

class BadRequestError extends AppError{
    constructor(message){
        super(message)
        this.statusCode=400
    }
}

module.exports={AppError, NotFoundError,BadRequestError}