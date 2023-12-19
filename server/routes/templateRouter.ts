import express from "express";
import {
  getTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
} from "../controllers/templateControllers";

const router = express.Router();

router.route("/").get(getTemplates).post(createTemplate);
router.route("/:id").delete(deleteTemplate).patch(updateTemplate);

export default router;
