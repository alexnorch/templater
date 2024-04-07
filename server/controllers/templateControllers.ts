import { RequestHandler } from "../types";
import TemplateService from "../services/templateService";
import ApiError from "../utils/ApiError";

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
    throw ApiError.BadRequest("Please provide an ID");
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
    throw ApiError.BadRequest("Please provide all values");
  }

  try {
    const updatedTemplate = await templateService.updateTemplate(
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
