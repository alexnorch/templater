import { RequestHandler } from "../types";
import AppError from "../utils/AppError";
import AttributeService from "../services/attributeService";

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
  const attributeService = new AttributeService(req.userId);

  if (!req.body.label) {
    return next(new AppError("Attribute label is required", 400));
  }

  try {
    const createdAttribute = await attributeService.createAttribute(
      req.body.label
    );

    res.send(createdAttribute);
  } catch (error) {
    next(error);
  }
};

export const updateAttribute: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);
  const attributeId = req.params.attributeId;

  const newLabel = req.body.label;

  if (!newLabel) {
    return next(new AppError("Please provide all values", 400));
  }

  try {
    const updatedAttribute = await attributeService.updateAttribute(
      attributeId,
      newLabel
    );

    res.send(updatedAttribute);
  } catch (error) {
    next(error);
  }
};

export const deleteAttribute: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);
  const attrId = req.params.attrId;

  try {
    const deletedAttribute = await attributeService.deleteAttribute(attrId);
    res.send(deletedAttribute);
  } catch (error) {
    next(error);
  }
};

export const createAttributeOption: RequestHandler = async (req, res, next) => {
  const attributeService = new AttributeService(req.userId);
  const attributeId = req.params.attributeId;
  const attributeValue = req.body.value;

  if (!attributeValue) {
    return next(new AppError("Attribute value is required", 400));
  }

  try {
    const createAttributeValues = await attributeService.createAttributeValue(
      attributeId,
      attributeValue
    );

    res.send(createAttributeValues);
  } catch (error) {
    next(error);
  }
};

export const deleteAttributeOption: RequestHandler = async (req, res, next) => {
  const { attributeId, optionId } = req.params;
  const attributeService = new AttributeService(req.userId);

  try {
    const deletedAttributeValue = await attributeService.deleteAttributeValue(
      attributeId,
      optionId
    );

    res.send(deletedAttributeValue);
  } catch (error) {
    next(error);
  }
};

export const updateAttributeOption: RequestHandler = (req, res, next) => {};
