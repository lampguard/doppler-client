import { api } from '.';

export const tasks = api
	.enhanceEndpoints({
		addTagTypes: ['Tasks', 'Task'],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			getTasks: builder.query({
				query: () => ({
					url: '/tasks',
				}),
				providesTags: ['Tasks'],
				forceRefetch: ({}) => {
					return true;
				},
			}),
			assignTask: builder.mutation({
				query: (body) => ({
					url: '/tasks',
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Tasks'],
			}),
		}),
	});

export const { useLazyGetTasksQuery, useAssignTaskMutation } = tasks;
