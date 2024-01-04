import AppError from "../utils/AppError";
import User, { IUser } from "../models/userModel";
import Category, { ICategory } from "../models/categoryModel";
import Template from "../models/templateModel";

class CategoryService {
  async getCategories(userId: string) {
    return await Category.find({ user: userId });
  }

  async createCategory(userId: string, title: string) {
    title = title.toLocaleLowerCase();

    const user = (await User.findById(userId)) as IUser;

    const isAlreadyExists = await Category.findOne({ title, user: userId });

    if (isAlreadyExists) {
      return new AppError("Category is already exists", 400);
    }

    const category = new Category({ title, user: userId });
    const createdCategory = await category.save();

    user.categories.push(createdCategory._id);
    await user.save();

    return createdCategory;
  }

  async deleteCategory(userId: string, categoryId: string) {
    const category: ICategory | null = await Category.findOne({
      user: userId,
      _id: categoryId,
    });

    if (!category) {
      return new AppError("Category not found", 404);
    }

    await Template.deleteMany({
      user: userId,
      category: categoryId,
    });

    const deletedCategory = await category.deleteOne();

    if (!deletedCategory) {
      return new AppError("Something went wrong. Please try again later", 500);
    }

    return deletedCategory;
  }
}

export default new CategoryService();
