import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/Input/TextInput';

import { useLazyGetTeamsQuery } from '../services/teams';
import { useCreateAppMutation } from '../services/apps';
import Loader from '../components/Loaders';

const NewApp = () => {
	const [form, setForm] = useState({ title: undefined });
	const navigate = useNavigate();

	const [teams, setTeams] = useState([]);

	const [trigger, { isLoading, isUninitialized }] = useLazyGetTeamsQuery();

	const [create, { isLoading: loading, isUninitialized: uninitialized }] =
		useCreateAppMutation();

	useEffect(() => {
		trigger()
			.unwrap()
			.then((data) => {
				setTeams(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const createApp = () => {
		create(form)
			.unwrap()
			.then((response) => {
				navigate('/apps');
			})
			.catch((err) => console.error);
	};

	return (
		<>
			<div className="w-full md:p-[3em] md:pt-4">
				<div className="md:rounded-lg md:border w-full text-center">
					<p className="text-2xl py-10 md:py-[64px]">Add New App</p>
					<div className="py-3"></div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							createApp();
						}}
						className="text-left"
					>
						<div className="px-6">
							<label htmlFor="">App Name</label>
							<div className="py-1"></div>
							<TextInput
								placeholder="App Name"
								onChange={(e) => setForm({ ...form, title: e.target.value })}
								value={form.title}
							/>
							<div className="py-3"></div>
							<button className="btn btn-primary w-full" disabled={loading}>
								{loading ? <Loader /> : <>Create App</>}
							</button>
						</div>
						<div className="pb-[3.75rem]"></div>
					</form>
				</div>
			</div>
		</>
	);
};

export default NewApp;
