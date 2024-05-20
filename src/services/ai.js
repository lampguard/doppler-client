import { api } from '.';

export const aiApi = api.enhanceEndpoints({}).injectEndpoints({
	endpoints: (builder) => ({
		analyse: builder.query({
			query: (id) => ({
				url: `/ai/${id}`,
			}),
		}),
	}),
});

export const { useLazyAnalyseQuery } = aiApi;
