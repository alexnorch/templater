import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
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
        queryObj.attributeValues = { $all: attributeValues };
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
      .populate("category")
      .populate({
        path: "attributeValues",
        populate: {
          path: "attribute",
          select: "label",
        },
      })
      .lean();

    if (template && template.attributeValues) {
      template.attributeValues.forEach((attrValue: any) => {
        if (attrValue.attribute && attrValue.attribute.label) {
          attrValue.attribute = attrValue.attribute.label;
        }
      });
    }

    return template;
  }

  async createTemplate(templateFields: any) {
    const { title, category, text, attributeValues } = templateFields;

    if (!title || !category || !text) {
      return new AppError("Please provide all values", 400);
    }

    const user = (await User.findById(this.userId)) as IUser;
    const userCategory = await Category.findById(category).select("+templates");

    if (!userCategory) {
      return new AppError("Invalid category", 400);
    }

    const templateDoc = new Template({
      title,
      category,
      user: this.userId,
      attributeValues: attributeValues ? attributeValues : [],
      text,
    });

    const createdTemplate = await templateDoc.save();

    user.templates.push(createdTemplate._id);
    userCategory.templates.push(createdTemplate._id);

    await user.save();
    await userCategory.save();

    return createdTemplate;
  }

  async deleteTemplate(templateId: string) {
    const deletedTemplate = await Template.findOneAndDelete({
      _id: templateId,
      user: this.userId,
    });

    return deletedTemplate;
  }

  async updateTemplate(templateId: string, body: any) {
    const { text, title, category, attributeValues } = body;

    const template = await Template.findOne({
      user: this.userId,
      _id: templateId,
    });

    console.log(attributeValues);

    if (!template) {
      return new AppError("Template with that ID wasn't found", 404);
    }

    const updatedTemplate = await template.updateOne(
      {
        user: this.userId,
        title,
        text,
        category,
        attributeValues,
      },
      { runValidators: true }
    );

    return updatedTemplate;
  }
}

export default TemplateService;
