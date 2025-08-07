const {AppError}=require("../utils/errors")

const errorHandlingMiddileware=(err, req, res, next) => {
    // console.log(err.stack)
    //if (err instanceof NotFoundError || err instanceof BadRequestError) {
      if(err instanceof AppError){
      res.status(err.statusCode).render('error', {
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

module.exports={errorHandlingMiddileware}