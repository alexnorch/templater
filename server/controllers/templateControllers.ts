import { RequestHandler } from "../types";
import AppError from "../utils/AppError";
import TemplateService from "../services/templateService";

export const getTemplates: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);

  try {
    const templates = await templateService.getTemplates(req.query);

    res.send(templates);
  } catch (error) {
    next(error);
  }
};

export const getTemplateById: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);
  const templateId = req.params.id;

  if (!templateId) {
    return next(new AppError("Please provide an ID", 400));
  }

  try {
    const template = await templateService.getTemplateById(templateId);
    res.send(template);
  } catch (error) {
    next(error);
  }
};

export const createTemplate: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);

  try {
    const createdTemplate = await templateService.createTemplate(req.body);
    res.send(createdTemplate);
  } catch (error) {
    next(error);
  }
};

export const updateTemplate: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);
  const templateId = req.params.id;
  const { title, text, category } = req.body;

  if (!title || !text || !category) {
    return next(new AppError("Please provide all values", 400));
  }

  try {
    const updatedTemplate = templateService.updateTemplate(
      templateId,
      req.body
    );
    res.send(updatedTemplate);
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate: RequestHandler = async (req, res, next) => {
  const templateService = new TemplateService(req.userId);

  try {
    const deletedTemplate = await templateService.deleteTemplate(req.params.id);
    res.send(deletedTemplate);
  } catch (error) {
    next(error);
  }
};
