const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

const avatarRegex = /^(http|https):\/\/(www.\.)?[a-zA-z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    about: Joi.string().min(2).required().max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(avatarRegex).required(),
  }),
}), updateUserAvatar);

module.exports = router;
