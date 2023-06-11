const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
