import { api } from '.';

const teams = api
	.enhanceEndpoints({
		addTagTypes: ['Teams'],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			getTeams: builder.query({
				query: () => ({
					url: '/teams',
				}),
				providesTags: ['Teams'],
			}),
		}),
	});

export const { useLazyGetTeamsQuery } = teams;
