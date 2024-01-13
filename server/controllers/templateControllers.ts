import { RequestHandler } from "../types";
import Template, { ITemplate } from "../models/templateModel";
import AppError from "../utils/AppError";
import TemplateService from "../services/templateService";
import Category from "../models/categoryModel";

const getCategoryIdByName = async (title: string, user: string) => {
  const userCategory = await Category.findOne({
    title,
    user,
  });

  if (userCategory) return userCategory._id;
};

export const getTemplateById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const template = await TemplateService.getTemplateById(req.userId, id);
    res.send(template);
  } catch (error) {
    next(error);
  }
};

export const getTemplates: RequestHandler = async (req, res, next) => {
  const { category, title, language, gender } = req.query;
  let queryObj: any = {};

  if (category) {
    queryObj.category = category;
  }

  if (title) {
    queryObj.title = title;
  }

  if (language) {
    queryObj.language = language;
  }

  if (gender !== "null" && gender !== "") {
    queryObj.gender = gender;
  }

  try {
    const templates: ITemplate[] | null = await Template.find({
      ...queryObj,
      user: req.userId,
    })
      .populate("category")
      .lean();

    const templatesWithCategories = templates!.map((template) => {
      return {
        ...template,
        category: template.category.title,
      };
    });

    res.send(templatesWithCategories || []);
  } catch (error) {
    next(error);
  }
};

export const createTemplate: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  try {
    const createdTemplate = await TemplateService.createTemplate(
      userId,
      req.body
    );

    res.send(createdTemplate);
  } catch (error) {
    next(error);
  }
};

export const updateTemplate: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  const templateId = req.params.id;
  const { title, text, language, gender, category } = req.body;

  const template = await Template.findOne({ user: userId, _id: templateId });

  if (!template) {
    return next(new AppError("Template with that ID wasn't found", 404));
  }

  const categoryId = await getCategoryIdByName(category, userId);

  const updatedTemplate = await template.updateOne(
    {
      user: userId,
      title,
      text,
      language,
      gender,
      category: categoryId,
    },
    { runValidators: true }
  );

  res.send(updatedTemplate);

  try {
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate: RequestHandler = async (req, res, next) => {
  const user = req.userId;

  try {
    const deletedTemplate = await Template.findOneAndDelete({
      user,
      _id: req.params.id,
    });

    res.send(deletedTemplate);
  } catch (error) {
    next(error);
  }
};
