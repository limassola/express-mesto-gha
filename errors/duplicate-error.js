class DuplicateError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 409;
    this.message = 'Email уже зарегистрирован';
  }
}
module.exports = DuplicateError;
