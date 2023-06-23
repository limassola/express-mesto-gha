const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const DuplicateError = require('../errors/duplicate-error');
const InvalidAuth = require('../errors/invalid-auth');
const AbstractError = require('../errors/abstract-error');

const errorHandler = (err, req, res, next) => {
  let error;

  if (err instanceof NotFoundError) {
    error = err;
  } else if (err instanceof CastError) {
    error = err;
  } else if (err instanceof InvalidAuth) {
    error = err;
  } else if (err instanceof DuplicateError) {
    error = err;
  } else {
    error = new AbstractError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
