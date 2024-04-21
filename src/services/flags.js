import { api } from ".";

export const flagsApi = api
  .enhanceEndpoints({
    addTagTypes: ["Flags"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getFlags: builder.query({
        query: () => ({
          url: "/logs/flags",
        }),
        providesTags: ["Flags"],
      }),
      createFlag: builder.mutation({
        query: (body) => ({
          url: "/logs/flags",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Flags"],
      }),
    }),
  });

export const { useLazyGetFlagsQuery, useCreateFlagMutation } = flagsApi;
