import { IAttribute } from "../../types";
import { baseApi } from "../../api/apiSlice";

const attributeApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Attribute"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getAttributes: build.query<IAttribute[], void>({
        query: () => "/attributes",
        providesTags: (result, error, arg) =>
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
      deleteAttribute: build.mutation({
        query: (attributeId) => ({
          url: `/attributes/${attributeId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Attribute", _id: arg },
        ],
      }),
      addAttributeOption: build.mutation({
        query: ({ _id, value }) => ({
          url: `/attributes/${_id}/option`,
          method: "POST",
          body: {
            value,
          },
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Attribute", _id: arg._id },
        ],
      }),
      deleteAttributeOption: build.mutation({
        query: ({ attrId, optionId }) => ({
          url: `/attributes/${attrId}/option/${optionId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Attribute", _id: arg.attrId },
        ],
      }),
    }),
  });

export const {
  useGetAttributesQuery,
  useAddAttributeMutation,
  useAddAttributeOptionMutation,
  useDeleteAttributeOptionMutation,
  useDeleteAttributeMutation,
} = attributeApi;
