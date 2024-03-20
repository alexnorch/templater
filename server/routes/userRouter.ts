import express from "express";
import { changePassword } from "../controllers/userControllers";

import verifyJWT from "../middlewares/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router.route("/changePassword").post(changePassword);

export default router;
