import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { RequestHandler } from "../types";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return next(new AppError("Access denied", 401));
  }

  jwt.verify(accessToken, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) return next(new AppError("Access denied", 401));

    if (typeof decoded !== "string" && "userId" in decoded!) {
      req.userId = decoded.userId;
    }
  });

  next();
};

export default authenticate;
