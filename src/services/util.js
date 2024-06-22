export const baseUrl = __ENV__.API_URL;

export const formatDate = (date) => {
	return new Date(date).toLocaleDateString();
};

export const copy = (text) => window.navigator.clipboard.writeText(text);
