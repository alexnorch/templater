import User, { IUser } from "../models/userModel";
import Category, { ICategory } from "../models/categoryModel";
import ApiError from "../utils/ApiError";

class CategoryService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getCategories() {
    return await Category.find({ user: this.userId });
  }

  async createCategory(title: string) {
    title = title.toLocaleLowerCase();

    const user = (await User.findById(this.userId)) as IUser;

    const isAlreadyExists = await Category.findOne({
      title,
      user: this.userId,
    });

    if (isAlreadyExists) {
      throw ApiError.BadRequest("Category is already exists");
    }

    const category = new Category({ title, user: this.userId });
    const createdCategory = await category.save();

    user.categories.push(createdCategory._id);
    await user.save();

    return createdCategory;
  }

  async deleteCategory(categoryId: string) {
    const deletedCategory: ICategory | null = await Category.findOneAndDelete({
      user: this.userId,
      _id: categoryId,
    });

    if (!deletedCategory) {
      throw ApiError.NotFound("Category not found");
    }

    return deletedCategory;
  }

  async updateCategory(categoryId: string, newTitle: any) {
    const category = await Category.findOne({
      user: this.userId,
      _id: categoryId,
    });

    if (!category) {
      throw ApiError.NotFound("Category was not found");
    }

    category.title = newTitle;

    await category.save();

    return category;
  }
}

export default CategoryService;
