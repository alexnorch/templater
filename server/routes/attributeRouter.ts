import express from "express";
import {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  createAttributeOption,
  deleteAttributeOption,
  updateAttributeOption,
} from "../controllers/attributeControllers";

const router = express.Router();

router.route("/").get(getAllAttributes).post(createAttribute);
router.route("/:attrId").delete(deleteAttribute).patch(updateAttribute);

router.route("/:attrId/option").post(createAttributeOption);
router
  .route("/:attrId/option/:optionId")
  .delete(deleteAttributeOption)
  .patch(updateAttributeOption);

export default router;