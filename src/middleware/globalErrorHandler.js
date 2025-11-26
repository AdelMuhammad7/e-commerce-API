
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
          res.status(err.statusCode).json({ 
            status : err.status,
            message : err.message          
          })
        }
    })
}


// this function can use in more sitiuation
// we are creating an error and send it to global error handel middleware
export function ApiError(message, statusCode) {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;

  return error;
}


// class ApiError extends Error {
//     constructor (message , statusCode) {
//         super(message)
//         this.statusCode = statusCode
//         this.status = `${statusCode}`.startsWith(4) ? "fail" : "error"
//         this.isOperational = true
//     }
// }