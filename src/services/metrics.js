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
				query: (
					params = {
						from: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
						range: 'day',
						interval: 1,
					}
				) => ({
					url: '/metrics',
					params: {
						...params
					},
				}),
				providesTags: 'Metrics',
			}),
		}),
	});

export const { useLazyGetMetricsQuery, useGetMetricsQuery } = metricsApi;
