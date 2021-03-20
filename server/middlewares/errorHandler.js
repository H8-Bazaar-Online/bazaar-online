function errorHandler(err, req, res, next) {
  console.log(err.name, '<<<<<< HANDLER');
  let errMsg = [];
  let status = 500;

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' && err.errors.length > 0) {
    err.errors.forEach(err => errMsg.push(err.message));
    status = 400;

  } else if(err.name === 'JsonWebTokenError') {
    errMsg.push(err.message);
    status = err.status

  } else if (err.name === 'CustomError') {
    errMsg.push(err.message);
    status = err.status;
  } else {
    errMsg.push('Internal Server Error')
  }
  // console.log(errMsg, 'ERROR HANDLER');
  res.status(status).json({ message: errMsg});
}

module.exports = errorHandler;