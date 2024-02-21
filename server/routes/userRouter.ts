import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refresh,
} from "../controllers/userControllers";
import loginLimiter from "../middlewares/loginLimiter";

const router = express.Router();

router.route("/login").post(loginLimiter, loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/refresh").get(refresh);

export default router;
