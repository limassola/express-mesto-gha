class InvalidPath extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 404;
    this.message = 'Invalid Path';
  }
}
module.exports = InvalidPath;
