class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 403;
    this.message = 'Недостаточно прав для удаления карточки';
  }
}
module.exports = ForbiddenError;
