import { useEffect, useRef } from 'react';
import { useCompleteOnboardingMutation, useGetAuthQuery } from '../services';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loaders';

const Onboarding = () => {
	const [complete, { isLoading }] = useCompleteOnboardingMutation();
	const navigate = useNavigate();

	const { data, isError, isSuccess } = useGetAuthQuery();

	useEffect(() => {
		if (isError) {
			navigate('/login');
		}
		if (data) {
			const { user } = data.data;
			if (user.details?.id != null) {
				navigate('/dashboard');
			}
		}

		return () => {};
	}, [data, isError, isSuccess]);

	const formRef = useRef(undefined);

	const submitForm = () => {
		const form = formRef.current;
		complete({
			industry: form.industry.value,
			role: form.role.value,
			has_used_previous_tool: form.previously_on.value,
		})
			.unwrap()
			.then(() => {
				notification.success({
					message: 'Success',
					duration: 3,
				});
				navigate('/dashboard');
			})
			.catch((err) => {
				notification.error({
					message: err.data.message,
					duration: 3,
				});
			});
	};

	return (
		<div className="md:px-4">
			<div className="text-center">
				<h1 className="text-2xl font-articulat-bold">
					Tell us a bit about you
				</h1>
				<div className="py-2"></div>
				<p className="w-3/4 m-auto">
					This questionnaire helps us to bring you the best product experiences
					and services
				</p>
			</div>
			<div className="py-4"></div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitForm();
				}}
				ref={formRef}
			>
				<div className="mb-4">
					<label className="text-md font-bold">
						What industry do you work in?
					</label>
					<div className="py-2"></div>
					<select
						className="select select-bordered block w-full select-sm"
						name="industry"
						required
					>
						<option value="1">IT/Engineering</option>
						<option value="2">Healthcare</option>
						<option value="3">Finance</option>
						<option value="4">Hospitality</option>
						<option value="5">Civil/Public Service</option>
						<option value="7">Energy</option>
						<option value="8">Manufacturing</option>
						<option value="6">Other</option>
					</select>
				</div>

				<div className="mb-4">
					<label className="text-md font-bold">
						What role do you play the most?
					</label>
					<div className="py-2"></div>
					<select
						className="select select-bordered block w-full select-sm"
						name="role"
						required
					>
						<option value="1">Developer</option>
						<option value="2">Designer</option>
						<option value="3">Product Manager</option>
						<option value="4">Project Manager</option>
						<option value="5">Devops Engineer</option>
						<option value="6">Other</option>
					</select>
				</div>

				<div className="mb-4">
					<label className="text-md font-bold">
						Have you previously used any real-time error reporting tool?
					</label>
					<div className="py-2 flex gap-x-8">
						<label>
							<input type="radio" name="previously_on" value={true} required />{' '}
							Yes
						</label>
						<label>
							<input type="radio" name="previously_on" value={false} required />{' '}
							No
						</label>
					</div>
				</div>
				<div className="py-4"></div>
				<button className="btn w-full btn-primary" disabled={isLoading}>
					{isLoading ? <Loader theme={false} /> : 'Submit'}
				</button>
			</form>
		</div>
	);
};

export default Onboarding;
