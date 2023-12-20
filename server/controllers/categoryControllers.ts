import Category from "../models/categoryModel";
import User from "../models/userModel";
import { RequestHandler } from "../types";
import AppError from "../utils/AppError";

export const getCategories: RequestHandler = async (req, res, next) => {
  const userId = req.userId;

  try {
    const categories = await Category.find({ user: userId });

    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  const { title } = req.body;
  const userId = req.userId;

  if (!title) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findById(userId);
  const isAlreadyExists = await Category.findOne({
    title: title.toLowerCase(),
    user: userId,
  });

  if (isAlreadyExists) {
    return next(new AppError("Category is already exists", 400));
  }

  const category = new Category({ title: title.toLowerCase(), user: userId });
  const createdCategory = await category.save();

  user?.categories.push(createdCategory._id);
  await user!.save();

  res.send(createdCategory);
};

export const updateCategory: RequestHandler = (req, res, next) => {};
export const deleteCategory: RequestHandler = (req, res, next) => {};
