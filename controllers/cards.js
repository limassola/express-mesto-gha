const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCardByID = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then(() => {
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
