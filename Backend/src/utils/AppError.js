class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes known errors from unexpected bugs
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };