const router = require('express').Router();
const { getCards, deleteCardByID, createCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', deleteCardByID);

router.post('/', createCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
