import { createContext, useContext, useState } from 'react';

const PageContext = createContext({ title: 'Doppler' });

export const PageProvider = ({ children }) => {
	const [pageTitle, setPageTitle] = useState({ title: 'Doppler' });

	const updateTitle = (title) => {
		setPageTitle({ ...pageTitle, title });
	};

	return (
		<PageContext.Provider value={{ ...pageTitle, updateTitle }}>
			{children}
		</PageContext.Provider>
	);
};

export default PageContext;
export const usePageContext = () => useContext(PageContext);
