import { useEffect, useState } from 'react';
import TextInput from '../components/Input/TextInput';
import { useLazyGetAppsQuery } from '../services';
import { useNewTeamMutation } from '../services/teams';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loaders';

import { notification } from 'antd';

const NewTeam = () => {
	const [teamForm, setTeamForm] = useState({
		name: '',
	});
	const [apps, setApps] = useState([]);
	const [getApps] = useLazyGetAppsQuery();
	const [selectedApps, setSelection] = useState([]);
	const navigate = useNavigate();

	const [newTeam, { isLoading }] = useNewTeamMutation();

	const addApp = (e) => {
		const { value } = e.target;
		if (selectedApps.includes(value)) {
			// selectedApps = selectedApps.filter((app) => app.id != value);
			setSelection(selectedApps.filter((app) => app.id != value));
		} else {
			// selectedApps = [...selectedApps, Number(value)];
			setSelection([...selectedApps, Number(value)]);
		}
	};

	useEffect(() => {
		getApps()
			.unwrap()
			.then(({ data }) => {
				setApps(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<div className="w-full md:p-[3em] md:pt-4">
				<div className="md:rounded-lg md:border w-full text-center pb-12">
					<p className="text-2xl py-4 md:py-[64px]">Create New Team</p>
					<div className="py-3"></div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							newTeam({
								...teamForm,
								apps: selectedApps,
							})
								.unwrap()
								.then((response) => {
									notification.success({
										message: 'App created successfully',
										duration: 3,
									});
									navigate(`/teams/${response.id}`);
								})
								.catch((err) => {
									console.error(err);
									notification.error({
										message: err?.dsata?.message || 'An error occurred',
										duration: 3,
									});
									setTimeout(() => navigate('/dashboard'), 1000);
								});
						}}
					>
						<div className="px-6 pb-12 md:pb-6 text-left">
							<label>Team Name</label>
							<div className="py-1"></div>
							<TextInput
								value={teamForm.name}
								onChange={(e) => {
									setTeamForm({ ...teamForm, name: e.target.value });
								}}
								placeholder="Team Name"
								required
							/>
						</div>
						<div className="px-8">
							<p className="text-2xl py-8">Add Apps</p>
							<div className="py-1"></div>

							<div className="text-left">
								{apps.length > 0 ? (
									apps.map((app) => (
										<>
											<label
												className="flex justify-between w-full"
												key={app.title}
											>
												<span>{app.title}</span>
												<input
													type="checkbox"
													name="apps"
													value={app.id}
													className="checkbox checkbox-xs"
													onChange={addApp}
													checked={selectedApps.includes(Number(app.id))}
												/>
											</label>
											<div className="pb-3"></div>
										</>
									))
								) : (
									<>
										<p className="text-center">
											You haven't created any apps yet. Why are you even
											creating teams?
										</p>
									</>
								)}
							</div>
						</div>

						<div className="px-6 pt-8">
							<button className="btn btn-primary w-full" disabled={isLoading}>
								{isLoading ? <Loader /> : <>Create Team</>}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default NewTeam;
