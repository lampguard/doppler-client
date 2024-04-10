import { api } from '.';
import { format, subDays } from 'date-fns';

const metricsApi = api
	.enhanceEndpoints({
		addTagTypes: ['Metrics'],
	})
	.injectEndpoints({
		overrideExisting: true,
		endpoints: (builder) => ({
			getMetrics: builder.query({
				query: () => ({
					url: '/metrics',
					params: {
						from: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
						range: 'hour',
						interval: '1',
					},
				}),
				providesTags: 'Metrics',
			}),
		}),
	});

export const { useLazyGetMetricsQuery, useGetMetricsQuery } = metricsApi;
