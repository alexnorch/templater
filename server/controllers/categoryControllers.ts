import { RequestHandler } from "../types";
import CategoryService from "../services/categoryService";
import AppError from "../utils/AppError";

export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    const categories = await CategoryService.getCategories(userId);
    res.send(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;
    const title = req.body.title;

    if (!title) {
      return new AppError("Please provide the title", 400);
    }

    const createdCategory = await CategoryService.createCategory(userId, title);

    res.send(createdCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.userId;
    const categoryId = req.params.id;

    const deletedCategory = await CategoryService.deleteCategory(
      user,
      categoryId
    );

    res.send(deletedCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  res.send("The category was updated");
};
