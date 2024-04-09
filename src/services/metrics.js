import { api } from ".";

const metricsApi = api
  .enhanceEndpoints({
    addTagTypes: ["Metrics"],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getMetrics: builder.query({
        query: () => ({
          url: "/metrics",
          params: {
            from: "2023-01-01",
          },
        }),
        providesTags: "Metrics",
      }),
    }),
  });

export const { useLazyGetMetricsQuery, useGetMetricsQuery } = metricsApi;
