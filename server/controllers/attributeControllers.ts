import { RequestHandler } from "../types";
import Attribute from "../models/attributeModel";
import AttributeValue from "../models/attributeValueModel";
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
  const attrId = req.params.attrId;
  const newLabel = req.body.label;

  if (!newLabel) {
    return next(new AppError("Please provide all values", 400));
  }

  try {
    const updatedAttribute = await attributeService.updateAttribute(
      attrId,
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
  try {
    const attributeId = req.params.attrId;
    const attributeValue = req.body.value;
    const attribute = await Attribute.findById(attributeId);

    if (!attributeValue) {
      return next(new AppError("Option name is required", 400));
    }

    if (!attribute) {
      return next(new AppError("Invalid attribute ID", 400));
    }

    const isAlreadyExists = await AttributeValue.findOne({
      value: attributeValue,
      attribute: attributeId,
    });

    if (isAlreadyExists) {
      return next(new AppError("Option with this name is already exists", 400));
    }

    const optionDoc = new AttributeValue({
      value: attributeValue,
      attribute: attribute._id,
    });

    const createdOption = await optionDoc.save();

    attribute.values.push(createdOption._id);
    attribute.save();

    res.send(createdOption);
  } catch (error) {
    next(error);
  }
};

export const deleteAttributeOption: RequestHandler = async (req, res, next) => {
  const { attrId, optionId } = req.params;

  const deletedAttributeOption = await AttributeValue.findOneAndDelete({
    attribute: attrId,
    _id: optionId,
  });

  if (!deletedAttributeOption) {
    return next(
      new AppError("Attribute Option with that ID wasn't found", 404)
    );
  }

  res.send(deletedAttributeOption);
};

export const updateAttributeOption: RequestHandler = (req, res, next) => {};
