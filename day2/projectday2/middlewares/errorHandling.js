const {AppError}=require("../utils/errors")

const errorHandlingMiddleware=(err, req, res, next) => {
    // console.log(err.stack)
    //if (err instanceof NotFoundError || err instanceof BadRequestError) {
      if(err instanceof AppError){
       return res.status(err.statusCode).render('error', {
            title: 'Error',
            status:err.statusCode,
            message:err.message
        })
    }
    res.status(500).render('error',{
        title:'Error:',
        status:500,
        message:'Internal Server Error'
    })
}

module.exports={errorHandlingMiddleware}