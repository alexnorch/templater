import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers";
import loginLimiter from "../middlewares/loginLimiter";

const router = express.Router();

router.route("/login").post(loginLimiter, loginUser);
router.route("/register").post(registerUser);

export default router;
