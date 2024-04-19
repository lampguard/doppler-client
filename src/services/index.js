import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './util';

export const api = createApi({
	reducerPath: 'global',
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			const token = sessionStorage.getItem('authToken');
			if (token) {
				headers.append('authorization', `Bearer ${token}`);
			}

			return headers;
		},
		// cache: "force-cache",
		timeout: 60000,
	}),
	refetchOnReconnect: true,
	keepUnusedDataFor: 120,
	tagTypes: ['Auth', 'Apps'],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: '/auth/login',
				body,
				method: 'POST',
			}),
			providesTags: ['Auth'],
			onQueryStarted(id, { dispatch, queryFulfilled }) {
				queryFulfilled
					.then((apiResponse) => {
						sessionStorage.setItem('authToken', apiResponse.data.data.token);
					})
					.catch((err) => {
						console.error(err);
					});
			},
		}),
		signup: builder.mutation({
			query: (body) => ({
				url: '/auth/register',
				body,
				method: 'POST',
			}),
			providesTags: ['Auth'],
			onQueryStarted(id, { dispatch, queryFulfilled }) {
				queryFulfilled
					.then((apiResponse) => {
						sessionStorage.setItem('authToken', apiResponse.data.data.token);
					})
					.catch(console.error);
			},
		}),
		getAuth: builder.query({
			query: () => ({
				url: '/auth',
				method: 'GET',
			}),
			providesTags: ['Auth'],
		}),
		getApps: builder.query({
			query: (teamId) => ({
				url: `/apps${teamId ? `?teamId=${teamId}` : ''}`,
			}),
		}),
		setup2FA: builder.query({
			query: () => ({
				url: '/auth/2fa/setup',
			}),
		}),
		enable2FA: builder.mutation({
			query: (data) => ({
				url: '/auth/2fa/enable',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Auth'],
		}),
		verify2FA: builder.mutation({
			query: (data) => ({
				url: '/auth/2fa/verify',
				body: data,
				method: 'POST',
			}),
			onQueryStarted(id, { dispatch, queryFulfilled }) {
				queryFulfilled
					.then((apiResponse) => {
						sessionStorage.setItem('authToken', apiResponse.data.data.token);
					}).catch((err) => {
						throw err;
					});	
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: ['Auth'],
		}),
	}),
});

export const {
	useLoginMutation,
	useGetAuthQuery,
	useGetAppsQuery,
	useLazyGetAuthQuery,
	useSignupMutation,
	useLazySetup2FAQuery,
	useEnable2FAMutation,
	useLogoutMutation,
	useVerify2FAMutation,
	useLazyGetAppsQuery
} = api;
