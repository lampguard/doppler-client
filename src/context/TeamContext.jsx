import { createContext, useContext, useState } from 'react';

export const TeamContext = createContext({});

export const TeamProvider = ({ children }) => {
	const [value, setValue] = useState({
		name: 'All Teams',
		id: 0,
	});

	const updateValue = (newValue) => {
		setValue(newValue);
	};

	return (
		<TeamContext.Provider value={{ value, updateValue }}>
			{children}
		</TeamContext.Provider>
	);
};

export const useTeamContext = () => useContext(TeamContext);
