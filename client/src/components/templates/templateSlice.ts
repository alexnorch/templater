import { baseApi } from "../api/apiSlice";
import { ITemplateItem } from "../../types";

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
          params,
        }),
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
        providesTags: (result, error, arg) => [{ type: "Template", _id: arg }],
      }),
      updateTemplate: build.mutation({
        query: (template) => ({
          url: `/templates/${template._id}`,
          method: "PATCH",
          body: template,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Template", _id: arg },
        ],
      }),
      deleteTemplate: build.mutation({
        query: (templateId) => ({
          url: `/templates/${templateId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Template", _id: arg.templateId },
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
