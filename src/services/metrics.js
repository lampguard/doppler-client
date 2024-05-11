import { api } from '.';
import { addDays, format, subDays } from 'date-fns';

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
						from: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
						to: format(addDays(new Date(), 1), 'yyyy-MM-dd HH:mm:00'),
						range: 'hour',
						interval: 12,
						team: undefined
					}
				) => ({
					url: '/metrics',
					params: {
						...params,
					},
				}),
				providesTags: ['Metrics'],
			}),
			getMetricsForApp: builder.query({
				query: (data) => ({
					url: `/metrics/${data.token}`,
					params: {...data, token: undefined},
				}),
			}),
		}),
	});

export const {
	useLazyGetMetricsQuery,
	useGetMetricsQuery,
	useLazyGetMetricsForAppQuery
} = metricsApi;
