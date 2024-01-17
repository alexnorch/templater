import express from "express";
import {
  getTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
  getTemplateById,
  getAllAttributes,
  createAttribute,
  getAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controllers/templateControllers";

const router = express.Router();

router.route("/").get(getTemplates).post(createTemplate);
router.route("/attributes").get(getAllAttributes).post(createAttribute);

router
  .route("/:id")
  .get(getTemplateById)
  .delete(deleteTemplate)
  .patch(updateTemplate);

router
  .route("/attributes/:id")
  .get(getAttribute)
  .patch(updateAttribute)
  .delete(deleteAttribute);

export default router;
