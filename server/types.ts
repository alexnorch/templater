import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
