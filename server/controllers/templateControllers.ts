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
  const { category, title, language, gender } = req.query;
  let queryObj: any = {};

  if (category) {
    const categoryId = await getCategoryId(category as string, req.userId);
    queryObj.category = categoryId;
  }

  if (title) {
    queryObj.title = title;
  }

  if (language) {
    queryObj.language = language;
  }

  if (gender) {
    queryObj.gender = gender;
  }

  try {
    const templates: ITemplate[] | null = await Template.find({
      ...queryObj,
      user: req.userId,
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

    const templates = await Template.find({ user: userId });

    res.send(templates);
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
  const user = req.userId;

  try {
    const template = await Template.findOne({ user, _id: req.params.id });
    const deletedTemplate = await template?.deleteOne();

    if (!deletedTemplate) {
      return next(
        new AppError("Something went wrong. Please try again later", 500)
      );
    }

    const templates = await Template.find({ user });

    res.send(templates);
  } catch (error) {
    next(error);
  }
};
