// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => res.status(201).send(user))
        .catch(next);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('Not found'))
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new Error('Not found'))
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ message: 'Введите данные' });
    return;
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Not found'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user.id,
            // eslint-disable-next-line dot-notation
            }, process.env['JWT_SECRET']);
            res.cookie('jwt', jwt, {
              maxAge: 36000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            res.status(401).send({ message: 'Неправильные данные' });
          }
        });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getUserInfo,
};
