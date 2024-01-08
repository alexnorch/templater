import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/templates`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Templates"],
  endpoints: (builder) => ({
    fetchTemplates: builder.query({
      query: (filterParams: any) => ({ url: `/`, params: filterParams }),
      providesTags: ["Templates"],
    }),
    fetchTemplateById: builder.query({
      query: (id) => ({ url: `/${id}` }),
      providesTags: ["Templates"],
    }),
    createTemplate: builder.mutation({
      query: (data) => ({ url: "/", method: "POST", body: data }),
      invalidatesTags: ["Templates"],
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Templates"],
    }),
    updateTemplate: builder.mutation({
      query: ({ id, data }) => ({ url: `/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Templates"],
    }),
  }),
});

export const {
  useFetchTemplateByIdQuery,
  useFetchTemplatesQuery,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} = templateApi;
