import { notification } from 'antd';
import {
	useGetAuthQuery,
	useVerifyEmailMutation,
	useLazyRequestMailVerificationQuery,
} from '../services';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loaders';
import { useEffect, useState } from 'react';
import { formatTimeStr } from 'antd/es/statistic/utils';
import { BiInfoCircle } from 'react-icons/bi';

const VerifyEmail = () => {
	const { data } = useGetAuthQuery();
	const navigate = useNavigate();

	const [coolDown, setCoolDown] = useState({ timeout: 0, tries: 0 });
	const [request, { isLoading: requesting }] =
		useLazyRequestMailVerificationQuery();
	const [verify, { isLoading }] = useVerifyEmailMutation();

	useEffect(() => {
		if (coolDown.timeout > 0) {
			setTimeout(() => {
				setCoolDown((prev) => {
					return { ...prev, timeout: prev.timeout - 1 };
				});
			}, 1000);
		}
	}, [coolDown]);

	const maskEmail = (email = '') => {
		const [one, domain] = email.split('@');

		if (!domain) return '';

		return `${one[0]}${'*'.repeat(one.length - 2)}${
			one[one.length - 1]
		}@${domain}`;
	};

	const submitCode = (code) => {
		verify({ code })
			.unwrap()
			.then(() => {
				notification.success({
					message: 'Your e-mail has been verified!',
					duration: 3,
				});
				navigate('/dashboard');
			})
			.catch((err) => {
				console.error(err);
				notification.success({
					message: 'E-mail verification failed',
					duration: 3,
				});
			});
	};

	return (
		<>
			<p className="text-center md:text-3xl">Verify Your Email</p>
			<div className="py-3"></div>

			<form
				className="grid gap-y-4"
				onSubmit={(e) => {
					e.preventDefault();
					submitCode(e.target.code.value);
				}}
			>
				<label htmlFor="">
					A verification code has been sent to your e-mail address{' '}
					<span className="text-theme hover:underline">
						{maskEmail(data?.data?.user?.email)}
					</span>
					.
				</label>
				<input
					type="text"
					className="input rounded-sm input-bordered"
					required
					name="code"
					placeholder="code here"
				/>

				<button className="btn btn-primary w-full" disabled={isLoading}>
					{isLoading ? <Loader theme={false} /> : 'Submit'}
				</button>
			</form>

			<div className="py-3"></div>
			<button
				className="btn btn-ghost text-green-700 w-full"
				disabled={isLoading || requesting}
				onClick={(e) => {
					request()
						.unwrap()
						.then(() => {
							notification.success({
								message: 'Verification mail sent. Please check your inbox.',
							});
							setCoolDown((prev) => {
								const tries = prev.tries + 1;
								return { tries: tries, timeout: tries * 10 };
							});
						});
				}}
			>
				{coolDown.timeout == 0 ? (
					requesting ? (
						<Loader theme={false} />
					) : (
						<>
							<span>Not seeing a code? Click here.</span>
						</>
					)
				) : (
					<>Try again in {formatTimeStr(coolDown.timeout * 1000, 'mm:ss')}</>
				)}
			</button>
			{coolDown.tries >= 1 && (
				<div className="text-center flex gap-x-2 justify-center py-1">
					<BiInfoCircle />
					<span className="text-xs">Are you checking your spam folder?</span>
				</div>
			)}
		</>
	);
};

export default VerifyEmail;
