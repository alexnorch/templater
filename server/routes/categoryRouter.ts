import express from "express";
import {
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../controllers/categoryControllers";
import verifyJWT from "../middlewares/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getCategories).post(createCategory);
router.route("/:id").delete(deleteCategory).patch(updateCategory);

export default router;
