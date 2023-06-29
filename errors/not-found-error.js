class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 404;
    this.message = err;
  }
}
module.exports = NotFoundError;
