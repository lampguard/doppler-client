import { api } from './index';

export const notificationsApi = api
	.enhanceEndpoints({
		addTagTypes: ['Notifications'],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			getNotifications: builder.query({
				query: ({ page, count }) => ({
					url: `/notifications?page=${page}&count=${count}`,
				}),
				providesTags: ['Notifications'],
			}),
			markAsRead: builder.mutation({
				query: ({ id }) => ({
					url: `/notifications/${id}`,
					method: 'POST',
				}),
				invalidatesTags: ['Notifications'],
			}),
			markAllAsRead: builder.mutation({
				query: () => ({
					url: '/notifications',
					method: 'POST',
				}),
				invalidatesTags: ['Notifications'],
			}),
		}),
	});

export const { useLazyGetNotificationsQuery, useMarkAsReadMutation } = notificationsApi;
