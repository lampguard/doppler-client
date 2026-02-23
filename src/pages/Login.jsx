import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../components/Input/TextInput';

import { api, useLoginMutation, useVerify2FAMutation } from '../services';
import { useEffect, useState } from 'react';
import Loader from '../components/Loaders/';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { BsInfo } from 'react-icons/bs';

const Login = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const url = new URLSearchParams(location);
	const [login, { isLoading, error, isError }] = useLoginMutation();
	const [verify, { isLoading: loading2fa, error: twofaerror }] =
		useVerify2FAMutation();
	const navigate = useNavigate();

	useEffect(() => {
		sessionStorage.clear();
		dispatch(api.util.resetApiState());

		console.log(url);

		return () => {};
	}, []);

	useEffect(() => {
		if (error?.data?.reason == 'waitlist') {
			navigate(`/waitlist-verify?email=${loginform.email}`);
		}

		return () => {};
	}, [isError]);

	const [loginform, setLoginform] = useState({
		email: undefined,
		password: undefined,
	});

	const [step2FA, setStep2FA] = useState(false);
	const [otp, setOtp] = useState('');

	const submitLogin = () => {
		login(loginform)
			.unwrap()
			.then((res) => {
				if (res.data.twoFactorEnabled) {
					setStep2FA(true);
					return;
				}
				setTimeout(() => {
					if (res.data.user?.email_verified_at == null) {
						return navigate('/verify-email');
					}
					if (res.data.user.onboardingData?.id == null) {
						return navigate('/onboarding');
					}
					return navigate('/dashboard');
				}, 1000);
			})
			.catch((err) => {
				if (err.data.reason != 'waitlist')
					notification.error({
						message: err.data.message,
						duration: 3,
					});
			});
	};

	const verify2FA = () => {
		const data = { token: otp, email: loginform.email };
		verify(data)
			.unwrap()
			.then(() => {
				navigate('/dashboard');
			})
			.catch(() => {});
	};

	return (
		<div className="text-center font-articulat">
			{step2FA ? (
				<>
					<h1 className="text-[2.0em] font-[400] tracking-[1px]">
						Two-Factor Authentication
					</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							verify2FA();
						}}
					>
						<div className="py-[36px]">
							<label htmlFor="" className="form-control">
								<div className="label">
									<span className="label-text">Enter Your Token</span>
								</div>
								<input
									type="text"
									id=""
									className="input input-bordered w-full"
									value={otp}
									minLength={6}
									placeholder="******"
									onChange={(e) => setOtp(e.target.value)}
									required
								/>
							</label>
							{twofaerror && (
								<p className="text-red-500 text-sm text-left w-full">
									{twofaerror.data.message}
								</p>
							)}
						</div>
						<div className="py-1"></div>
						<button className="btn btn-block btn-primary">
							{loading2fa ? <Loader theme={false} /> : 'Confirm Token'}
						</button>
					</form>
				</>
			) : (
				<>
					<h1 className="text-[2.0em] font-[400] tracking-[1px]">
						Login to Doppler
					</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							submitLogin();
						}}
						className="pt-10"
					>
						<div className="text-left p-2">
							<label>E-mail Address</label>
							{isError && error.data?.reason == 'email' && (
								<p className="text-md text-left text-red-500 flex items-center gap-x-2">
									<BsInfo
										size={'16px'}
										className="border-2 border-red-500 rounded-full"
									/>
									{error.data?.message}
								</p>
							)}
							<TextInput
								type="email"
								placeholder="you@example.com"
								name="email"
								value={loginform.email}
								onChange={(e) => {
									setLoginform({
										...loginform,
										email: e.target.value,
									});
								}}
								className={`${
									error?.data?.reason == 'email' && 'border-red-500'
								}`}
							/>
						</div>
						<div className="text-left p-2">
							<label>Password</label>
							{isError && error.data?.reason == 'password' && (
								<p className="text-md text-left text-red-500 flex items-center gap-x-2">
									<BsInfo
										size={'16px'}
										className="border-2 border-red-500 rounded-full"
									/>
									{error.data?.message}
								</p>
							)}
							<TextInput
								type="password"
								placeholder="*********"
								name="password"
								onChange={(e) => {
									setLoginform({
										...loginform,
										password: e.target.value,
									});
								}}
								value={loginform.password}
								className={`${
									error?.data?.reason == 'password' && 'border-red-500'
								}`}
							/>
						</div>

						<div className="py-4"></div>
						<div className="p-2">
							<button className="btn w-full btn-primary" type="submit">
								{isLoading ? (
									<span className="loading loading-ring loading-sm text-white"></span>
								) : (
									'Log In'
								)}
							</button>
						</div>

						<div className="text-center px-2">
							<Link to={'/reset-password'}>
								<button className="text-theme font-[400] w-full p-2 rounded-md hover:bg-[#000] hover:bg-opacity-[0.1]">
									Reset password
								</button>
							</Link>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

export default Login;
