import { baseApi } from "../api/apiSlice";
import { ITemplateItem } from "../../types";

export const templateApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Template"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTemplates: build.query<ITemplateItem[], void>({
        query: () => "/templates",
        providesTags: (result, error, arg) =>
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
      getTemplate: build.query({
        query: (templateId) => `/templates/${templateId}`,
      }),
      updateTemplate: build.mutation({
        query: (template) => ({
          url: `templates/${template._id}`,
          method: "PATCH",
          body: template,
        }),
      }),
      deleteTemplate: build.mutation({
        query: (templateId) => ({
          url: `templates/${templateId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Template", id: arg.templateId },
        ],
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
