const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const auth = (req, res, next) => {
  const authtorization = req.headers.authorization;
  if (!authtorization) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  const token = authtorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  return next();
};

module.exports = auth;
