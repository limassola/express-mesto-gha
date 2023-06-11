const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
};

const deleteCardByID = (req, res) => {
  // eslint-disable-next-line no-shadow
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: ' Карточка с указанным _id не найдена' });
      } else {
        res.status(400).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

const createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(400).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: ' Карточка с указанным _id не найдена' });
      } else {
        res.status(400).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: ' Карточка с указанным _id не найдена' });
      } else {
        res.status(400).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

module.exports = {
  getCards,
  deleteCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
