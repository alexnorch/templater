import { baseApi } from "../../api/apiSlice";
import { setCredentials } from "./authSlice";

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
        url: "users/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation({
      query: () =>
        <any>{
          url: "users/refresh",
          method: "GET",
        },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials({ ...data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRefreshMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutMutation,
} = authApiSlice;
