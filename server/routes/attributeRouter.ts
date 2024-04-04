import express from "express";
import {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controllers/attributeControllers";
import verifyJWT from "../middlewares/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getAllAttributes).post(createAttribute);

router.route("/:attributeId").delete(deleteAttribute).patch(updateAttribute);

export default router;
