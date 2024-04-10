/**
 * @type {React.FC<{type:React.HTMLInputTypeAttribute | undefined, placeholder?: string, className?: string, name?: string, onChange: (e: React.ChangeEventHandler<HTMLInputElement>) => void, value?: any, required?: boolean}>}
 */
export default ({
	type = 'text',
	placeholder,
	className = '',
	name,
	onChange,
	value = '',
	required = false
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
				required={required}
			/>
		</>
	);
};
