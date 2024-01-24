import { RequestHandler } from "../types";
import Attribute from "../models/attributeModel";
import User, { IUser } from "../models/userModel";
import AttributeValue from "../models/attributeValueModel";
import AppError from "../utils/AppError";

export const getAllAttributes: RequestHandler = async (req, res, next) => {
  const attributes = await Attribute.find({ user: req.userId }).populate(
    "values"
  );

  res.send(attributes);
};

export const createAttribute: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  const label = req.body.label;

  if (!label) {
    return next(new AppError("Attribute label is required", 400));
  }

  const isAlreadyExists = await Attribute.findOne({ label, user: userId });

  if (isAlreadyExists) {
    return next(
      new AppError("Attribute with this label is already exists", 400)
    );
  }

  const user = (await User.findById(userId)) as IUser;
  const attributeDoc = new Attribute({ values: [], user: userId, label });
  const createdAttribute = await attributeDoc.save();

  user.attributes.push(createdAttribute._id);

  res.send(createdAttribute);
};

export const updateAttribute: RequestHandler = async (req, res, next) => {
  const attributeId = req.params.attrId;
  const user = req.userId;
  const newLabel = req.body.label;

  const updatedAttribute = await Attribute.findOneAndUpdate(
    { _id: attributeId, user },
    { $set: { label: newLabel } },
    { returnDocument: "after" }
  );

  if (!updatedAttribute) {
    return next(new AppError("Attribute with that ID wasn't found", 400));
  }

  res.send(updatedAttribute);
};

export const deleteAttribute: RequestHandler = async (req, res, next) => {
  try {
    const attributeId = req.params.attrId;
    const user = req.userId;

    const deletedAttribute = await Attribute.findOneAndDelete({
      _id: attributeId,
      user,
    });

    if (!deletedAttribute) {
      return next(new AppError("Attribute with that ID wasn't found", 400));
    }

    await AttributeValue.deleteMany({ attribute: deletedAttribute._id });

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
