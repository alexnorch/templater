import { IAttribute } from "../../types";
import { baseApi } from "../api/apiSlice";

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
    }),
  });

export const { useGetAttributesQuery } = attributeApi;
