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
        }),
        providesTags: "Metrics",
      }),
    }),
  });

export const { useLazyGetMetricsQuery } = metricsApi;
