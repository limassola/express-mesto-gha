class JWTError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 409;
    this.message = 'Invalid token';
  }
}
module.exports = JWTError;
