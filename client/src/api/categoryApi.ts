import { ICategoryItem } from "../types";
import { baseApi } from "./apiSlice";

const categoryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Category", "Template"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getCategories: build.query<ICategoryItem[], void>({
        query: () => "/categories",
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.map(({ _id }) => ({
                  type: "Category" as const,
                  _id,
                })),
                "Category",
              ]
            : ["Category"],
      }),
      addCategory: build.mutation({
        query: (category) => ({
          url: "/categories",
          method: "POST",
          body: category,
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: build.mutation({
        query: (categoryId) => ({
          url: `/categories/${categoryId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Category", _id: arg.categoryId },
          "Template",
        ],
      }),
      updateCategory: build.mutation({
        query: (category) => {
          return {
            url: `/categories/${category._id}`,
            method: "PATCH",
            body: category,
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Category", _id: arg._id },
        ],
      }),
    }),
  });

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
