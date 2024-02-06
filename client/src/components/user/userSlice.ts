import { baseApi } from "../../api/apiSlice";

const categoryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (build) => ({
      //   loginUser: build.mutation({
      //     query: () => "/categories",
      //     providesTags: (result, error, arg) =>
      //       result
      //         ? [
      //             ...result.map(({ _id }) => ({
      //               type: "Category" as const,
      //               _id,
      //             })),
      //             "Category",
      //           ]
      //         : ["Category"],
      //   }),
    }),
  });

export const {} = categoryApi;
