import mongoose from "mongoose";
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

  async getTemplates(params: any) {
    const { attributes, category, title } = params;
    let queryObj: { [key: string]: any } = { user: this.userId };

    if (title !== "null" && title !== "") {
      queryObj.title = title;
    }

    if (category !== "null" && category !== "") {
      queryObj.category = category;
    }

    if (attributes) {
      const attrArray = attributes.split(",").filter((attr: string) => attr);
      const attributeValues = attrArray.map(
        (attributeId: string) => new mongoose.Types.ObjectId(attributeId)
      );

      if (attributeValues.length > 0) {
        queryObj.attributeValues = { $in: attributeValues };
      }
    }

    const templates: ITemplate[] | null = await Template.find(queryObj)
      .populate("category")
      .populate("attributeValues")
      .lean();

    const templatesWithCategories = templates!.map((template) => {
      const category = template.category ? template.category.title : "";

      return {
        ...template,
        category,
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
      .populate("attributeValues")
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

  async createTemplate(templateFields: any) {
    const { title, category, text, attributeValues } = templateFields;
    // const isAttributesExists = await Attribute.find({ user: this.userId });

    if (!title || !category || !text) {
      return new AppError("Please provide all values", 400);
    }

    const foundCategory = (await Category.findOne({
      title: category,
    })) as ICategory;

    const user = (await User.findById(this.userId)) as IUser;
    const userCategory = await Category.findById(foundCategory._id).select(
      "+templates"
    );

    if (!userCategory) {
      return new AppError("Invalid category", 400);
    }

    const templateDoc = new Template({
      title,
      category: foundCategory._id,
      user: this.userId,
      attributeValues: attributeValues ? Object.values(attributeValues) : [],
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
