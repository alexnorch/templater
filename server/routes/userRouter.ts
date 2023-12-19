import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers";

const router = express.Router();

// Login
// Register

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;
