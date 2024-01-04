import User, { IUser } from "../models/userModel";
import Category from "../models/categoryModel";
import Template from "../models/templateModel";
import AppError from "../utils/AppError";

class TemplateService {
  async getTemplates() {}

  async createTemplate(userId: string, templateFields: any) {
    const { title, category, language, gender, text } = templateFields;

    if (!title || !category || !language || !gender || !text) {
      return new AppError("Please provide all values", 400);
    }

    const user = (await User.findById(userId)) as IUser;
    const userCategory = await Category.findById(category).select("+templates");

    if (!userCategory) {
      return new AppError("Invalid category", 400);
    }

    const templateDoc = new Template({
      title,
      category,
      language,
      gender,
      user: userId,
      text,
    });

    const createdTemplate = await templateDoc.save();

    user.templates.push(createdTemplate._id);
    userCategory.templates.push(createdTemplate._id);

    await user.save();
    await userCategory.save();

    return createdTemplate;
  }

  async deleteTemplate() {}

  async updateTemplate() {}
}

export default new TemplateService();
