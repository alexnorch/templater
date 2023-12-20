import { RequestHandler } from "../types";
import Template, { ITemplate } from "../models/templateModel";
import User from "../models/userModel";
import Category, { ICategory } from "../models/categoryModel";
import AppError from "../utils/AppError";

const getCategoryId = async (categoryTitle: string, userId: string) => {
  const category = (await Category.findOne({
    title: categoryTitle,
    user: userId,
  })) as ICategory | null;

  if (category) return category._id;
};

export const getTemplates: RequestHandler = async (req, res, next) => {
  try {
    const { category, title, language, gender } = req.query;
    const user = req.userId;

    const templates: ITemplate[] | null = await Template.find({
      user,
      gender,
      language,
      title,
    });

    res.send(templates || []);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createTemplate: RequestHandler = async (req, res, next) => {
  const { title, category, language, gender, text } = req.body;
  const userId = req.userId;

  if (!title || !category || !language || !gender || !text) {
    return next(new AppError("Please provide all values", 400));
  }

  try {
    const user = await User.findById(userId);
    const userCategory = await Category.findOne({ title: category }).select(
      "+templates"
    );

    if (!userCategory) {
      return next(new AppError("Invalid category", 400));
    }

    const templateDoc = new Template({
      title,
      category: userCategory._id,
      language,
      gender,
      user: userId,
      text,
    });

    const createdTemplate = await templateDoc.save();

    user?.templates.push(createdTemplate._id);
    userCategory?.templates.push(createdTemplate._id);

    await user!.save();
    await userCategory!.save();

    res.send(createdTemplate);
  } catch (error) {
    next(error);
  }
};

export const updateTemplate: RequestHandler = async (req, res, next) => {
  const userId = req.userId;

  try {
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate: RequestHandler = async (req, res, next) => {
  const userId = req.userId;

  try {
    const template = await Template.findById({ user: userId });
  } catch (error) {
    next(error);
  }
};
