import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./util";

export const api = createApi({
  reducerPath: "global",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        headers.append("authorization", `Bearer ${token}`);
      }

      return headers;
    },
    // cache: "force-cache",
    timeout: 60000,
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 120,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        body,
        method: "POST",
      }),
      providesTags: ["Auth"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            sessionStorage.setItem("authToken", apiResponse.data.data.token);
          })
          .catch(() => {});
      },
    }),
    getAuth: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getApps: builder.query({
      query: (teamId) => ({
        url: `/apps${teamId ? `?teamId=${teamId}` : ""}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAuthQuery,
  useGetAppsQuery,
  useLazyGetAuthQuery,
} = api;
