import { RequestHandler } from "../types";
import Attribute from "../models/attributeModel";
import User, { IUser } from "../models/userModel";
import Option from "../models/optionModel";
import AppError from "../utils/AppError";

export const getAllAttributes: RequestHandler = async (req, res, next) => {
  const attributes = await Attribute.find({ user: req.userId }).populate(
    "options"
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
  const attributeDoc = new Attribute({ options: [], user: userId, label });
  const createdAttribute = await attributeDoc.save();

  user.templateAttributes.push(createdAttribute._id);

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
  const attributeId = req.params.attrId;
  const user = req.userId;

  const deletedAttribute = await Attribute.findOneAndDelete({
    _id: attributeId,
    user,
  });

  if (!deletedAttribute) {
    return next(new AppError("Attribute with that ID wasn't found", 400));
  }

  res.send(deletedAttribute);
};

export const createAttributeOption: RequestHandler = async (req, res, next) => {
  const attributeId = req.params.attrId;
  const optionName = req.body.name;
  const attribute = await Attribute.findById(attributeId);

  if (!optionName) {
    return next(new AppError("Option name is required", 400));
  }

  if (!attribute) {
    return next(new AppError("Invalid attribute ID", 400));
  }

  const isAlreadyExists = await Option.findOne({
    name: optionName,
    attribute: attributeId,
  });

  if (isAlreadyExists) {
    return next(new AppError("Option with this name is already exists", 400));
  }

  const optionDoc = new Option({ name: optionName, attribute: attribute._id });
  const createdOption = await optionDoc.save();

  attribute.options.push(createdOption._id);
  attribute.save();

  res.send(createdOption);
};

export const updateAttributeOption: RequestHandler = (req, res, next) => {};
export const deleteAttributeOption: RequestHandler = async (req, res, next) => {
  const { attrId, optionId } = req.params;

  const deletedAttributeOption = await Option.findOneAndDelete({
    attribute: attrId,
    _id: optionId,
  });

  if (!deletedAttributeOption) {
    return next(
      new AppError("Attribute Option with that ID wasn't found", 404)
    );
  }

  res.send(deletedAttributeOption);

  res.send({ attrId, optionId });
};
