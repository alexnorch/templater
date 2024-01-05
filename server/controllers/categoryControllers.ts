import { RequestHandler } from "../types";
import CategoryService from "../services/categoryService";
import AppError from "../utils/AppError";

export const getCategories: RequestHandler = async (req, res, next) => {
  const categoryServices = new CategoryService(req.userId);
  try {
    const categories = await categoryServices.getCategories();
    res.send(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  const categoryServices = new CategoryService(req.userId);

  try {
    const title = req.body.title;

    if (!title) {
      return new AppError("Please provide the title", 400);
    }

    const createdCategory = await categoryServices.createCategory(title);

    res.send(createdCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  const categoryServices = new CategoryService(req.userId);

  try {
    const categoryId = req.params.id;

    const deletedCategory = await categoryServices.deleteCategory(categoryId);

    res.send(deletedCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  res.send("The category was updated");
};
