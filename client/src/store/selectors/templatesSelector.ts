import { RootState } from "..";

export const selectAllTemplates = (state: RootState) =>
  state.templates.templates;

export const selectSingleTemplate = (state: RootState) =>
  state.templates.singleTemplate;

export const selectTemplateId = (state: RootState) =>
  state.templates.selectedTemplateId;

export const selectIsEditingTemplate = (state: RootState) =>
  state.templates.isTemplateEditing;

export const selectIsDeletingTemplate = (state: RootState) =>
  state.templates.isTemplateDeleting;
