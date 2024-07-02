import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from 'date-fns';
import { FaTrashAlt } from 'react-icons/fa';

import {
	useGetTeamQuery,
	useLazyGetTeamAppsQuery,
	useAddMemberMutation,
	useAddAppToTeamMutation,
} from '../services/teams';
import { useLazyGetAppsQuery } from '../services';

import Loader from '../components/Loaders';
import Skeleton from '../components/Loaders/Skeleton';
import Modal from '../components/Modal';
import TextInput from '../components/Input/TextInput';
import { usePageContext } from '../context/PageContext';
import AddNewAppModal from '../components/MyTeam/AddNewApp';
import AddNewMemberModal from '../components/MyTeam/AddNewMember';

/**
 * @type {React.FC}
 * @returns {React.ReactElement}
 */
const TeamInfo = () => {
	const { id } = useParams();
	const { data, isLoading, isError, isSuccess, isFetching } = useGetTeamQuery(id);
	const [getTeamApps, { isLoading: taLoading }] = useLazyGetTeamAppsQuery();
	const [getApps] = useLazyGetAppsQuery();

	const page = usePageContext();
	useEffect(() => {
		page.updateTitle(data?.name);
	}, [data]);

	const [teamApps, setTeamApps] = useState([]);
	const [apps, setApps] = useState([]);

	const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation();
	const [addApp, { isLoading: addAppLoading }] = useAddAppToTeamMutation();

	const [addMemberForm, setAddMemberForm] = useState({
		email: '',
		team: id,
	});
	const [addAppForm, setAddAppForm] = useState({
		app: '',
		team: id,
	});

	useEffect(() => {
		if (data) {
			getTeamApps(id)
				.unwrap()
				.then((response) => {
					setTeamApps(response);
				})
				.catch((err) => {
					console.error(err);
				});
			getApps()
				.unwrap()
				.then((response) => {
					setApps(response.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [isSuccess]);

	return (
		<>
			<div className="p-4">
				{(isLoading || isFetching) && <Skeleton className="w-full h-72" />}
				{isError && <div>Error</div>}
				{!isLoading && !isFetching && !isError && (
					<div>
						<p>Team Name</p>
						<div className="flex justify-between text-gray-500 py-4">
							<p>{data.name}</p>
							<p className="underline">Rename</p>
						</div>
						<div className="py-3"></div>
						<p>Created</p>
						<div className="pt-3"></div>
						<p className="text-gray-500">{formatDate(data.createdat, 'dd/MM/yyyy')}</p>
						<div className="pt-6">Members ( {data?.members.length} )</div>
						<div className="text-gray-500">
							{data?.members.map((member) => {
								return (
									<div className="flex justify-between py-2" key={member.email}>
										<span>{member.name}</span>
										<span className="hidden md:block">{member.email}</span>
										<span className="flex items-center gap-x-2 text-red-600">
											<FaTrashAlt /> <span>Remove</span>
										</span>
									</div>
								);
							})}
						</div>

						<div className="py-5">
							{/* <Link to={`/teams/${id}/members/add`}> */}
							<button
								className="btn btn-primary w-full md:w-1/4 rounded-full"
								onClick={() => {
									document.getElementById(`add-member-modal-${id}`).showModal();
								}}
							>
								Add New Member
							</button>
							{/* </Link> */}
						</div>

						<div className="pt-4"></div>
						<p>Apps ( {teamApps.length} )</p>
						{taLoading && (
							<>
								<Skeleton className="w-full h-8 rounded-md" />
								<div className="py-1"></div>
								<Skeleton className="w-full h-8 rounded-md" />
								<div className="py-1"></div>
								<Skeleton className="w-full h-8 rounded-md" />
							</>
						)}
						{teamApps?.map((app) => {
							return (
								<React.Fragment key={app.id}>
									<div key={app.id} className="flex justify-between text-gray-500 py-2">
										<span>{app.title}</span>
										<span>{formatDate(app.createdat, 'dd/MM/yyyy')}</span>
										<span className="flex items-center gap-x-2 text-red-600 cursor-pointer">
											<FaTrashAlt /> <span>Remove</span>
										</span>
									</div>
								</React.Fragment>
							);
						})}

						<button
							className="btn btn-primary w-full md:w-1/4 rounded-full"
							onClick={() => {
								document.getElementById(`add-app-modal-${id}`).showModal();
							}}
						>
							Add New App
						</button>
					</div>
				)}
			</div>

			{/* Add App modal */}
			<AddNewAppModal id={id} />

			<AddNewMemberModal id={id} name={data?.name} />
		</>
	);
};

export default TeamInfo;
