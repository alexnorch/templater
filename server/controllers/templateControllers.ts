import { RequestHandler } from "../types";
import Template, { ITemplate } from "../models/templateModel";
import AppError from "../utils/AppError";
import TemplateService from "../services/templateService";

export const getTemplateById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const template = TemplateService.getTemplateById(req.userId, id);
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

  if (gender) {
    queryObj.gender = gender;
  }

  try {
    const templates: ITemplate[] | null = await Template.find({
      ...queryObj,
      user: req.userId,
    }).populate("category");

    res.send(templates || []);
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

    const templates = await Template.find({ user: userId });

    res.send(templates);
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

  await template.updateOne(
    {
      user: userId,
      title,
      text,
      language,
      gender,
      category,
    },
    { runValidators: true }
  );

  const templates = await Template.find({ user: userId });
  res.send(templates);

  try {
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate: RequestHandler = async (req, res, next) => {
  const user = req.userId;

  try {
    const template = await Template.findOne({ user, _id: req.params.id });
    const deletedTemplate = await template?.deleteOne();

    if (!deletedTemplate) {
      return next(
        new AppError("Something went wrong. Please try again later", 500)
      );
    }

    const templates = await Template.find({ user });

    res.send(templates);
  } catch (error) {
    next(error);
  }
};
