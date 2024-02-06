import { baseApi } from "../../api/apiSlice";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApiSlice;
