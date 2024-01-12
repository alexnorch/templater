import { ICategoryItem } from "../../types";
import { baseApi } from "../api/apiSlice";

const categoryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Category"] })
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
          { type: "Category", id: arg.categoryId },
        ],
      }),
    }),
    //   getCategory: build.query({}),
    //   updateCategory: build.mutation({}),
  });

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  //   useGetCategoryQuery,
  //   useUpdateCategoryMutation,
} = categoryApi;
