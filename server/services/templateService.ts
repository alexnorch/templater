import User, { IUser } from "../models/userModel";
import { ICategory } from "../models/categoryModel";
import Category from "../models/categoryModel";
import Template, { ITemplate } from "../models/templateModel";
import AppError from "../utils/AppError";

class TemplateService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getTemplates() {
    const templates: ITemplate[] | null = await Template.find({
      user: this.userId,
    })
      .populate("category")
      .lean();

    const templatesWithCategories = templates!.map((template) => {
      return {
        ...template,
        category: template.category.title,
      };
    });

    return templatesWithCategories;
  }

  async getTemplateById(templateId: string) {
    const template = await Template.findOne({
      user: this.userId,
      _id: templateId,
    })
      .populate("category", "title")
      .lean();

    if (!template) {
      return {};
    }

    const { category, ...restTemplate } = template;

    return {
      ...restTemplate,
      category: category.title,
    };
  }

  async createTemplate(userId: string, templateFields: any) {
    const { title, category, language, gender, text, options } = templateFields;

    if (!title || !category || !language || !gender || !text || !options) {
      return new AppError("Please provide all values", 400);
    }

    const foundCategory = (await Category.findOne({
      title: category,
    })) as ICategory;

    const user = (await User.findById(userId)) as IUser;
    const userCategory = await Category.findById(foundCategory._id).select(
      "+templates"
    );

    if (!userCategory) {
      return new AppError("Invalid category", 400);
    }

    const templateDoc = new Template({
      title,
      category: foundCategory._id,
      language,
      gender,
      user: userId,
      options,
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

  async getCategoryIdByTitle(title: string) {
    const userCategory = await Category.findOne({
      title,
      user: this.userId,
    });

    if (userCategory) return userCategory._id;
  }

  async updateTemplate(templateId: string, body: any) {
    const { gender, language, text, title, category } = body;

    const template = await Template.findOne({
      user: this.userId,
      _id: templateId,
    });

    if (!template) {
      return new AppError("Template with that ID wasn't found", 404);
    }

    const categoryId = await this.getCategoryIdByTitle(category);

    const updatedTemplate = await template.updateOne(
      {
        user: this.userId,
        title,
        text,
        language,
        gender,
        category: categoryId,
      },
      { runValidators: true }
    );

    return updatedTemplate;
  }
}

export default TemplateService;
