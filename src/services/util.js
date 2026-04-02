export const baseUrl = __ENV__.API_URL;

export const formatDate = (date, withTime = false) => {
	return !withTime ? new Date(date).toLocaleDateString() : new Date(date).toLocaleDateString('en-CA', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
};

export const copy = (text) => window.navigator.clipboard.writeText(text);
