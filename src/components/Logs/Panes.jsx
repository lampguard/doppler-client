/**
 * @typedef {{id: number,level: string, text: string}} TLog
 *
 */

import React, { useEffect, useState } from 'react';
import { BsCaretDownFill, BsCone } from 'react-icons/bs';
import { useCreateFlagMutation } from '../../services/flags';
import { useAssignTaskMutation } from '../../services/tasks';
import { useLazyGetAppTeamsQuery } from '../../services/apps';
import { FaFlag } from 'react-icons/fa';
import { notification } from 'antd';
import Loader from '../Loaders';
import Modal from '../../components/Modal';
import { format } from 'date-fns';

/**
 * @type {React.FC<{log: TLog, appteams: any[]}>} Log
 * @returns
 */
const Log = ({ log, appteams }) => {
	const [open, setOpen] = useState(false);
	const [flag, { isLoading }] = useCreateFlagMutation();

	const [description, setDescription] = useState('');
	const [assignedTeam, setAssignTeam] = useState(undefined);
	const [assignedMember, setAssignMember] = useState(undefined);

	const [assignTask, { isLoading: assigning }] = useAssignTaskMutation();

	const submitAssignment = () => {
		return assignTask({
			log_id: log.id,
			assignment: {
				team: assignedTeam?.id,
				member: assignedMember?.id,
			},
			description: description.length == 0 ? undefined : description,
		});
	};

	return (
		<>
			<Modal
				id={`log-${log.id}`}
				className="rounded-none min-w-[67.7777%]"
				withClose
			>
				<p className="font-articulat-bold text-xl">{log.level.toUpperCase()}</p>
				<p className="line-clamp-2">
					<span className="font-articulat-bold">Time</span>:{' '}
					{format(log.createdAt, 'P HH:mm:ss a')}
				</p>
				<p className="line-clamp-2">
					<span className="font-articulat-bold">Message</span>: {log.text}
				</p>
				<div className="py-2"></div>
				<p>Select A Team to Assign To</p>
				<div className="md:flex items-start justify-start">
					<div
						className={
							(assignedTeam == undefined ? 'w-full' : 'md:w-1/3 md:border-r-2') +
							' border-black'
						}
					>
						{assignedTeam && (
							<button
								className="btn btn-xs rounded-none w-full glass text-white bg-red-500"
								onClick={() => {
									setAssignTeam(undefined);
								}}
							>
								Reset
							</button>
						)}
						{appteams.map((team) => (
							<button
								className="btn w-full rounded-none"
								onClick={() => {
									setAssignTeam(team);
									setAssignMember(undefined);
								}}
							>
								{team.name}
							</button>
						))}
					</div>
					{assignedTeam !== undefined && (
						<div className="w-full md:w-2/3 p-2">
							<p className='py-3 md:py-0'>
								Assigning to{' '}
								{assignedMember && (
									<span className="underline">{assignedMember.name} on</span>
								)}{' '}
								{assignedTeam.name}
							</p>
							<div className="py-1"></div>
							{assignedTeam.members.map((member) => (
								<label className="label" key={member.email}>
									{member.name} ({member.email})
									<input
										type="radio"
										className="checkbox radio-xs"
										name={assignedTeam.name}
										checked={assignedMember?.id == member.id}
										onChange={(e) => {
											if (e.target.checked) {
												setAssignMember(member);
											}
										}}
									/>
								</label>
							))}
						</div>
					)}
				</div>

				{assignedTeam && (
					<>
						<label className="text-sm">Description (optional)</label>
						<textarea
							className="textarea w-full textarea-bordered textarea-primary"
							placeholder="Add a Description"
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
						<button
							className="btn btn-primary w-full"
							onClick={() => {
								submitAssignment()
									.then(() => {
										setAssignMember(undefined);
										setAssignTeam(undefined);
										setDescription('');
										document.getElementById(`log-${log.id}`).close();
										notification.success({
											duration: 3,
											message: 'Task was assigned successfully',
											style: { zIndex: 100000 },
										});
									})
									.catch((err) => {
										notification.error({
											duration: 3,
											message:
												err.data?.message ||
												'Unable to assign task. Please try again.',
											style: { zIndex: 100000 },
										});
									});
							}}
						>
							{assigning ? <Loader theme={false} /> : 'Assign'}
						</button>
					</>
				)}
			</Modal>
			{open && (
				<>
					<div className={`log ${log.level} w-full px-[12px] py-2 rounded-lg`}>
						<div
							className="flex justify-between cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<span>IP Address: {log.ip}</span>
							<span>{format(log.createdAt, 'yyyy-MM-dd hh:mm:ss a')}</span>
						</div>
						<div className="w-full p-[5px] bg-gray-200 rounded min-h-[100px]">
							{log.text}
						</div>
						<div className="py-1"></div>
						<button
							className="btn btn-xs glass btn-ghost relative"
							onClick={(e) => {
								flag({
									log_id: log.id,
									reason: 'User flagged',
								})
									.unwrap()
									.then((data) => {
										notification.info({
											message: 'Okay!',
											duration: 3,
										});
									})
									.catch((err) => {
										notification.error({
											message:
												err.data.message ||
												"That didn't work. Please try again.",
											duration: 3,
										});
									});
							}}
						>
							<FaFlag /> Raise a flag
							{isLoading && <Loader theme={false} />}
						</button>
						<button
							className="btn btn-xs glass btn-ghost relative"
							onClick={(e) => {
								document.getElementById(`log-${log.id}`).showModal();
							}}
						>
							<BsCone />
							Create Task
						</button>
					</div>
				</>
			)}
			{!open && (
				<>
					<div className="flex max-w-[100%] items-center w-full border rounded-md p-0">
						<span
							className={`uppercase log ${log.level}-bg text-white px-4 py-2 rounded-md w-[20%] text-center`}
						>
							{log.level}
						</span>
						<span className="w-[70%] pl-2 truncate overflow-hidden align-middle font-articulat-light">
							{log.text}
						</span>
						<span
							className="w-[10%] grid place-items-center"
							onClick={(e) => setOpen(true)}
						>
							<BsCaretDownFill />
						</span>
					</div>
				</>
			)}
			<div className="pb-[8px]"></div>
		</>
	);
};

