import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

// Utils
import AppError from "./utils/AppError";

// Routes
import templateRoutes from "./routes/templateRouter";
import userRoutes from "./routes/userRouter";
import categoryRoutes from "./routes/categoryRouter";

const app = express();
app.use("/api/template", templateRoutes);
app.use("/api/category", userRoutes);
app.use("/api/user", categoryRoutes);

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

// const startApp = () => {
//   const mongoURL = process.env.MONGO_URL || "";
//   const PORT = process.env.PORT || 5000;

//   mongoose
//     .connect(mongoURL)
//     .then(() => {
//       console.log("Successfully connected to the database");

//       app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`);
//       });
//     })
//     .catch((err) => console.log(err));
// };

// startApp();

app.use(express.json());
