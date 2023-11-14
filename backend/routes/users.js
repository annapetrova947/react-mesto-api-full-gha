const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

const urlTemplate = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(urlTemplate)
      .required(),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
