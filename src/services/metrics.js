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
						from: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
						range: 'hour',
						interval: '6',
					},
				}),
				providesTags: 'Metrics',
			}),
		}),
	});

export const { useLazyGetMetricsQuery, useGetMetricsQuery } = metricsApi;
