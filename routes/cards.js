/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCardByID, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const LINK_REGEXP = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,\/;=]{2,256}\.[a-zA-Z0-9.\/?#-]{2,}$/;

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardByID);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    link: Joi.string().regex(LINK_REGEXP).required(),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = router;
