import { api } from '.';

const teams = api
	.enhanceEndpoints({
		addTagTypes: ['Teams', 'Team', 'Team Apps'],
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
			getTeam: builder.query({
				query: (id) => ({
					url: `/teams/${id}/show`,
				}),
				providesTags: ['Team'],
			}),
			getTeamApps: builder.query({
				query: (id) => ({
					url: `/teams/${id}/apps`,
				}),
				providesTags: ['Team Apps'],
				forceRefetch: true,
			}),
			addMember: builder.mutation({
				query: (data) => ({
					url: `/teams/add-member`,
					method: 'POST',
					body: data,
				}),
				invalidatesTags: ['Team'],
			}),
			addApp: builder.mutation({
				query: (data) => ({
					url: `/apps/add-to-team`,
					method: 'POST',
					body: data,
				}),
				invalidatesTags: ['Team'],
			}),
			acceptInvite: builder.mutation({
				query: (data) => ({
					url: 'accept-invite',
					method: 'POST',
					body: data,
				}),
			}),
		}),
	});

export const {
	useGetTeamsQuery,
	useLazyGetTeamsQuery,
	useNewTeamMutation,
	useGetTeamQuery,
	useLazyGetTeamQuery,
	useLazyGetTeamAppsQuery,
	useGetTeamAppsQuery,
	useAddMemberMutation,
	useAddAppMutation: useAddAppToTeamMutation,
  useAcceptInviteMutation,
} = teams;
