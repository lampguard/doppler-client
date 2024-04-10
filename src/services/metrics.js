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
            from: "2024-04-01",
            range: "minute",
            interval: "1"
          },
        }),
        providesTags: "Metrics",
      }),
    }),
  });

export const { useLazyGetMetricsQuery, useGetMetricsQuery } = metricsApi;
