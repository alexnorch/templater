import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

import { corsOptions } from "./config/corsOptions";

// Utils
import ApiError from "./exceptions/ApiError";

// Routes
import templateRouter from "./routes/templateRouter";
import authRouter from "./routes/authRouter";
import categoryRouter from "./routes/categoryRouter";
import attributeRouter from "./routes/attributeRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/templates", templateRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/attributes", attributeRouter);
app.use("/api/user", userRouter);

// Error handling
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  throw ApiError.NotFound("Page wasn't found");
});

app.use(
  (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.status || 500;
    const message =
      err.message || "Something went wrong, please try again later";

    res.status(statusCode).json({ message });
  }
);

const startApp = () => {
  const mongoURL = process.env.MONGO_URL || "";
  const PORT = process.env.PORT || 5000;

  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Successfully connected to the database");

      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    })
    .catch((err) => console.log(err));
};

startApp();
