import { api } from '.';

const waitlistApi = api
	.enhanceEndpoints({
		addTagTypes: ['Waitlist'],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			verifyWaitlist: builder.mutation({
				query: ({ email, name }) => ({
					url: `/waitlist/redeem`,
					method: 'POST',
					body: {
						email,
						name,
					},
				}),
			}),
		}),
	});

export const { useVerifyWaitlistMutation } = waitlistApi;
