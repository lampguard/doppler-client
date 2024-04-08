/**
 * @type {React.FC<{type:React.HTMLInputTypeAttribute | undefined, placeholder?: string, className?: string, name?: string, onChange: (e: React.ChangeEventHandler<HTMLInputElement>) => void, value?: any}>}
 */
export default ({
	type = 'text',
	placeholder,
	className = '',
	name,
	onChange,
	value = '',
}) => {
	return (
		<>
			<input
				type={type}
				className={
					'font-[230] w-[100%] p-2 border rounded-md pl-5 ' + className
				}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
			/>
		</>
	);
};
