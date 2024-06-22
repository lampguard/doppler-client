import { useLocation } from 'react-router-dom';
import TextInput from '../components/Input/TextInput';
import { useEffect, useState } from 'react';

import { useVerifyWaitlistMutation } from '../services/waitlist';
import Loader from '../components/Loaders';
import { notification } from 'antd';

const WaitlistVerify = () => {
	const location = useLocation();

	const url = new URLSearchParams(location.search.slice(1));
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');

	const [verify, { isLoading, isError, error }] = useVerifyWaitlistMutation();

	useEffect(() => {
		setEmail(url.get('email'));
	}, []);

	return (
		<>
			<p className="text-2xl text-center">Hey there!</p>
			<p className="py-2">
				Thanks for joining the waitlist. Submit the form to get your
				personalized setup link.
			</p>

			<div className="py-2"></div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					verify({ name, email })
						.unwrap()
						.then((res) => {
							notification.info({
								message: 'A password reset mail will be sent to your inbox.',
								duration: 3,
							});
						})
						.catch((err) => {
							notification.error({
								message: err.data?.message,
								duration: 3,
							});
						});
				}}
				className=""
			>
				<div className="pb-3">
					<label htmlFor="">Your name</label>
					<TextInput
						name="name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
					/>
				</div>

				<div className="pb-3">
					<label htmlFor="">E-mail Address</label>
					<TextInput
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
				</div>

				<button className="btn w-full btn-primary" disabled={isLoading}>
					{isLoading ? <Loader /> : 'Verify'}
				</button>
			</form>
		</>
	);
};

export default WaitlistVerify;
