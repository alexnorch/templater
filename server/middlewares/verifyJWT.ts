import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { RequestHandler } from "../types";

const verifyJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    !(typeof authHeader === "string" && authHeader.startsWith("Bearer "))
  ) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) return next(new AppError("Forbidden", 403));

    req.userId = (decoded as { userId: string }).userId;
    next();
  });
};

export default verifyJWT;
