class ApiError extends Error {
  status: number;
  errors: any;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized");
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  }
}

export default ApiError;
