import { api } from '.';

const appApi = api
	.enhanceEndpoints({
		addTagTypes: ['App', 'Logs'],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			getApp: builder.query({
				query: (id) => ({
					url: '/apps/' + id,
				}),
				providesTags: ['App'],
				transformResponse: (response, meta, args) => response.data,
			}),
			getLogs: builder.query({
				query: (data) => ({
					url: `/logs/${data.id}`,
					params: { ...data, id: undefined },
				}),
				providesTags: ['Logs'],
			}),
			createApp: builder.mutation({
				query: (data) => ({
					url: '/apps',
					body: data,
					method: 'POST',
				}),
				invalidatesTags: ['Apps'],
				transformResponse: (response, meta, args) => response.data,
			}),
		}),
	});

export const {
	useGetAppQuery,
	useLazyGetAppQuery,
	useLazyGetLogsQuery,
	useCreateAppMutation,
} = appApi;
