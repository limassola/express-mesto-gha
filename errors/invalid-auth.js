class InvalidAuth extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 401;
    this.message = 'Неправильные email или пароль';
  }
}
module.exports = InvalidAuth;
