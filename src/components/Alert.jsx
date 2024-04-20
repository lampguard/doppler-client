const Alert = ({ className = '', children }) => {
	return (
		<div className="toast toast-end toast-top z-50 max-w-full">
			<div role="alert" className={'max-w-full alert ' + className}>
				{/* <span>12 unread messages. Tap to see.</span> */}
				{children}
			</div>
		</div>
	);
};

export default Alert;
