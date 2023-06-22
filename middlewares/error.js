const errorHandler = (err, req, res, next) => {
  let statusCode = err.code || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Переданы некорректные данные';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Некорректные данные при создании карточки';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Email уже зарегистрирован';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  res.status(statusCode).send({message});
};

module.exports = errorHandler;
