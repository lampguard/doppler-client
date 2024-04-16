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
			newTeam: builder.mutation({
				query: (data) => ({
					url: '/teams/new',
					method: 'POST',
					body: data,
				}),
				invalidatesTags: ['Teams'],
			}),
		}),
	});

export const { useLazyGetTeamsQuery, useNewTeamMutation } = teams;
