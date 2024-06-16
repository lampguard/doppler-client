import { useState } from 'react';
import { useJoinWaitlistMutation } from '../services';
import Loader from './Loaders';
import TextInput from './Input/TextInput';
import { notification } from 'antd';

const WaitlistForm = ({
	inputClassName = 'rounded-none border-0 focus:outline-none',
	btnClass = 'btn rounded-none min-w-[100px] border-0',
	formClass = 'flex',
}) => {
	const [email, setEmail] = useState('');
	const [waitlist, { isLoading }] = useJoinWaitlistMutation();

	const joinWaitlist = (input) => {
		waitlist({ email: input || email })
			.unwrap()
			.then((data) => {
				notification.info({
					message: data.message || 'Success!',
					duration: 3,
				});
			})
			.catch((err) => {
				notification.error({
					message: err.data?.message || 'An error occurred',
					duration: 3,
					className: 'bg-red-200 text-white',
				});
			});
	};

	return (
		<form
			className={formClass}
			onSubmit={(e) => {
				e.preventDefault();
				joinWaitlist(email);
				e.target.reset();
			}}
		>
			<TextInput
				type="email"
				required
				className={inputClassName}
				placeholder="you@beautiful.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button className={btnClass} type="submit">
				{isLoading ? (
					<Loader className="text-white" theme={false} />
				) : (
					'Join Waitlist'
				)}
			</button>
		</form>
	);
};

export default WaitlistForm;
