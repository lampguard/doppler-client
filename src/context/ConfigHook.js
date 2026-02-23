import { useGetConfigQuery } from '../services';

export const useSystemConfig = () => {
	const { data: config, refetch } = useGetConfigQuery();
	return config;
};

const getConfig = () => {
	const { data: config, refetch } = useGetConfigQuery();
	return [config, refetch];
};

const isTrue = (key) => {
	const [config] = getConfig();

	if (config) {
		return config[key] == '1';
	}

	return false;
};

export const isWaitlistOpen = () => {
	const [config] = getConfig();
	if (config) {
		console.log(config);
		return config.waitlist_open == '1';
	}
	return __ENV__.WAITLISTING == 'on';
};

export const isOnboarding = () => {
	return isTrue('onboarding');
};

export const isOpen = () => {
	return isTrue('open');
};

export default getConfig;