/**
 * @type {React.FC<{data: TLog[], app: any}>} LogPanes
 * @returns
 */
const LogPanes = ({ data, app }) => {
	const copyToken = () => {
		window.navigator.clipboard.writeText(app.token);
	};

	const [getTeams, { isLoading, data: teams, isError, error }] =
		useLazyGetAppTeamsQuery();

	const [appTeams, setAppTeams] = useState([]);

	useEffect(() => {
		getTeams(app.id)
			.unwrap()
			.then((data) => {
				setAppTeams(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="w-full md:px-6">
			{data.length < 1 ? (
				<div className="prose">
					<p>
						Your app has generated 0 logs. Copy your token to start receiving
						logs.
					</p>
					<p>
						<button
							className="btn btn-sm w-full md:w-auto not-prose"
							onClick={copyToken}
						>
							{app.token}
						</button>
					</p>
					<div className="bg-black w-full p-3 rounded-md text-white">
						<code className="not-prose text-sm">
							// Paste this code in your terminal to send a sample log
							<br />
							curl -X POST {__ENV__.API_URL}/logs --header "APP_ID: {app.token}"
							--json '
							{JSON.stringify({
								level: 'error',
								text: 'Lorem ipsum dolor sit amet.',
							})}
							'
						</code>
					</div>
					<div className="pb-4"></div>
				</div>
			) : (
				<>
					<button
						className="btn btn-sm not-prose btn-block bg-[#EBEBF5] rounded-none"
						onClick={copyToken}
					>
						{app.token}
					</button>
					<p>Latest</p>
					{data.slice(0, 5).map((log, index) => {
						return (
							<React.Fragment key={index}>
								<Log log={log} appteams={appTeams} />
							</React.Fragment>
						);
					})}
					<p>Older</p>
					{data.slice(5).map((log, index) => (
						<React.Fragment key={index + 5}>
							<Log log={log} appteams={appTeams} />
						</React.Fragment>
					))}
				</>
			)}
		</div>
	);
};

export default LogPanes;
