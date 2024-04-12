import { RequestHandler } from "../types";
import AttributeService from "../services/attributeService";

// utils
import ApiError from "../utils/ApiError";

export const getAllAttributes: RequestHandler = async (req, res, next) => {
  try {
    const attributeService = new AttributeService(req.userId);

    const attributes = await attributeService.getAllAttributes();

    res.send(attributes);
  } catch (error) {
    next(error);
  }
};

export const createAttribute: RequestHandler = async (req, res, next) => {
  const { label, values } = req.body;

  if (!label || values.length === 0) {
    throw ApiError.BadRequest("Please, provide all values");
  }

  const attributeService = new AttributeService(req.userId);

  try {
    const createdAttribute = await attributeService.createAttribute(
      label,
      values
    );

    res.send(createdAttribute);
  } catch (error) {
    next(error);
  }
};

export const updateAttribute: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);
  const { attributeId } = req.params;

  try {
    const updatedAttribute = await attributeService.updateAttribute(
      attributeId,
      req.body
    );

    res.send(updatedAttribute);
  } catch (error) {
    next(error);
  }
};

export const deleteAttribute: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);
  const { attributeId } = req.params;

  try {
    const deletedAttribute = await attributeService.deleteAttribute(
      attributeId
    );

    res.send(deletedAttribute);
  } catch (error) {
    next(error);
  }
};
