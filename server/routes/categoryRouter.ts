import express from "express";
import {
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../controllers/categoryControllers";

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:id").delete(deleteCategory).patch(updateCategory);

export default router;
