// this function can use in more sitiuation
// we are creating an error and send it to global error handel middleware
export function ApiError(message, statusCode) {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;

  return error;
}

const handelJWTInvaildSignature = () => {
  return  new ApiError('Invaild token , please login..' , 401)
}

const handelJWTExpiredTokent = () => {
  return new ApiError('Expired token , please login..' , 401)
}


// global error handel middleware
export function errorHandler (app) {
    app.use((err ,req , res , next)=> {
        err.statusCode = err.statusCode || 500
        err.status = err.status || 'error'

        if(process.env.NODE_ENV == "development"){
          res.status(err.statusCode).json({ 
            status : err.status,
            message : err.message,
            error : err,
            stack : err.stack // give me as a backend where error happen 
          })
        }else {
          if(err.name == 'JsonWebTokenError') err = handelJWTInvaildSignature()
          if(err.name == 'TokenExpiredError') err = handelJWTExpiredTokent()
          res.status(err.statusCode).json({ 
            status : err.status,
            message : err.message          
          })
        }
    })
}


