class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 404;
    this.message = 'Пользователь не найден';
  }
}
module.exports = NotFoundError;
