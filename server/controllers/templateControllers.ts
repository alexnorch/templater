import { RequestHandler } from "../types";
import Template from "../models/templateModel";
import Attribute from "../models/attributeModel";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/AppError";
import TemplateService from "../services/templateService";

export const getTemplateById: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);
  const templateId = req.params.id;

  if (!templateId) {
    return next(new AppError("Please provide an ID", 400));
  }

  try {
    const template = await templateService.getTemplateById(templateId);
    res.send(template);
  } catch (error) {
    next(error);
  }
};

export const getTemplates: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);

  const { category, title, language, gender } = req.query;
  let queryObj: any = {};

  if (category) {
    queryObj.category = category;
  }

  if (title) {
    queryObj.title = title;
  }

  if (language) {
    queryObj.language = language;
  }

  if (gender !== "null" && gender !== "") {
    queryObj.gender = gender;
  }

  try {
    const templates = await templateService.getTemplates();

    res.send(templates);
  } catch (error) {
    next(error);
  }
};

export const createTemplate: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);

  const userId = req.userId;
  try {
    const createdTemplate = await templateService.createTemplate(
      userId,
      req.body
    );

    res.send(createdTemplate);
  } catch (error) {
    next(error);
  }
};

export const updateTemplate: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);
  const templateId = req.params.id;
  const { title, text, language, gender, category } = req.body;

  if (!title || !text || !language || !gender || !category) {
    return next(new AppError("Please provide all values", 400));
  }

  const updatedTemplate = templateService.updateTemplate(templateId, req.body);
  res.send(updatedTemplate);

  try {
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate: RequestHandler = async (req, res, next) => {
  const user = req.userId;

  try {
    const deletedTemplate = await Template.findOneAndDelete({
      user,
      _id: req.params.id,
    });

    res.send(deletedTemplate);
  } catch (error) {
    next(error);
  }
};

export const getAllAttributes: RequestHandler = async (req, res, next) => {
  const userAttributes = await Attribute.find({ user: req.userId });

  res.send(userAttributes);
};

export const createAttribute: RequestHandler = async (req, res, next) => {
  const { label, options } = req.body;

  if (!label || !options) {
    return next(new AppError("Provide all values", 400));
  }

  const isAttributeFound = await Attribute.findOne({ label, user: req.userId });
  const user = (await User.findOne({ _id: req.userId })) as IUser;

  if (isAttributeFound) {
    return next(
      new AppError("Attribute with this label is already exists", 400)
    );
  }

  const newAttribute = new Attribute({ label, options, user: req.userId });
  const createdAttribute = await newAttribute.save();

  user.templateAttributes.push(createdAttribute._id);
  await user.save();

  res.send(createdAttribute);
};

export const getAttribute: RequestHandler = () => {};
export const updateAttribute: RequestHandler = () => {};
export const deleteAttribute: RequestHandler = () => {};
