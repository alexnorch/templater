import { RequestHandler } from "../types";
import Template from "../models/templateModel";
import User from "../models/userModel";
import Category from "../models/categoryModel";
import AppError from "../utils/AppError";

export const getTemplates: RequestHandler = (req, res, next) => {};

export const createTemplate: RequestHandler = async (req, res, next) => {
  const { title, category, language, gender, text } = req.body;
  const userId = req.userId;

  if (!title || !category || !language || !gender || !text) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findById(userId);
  const userCategory = await Category.findOne({ title: category });

  const templateDoc = new Template({
    title,
    category,
    language,
    gender,
    text,
  });

  const createdTemplate = await templateDoc.save();

  user?.templates.push(createdTemplate._id);
  userCategory?.templates.push(createdTemplate._id);

  await user!.save();
  await userCategory!.save();

  res.send(createdTemplate);
};

export const updateTemplate: RequestHandler = (req, res, next) => {};

export const deleteTemplate: RequestHandler = (req, res, next) => {};
