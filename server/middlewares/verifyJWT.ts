import { RequestHandler } from "../types";
import ApiError from "../exceptions/ApiError";
import tokenService from "../services/tokenService";

const verifyJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    !(typeof authHeader === "string" && authHeader.startsWith("Bearer "))
  ) {
    throw ApiError.UnauthorizedError();
  }

  const token = authHeader.split(" ")[1];

  const decodedPayload = tokenService.verifyAccessToken(token);

  if (!decodedPayload || typeof decodedPayload === "string") {
    throw ApiError.UnauthorizedError();
  }

  req.userId = decodedPayload.userId!;

  next();
};

export default verifyJWT;
