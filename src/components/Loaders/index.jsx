/**
 * 
 * @type {React.FC<{theme: boolean}>}
 * @returns {React.ReactElement}
 */
const Loader = ({ theme = true }) => {
	return (
		<div className="h-full w-full flex items-center justify-center">
			<span className={"loading loading-ring loading-lg " + (theme ? 'text-theme' : '')}></span>
		</div>
	);
};

export default Loader;
