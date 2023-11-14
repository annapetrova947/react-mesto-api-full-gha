const CardModel = require('../models/card');
const Codes = require('../utils/utils');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = (req, res, next) => CardModel.find()
  .then((cards) => res.status(Codes.Ok).send(cards))
  .catch((err) => next(err));

const createCard = (req, res, next) => {
  const cardData = req.body;
  cardData.owner = req.user._id;

  return CardModel.create(cardData)
    .then(
      (card) => res.status(Codes.Ok).send({ data: card }),
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  CardModel.findById(cardId)
    .then((card) => {
      if (card) {
        const owner = card.owner.toString();
        if (req.user._id === owner) {
          return CardModel.deleteOne(card)
            .then(() => res.send(card))
            .catch((err) => next(err));
        }
        return next(new ForbiddenError('Нельзя удалять карточку другого пользователя'));
      }
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные карточки.'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((data) => {
      if (data) {
        return res.status(Codes.Ok).send(data);
      }
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные карточки.'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) {
        return res.status(Codes.Ok).send(data);
      }
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки.'));
      }
      next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
