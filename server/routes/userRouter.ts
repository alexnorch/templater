import express from "express";
import {
  loginUser,
  registerUser,
  refresh,
} from "../controllers/userControllers";
import loginLimiter from "../middlewares/loginLimiter";

const router = express.Router();

router.route("/login").post(loginLimiter, loginUser);
router.route("/register").post(registerUser);
router.route("/refresh").get(refresh);

export default router;
