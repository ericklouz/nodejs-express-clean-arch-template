class CustomError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static temporaryRedirect(message: string) {
    return new CustomError(307, message);
  }
  static badRequest(message: string) {
    return new CustomError(400, message);
  }
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }
  static forbidden(message: string) {
    return new CustomError(403, message);
  }
  static notFound(message: string) {
    return new CustomError(404, message);
  }
  static methodNotAllowed(message: string) {
    return new CustomError(405, message);
  }
  static conflict(message: string) {
    return new CustomError(409, message);
  }
  static internalServerError(message: string = 'Internal Server Error') {
    return new CustomError(500, message);
  }
}

export default CustomError;
