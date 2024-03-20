import { baseApi } from "./apiSlice";

export const userApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["User"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      changePassword: build.mutation({
        query: (passwords) => ({
          url: "/user/changePassword",
          method: "POST",
          body: passwords,
        }),
        invalidatesTags: ["User"],
      }),
    }),
  });

export const { useChangePasswordMutation } = userApi;
