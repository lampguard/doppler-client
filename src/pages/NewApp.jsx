import { useEffect, useState } from 'react';
import TextInput from '../components/Input/TextInput';

import { useLazyGetTeamsQuery } from '../services/teams';

const NewApp = () => {
	const [form, setForm] = useState({ title: undefined });

	const [teams, setTeams] = useState([]);

	const [trigger, { isLoading, isUninitialized }] = useLazyGetTeamsQuery();

	useEffect(() => {
		trigger()
			.unwrap()
			.then((data) => {
				// console.log(data);
				setTeams(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<div className="w-full md:p-[3em] md:pt-4">
				<div className="md:rounded-lg md:border w-full text-center">
					<p className="text-2xl py-10 md:py-[64px]">Add New App</p>
					<div className="py-3"></div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
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
							<button className="btn btn-primary w-full">Create App</button>
						</div>
						<div className="pb-[3.75rem]"></div>
					</form>
				</div>
			</div>
		</>
	);
};

export default NewApp;
