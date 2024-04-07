class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized");
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  }
}

export default ApiError;
