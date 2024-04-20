/**
 *
 * @type {React.FC<{className: string}>} DotLoader
 */
const DotLoader = ({ className = '' }) => {
	<span className={'loading loading-dots ' + className}></span>;
};

export default DotLoader;
