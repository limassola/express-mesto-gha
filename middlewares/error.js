const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const DuplicateError = require('../errors/duplicate-error');
const JWTError = require('../errors/jwt-error');
const AbstractError = require('../errors/abstract-error');
const InvalidAuth = require('../errors/invalid-auth');

const errorHandler = (err, req, res, next) => {
  console.log(err.statusCode);
  let error;
  if (err.code === 404) {
    error = new NotFoundError(err);
  } else if (err.code === 400) {
    error = new CastError(err);
  } else if (err.statusCode === 401) {
    error = new InvalidAuth(err);
  } else if (err.code === 11000) {
    error = new DuplicateError(err);
  } else if (err.code === 409) {
    error = new JWTError(err);
  } else {
    error = new AbstractError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
