const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const Codes = require('../utils/utils');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
// const ForbiddenError = require('../errors/forbiddenError');
const CoflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => UserModel.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.status(Codes.Created).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((e) => {
      // console.log('e', e.statusCode);
      if (e.code === 11000) {
        next(new CoflictError(e.message));
      } else if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при регистрации пользователя'));
      } else {
        next(e);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Пользователь не существует.'));
      }
      // console.log('user', user.password, password);
      return bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (isValidPassword) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          return res.status(Codes.Ok).send({ token });
        }
        return next(new UnauthorizedError('Проверьте почту и пароль.'));
      });
    })
    .catch((err) => next(err));
};

const getUsers = (req, res, next) => {
  UserModel.find()
    .then((data) => res.status(Codes.Ok).send(data))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(Codes.Ok).send(user);
      }
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Пользователь не найден'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      return res.status(Codes.Ok).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      return res.status(Codes.Ok).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      }
      return next(err);
    });
};

const getMe = (req, res, next) => {
  UserModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет такого пользователя'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  login,
  getMe,
};
