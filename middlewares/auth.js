const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    return res.status(401).send({ message: 'Требуется авторизация' });
  }

  try {
    // eslint-disable-next-line dot-notation
    payload = jwt.verify(token, process.env['JWT_SECRET']);
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
