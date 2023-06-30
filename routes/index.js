const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const handleInvalidPath = (req, res, next) => {
  const error = new NotFoundError('Invalid Path');
  next(error);
};

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use(handleInvalidPath);

module.exports = router;
