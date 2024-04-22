import { useState } from 'react';
import TextInput from '../components/Input/TextInput';
import Loader from '../components/Loaders';
import { useSignupMutation } from '../services';
import { Link, useNavigate } from 'react-router-dom';
import { BiInfoCircle } from 'react-icons/bi';

export default () => {
	const [form, setForm] = useState({
		name: undefined,
		email: undefined,
		password: undefined,
		password_confirmation: undefined,
	});
	const [register, { isLoading }] = useSignupMutation();
	const navigate = useNavigate();

	const signup = () => {
		register(form)
			.unwrap()
			.then(() => navigate('/'))
			.catch((err) => {
				console.error(err);
				alert(err.data?.data.message);
			});
	};

	return (
		<div className="text-center font-articulat">
			<h1 className="text-[1.5em] font-[400] tracking-[0px]">
				Create a Free Doppler Account
			</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					signup();
				}}
				className="pt-10"
			>
				<div className="text-left p-2">
					<label>E-mail Address</label>
					<p className="p-1"></p>
					<TextInput
						type="email"
						placeholder="you@example.com"
						name="email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						required
					/>
				</div>
				<div className="text-left p-2">
					<label>Full Name</label>
					<p className="p-1"></p>
					<TextInput
						placeholder="John Doe"
						name="name"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						required
					/>
				</div>
				<div className="text-left p-2">
					<label>Password</label>
					<p className="p-1"></p>
					<TextInput
						type="password"
						placeholder="*********"
						name="password"
						value={form.password}
						onChange={(e) => setForm({ ...form, password: e.target.value })}
						required
					/>
				</div>
				<div className="text-left p-2">
					<label>Confirm Password</label>
					<p className="p-1"></p>
					<TextInput
						type="password"
						placeholder="*********"
						name="password_confirmation"
						value={form.password_confirmation}
						onChange={(e) =>
							setForm({ ...form, password_confirmation: e.target.value })
						}
						required
					/>
				</div>

				<div className="py-4"></div>
				<div className="p-2">
					<button className="btn w-full btn-primary font-normal">
						{isLoading ? (
							<span className="loading loading-ring loading-lg text-white"></span>
						) : (
							'Sign up'
						)}
					</button>
					<p className="text-sm py-3 flex items-center justify-center gap-3">
						<BiInfoCircle className='text-xl text-theme'/>
						<span>
							By signing up, you agree to the{' '}
							<Link to={'/terms'} className="underline text-blue-700 hover:text-black">
								Terms & Conditions
							</Link>
						</span>
					</p>
				</div>
			</form>
		</div>
	);
};
