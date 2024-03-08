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
      const regex = new RegExp(title, "i");
      queryObj.title = { $regex: regex };
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
      .populate({ path: "attributeValues", populate: { path: "attribute" } })
      .lean();

    return templates;
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
      });

    return template;
  }

  async createTemplate(templateFields: any) {
    const { title, category, text, attributeValues } = templateFields;

    if (!title || !category || !text) {
      throw new AppError("Please provide all values", 400);
    }

    const user = (await User.findById(this.userId)) as IUser;
    const userCategory = await Category.findById(category).select("+templates");

    if (!userCategory) {
      throw new AppError("Invalid category", 400);
    }

    const createdTemplate = await Template.create({
      title,
      category,
      user: this.userId,
      attributeValues: attributeValues ? attributeValues : [],
      text,
    });

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

    const templateFilter = { user: this.userId, _id: templateId };
    const templateOptions = { new: true, runValidators: true };
    const templateUpdates = {
      user: this.userId,
      title,
      text,
      category,
      attributeValues,
    };

    const updatedTemplate = await Template.findOneAndUpdate(
      templateFilter,
      templateUpdates,
      templateOptions
    )
      .populate("category")
      .populate({
        path: "attributeValues",
        populate: {
          path: "attribute",
          select: "label",
        },
      });

    return updatedTemplate;
  }
}

export default TemplateService;
