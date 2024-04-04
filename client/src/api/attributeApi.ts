import { IAttribute } from "../types";
import { baseApi } from "./apiSlice";

const attributeApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Attribute"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getAttributes: build.query<IAttribute[], void>({
        query: () => "/attributes",
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ _id }) => ({
                  type: "Attribute" as const,
                  _id,
                })),
                "Attribute",
              ]
            : ["Attribute"],
      }),
      addAttribute: build.mutation({
        query: (data) => ({
          url: "/attributes",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Attribute"],
      }),
      updateAttribute: build.mutation({
        query: ({ _id, data }) => ({
          url: `/attributes/${_id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Attribute"],
      }),
      deleteAttribute: build.mutation({
        query: (attributeId) => ({
          url: `/attributes/${attributeId}`,
          method: "DELETE",
        }),
        invalidatesTags: (arg) => [{ type: "Attribute", _id: arg }],
      }),
    }),
  });

export const {
  useGetAttributesQuery,
  useAddAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
} = attributeApi;
