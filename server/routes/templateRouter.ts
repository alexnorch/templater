import express from "express";
import {
  getTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
  getTemplateById,
} from "../controllers/templateControllers";

const router = express.Router();

router.route("/").get(getTemplates).post(createTemplate);
router
  .route("/:id")
  .get(getTemplateById)
  .delete(deleteTemplate)
  .patch(updateTemplate);

export default router;
