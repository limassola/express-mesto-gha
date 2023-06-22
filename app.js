require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/error');

const avatarRegex = /^(http|https):\/\/(www.\.)?[a-zA-z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(router);
app.use(errors());
app.use(errorHandler);
app.listen(3000, () => {
});
