const router = require('express').Router();
const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', getUserById);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
