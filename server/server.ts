import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

// Utils
import AppError from "./utils/AppError";

// Routes
import templateRouter from "./routes/templateRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import attributeRouter from "./routes/attributeRouter";

// Middlewares
import authenticate from "./middlewares/authenticate";

const app = express();

app.use(express.json());
app.use("/api/templates", authenticate, templateRouter);
app.use("/api/categories", authenticate, categoryRouter);
app.use("/api/attributes", authenticate, attributeRouter);
app.use("/api/users", userRouter);

// Error handling

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("There is no such route", 404));
});

app.use(
  (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500;
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
