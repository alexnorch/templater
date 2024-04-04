import { RequestHandler } from "../types";
import AppError from "../utils/AppError";
import AttributeService from "../services/attributeService";
import AttributeValue, { IAttributeValue } from "../models/attributeValueModel";

export const getAllAttributes: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);

  try {
    const attributes = await attributeService.getAllAttributes();
    res.send(attributes);
  } catch (error) {
    next(error);
  }
};

export const createAttribute: RequestHandler = async (req, res, next) => {
  const { label, values } = req.body;

  if (!label || values.length === 0) {
    return next(new AppError("Please, provide all values", 400));
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
  const attributeId = req.params.attributeId;

  try {
    const updatedAttribute = await attributeService.updateAttribute(
      attributeId,
      req.body
    );

    res.send(updatedAttribute);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteAttribute: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);
  const attrId = req.params.attributeId;

  try {
    const deletedAttribute = await attributeService.deleteAttribute(attrId);
    res.send(deletedAttribute);
  } catch (error) {
    next(error);
  }
};
