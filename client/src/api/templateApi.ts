import { baseApi } from "./apiSlice";
import { ITemplateItem } from "../types";

export const templateApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Template"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTemplates: build.query<ITemplateItem[], any>({
        query: (params) => ({
          url: "/templates",
          method: "GET",
          params: {
            ...params,
            attributes: params.attributes
              ? Object.values(params.attributes)
              : null,
          },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ _id }) => ({
                  type: "Template" as const,
                  _id,
                })),
                "Template",
              ]
            : ["Template"],
      }),
      getTemplate: build.query<ITemplateItem, any>({
        query: (templateId) => `/templates/${templateId}`,
        providesTags: (arg) => [{ type: "Template", _id: arg }],
      }),
      updateTemplate: build.mutation({
        query: (template) => {
          return {
            url: `/templates/${template._id}`,
            method: "PATCH",
            body: template,
          };
        },
        invalidatesTags: (arg) => [{ type: "Template", _id: arg._id }],
      }),
      deleteTemplate: build.mutation({
        query: (templateId) => ({
          url: `/templates/${templateId}`,
          method: "DELETE",
        }),
        invalidatesTags: (arg) => [{ type: "Template", _id: arg.templateId }],
      }),
      addTemplate: build.mutation({
        query: (template) => ({
          url: "/templates",
          method: "POST",
          body: template,
        }),
        invalidatesTags: ["Template"],
      }),
    }),
  });

export const {
  useAddTemplateMutation,
  useGetTemplatesQuery,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;
