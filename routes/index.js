const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');

const handleInvalidPath = (req, res) => {
  res.status(404).send({ message: 'Invalid Path' });
};

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use(handleInvalidPath);

module.exports = router;
