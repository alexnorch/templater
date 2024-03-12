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
import verifyJWT from "../middlewares/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getAllAttributes).post(createAttribute);

router.route("/:attributeId").delete(deleteAttribute).patch(updateAttribute);

router.route("/:attributeId/option").post(createAttributeOption);

router
  .route("/:attributeId/option/:optionId")
  .delete(deleteAttributeOption)
  .patch(updateAttributeOption);

export default router;
