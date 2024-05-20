/**
 * @typedef {{id: number,level: string, text: string}} TLog
 *
 */

import React, { useEffect, useState } from 'react';
import { BsCaretDownFill, BsCone } from 'react-icons/bs';
import { useCreateFlagMutation } from '../../services/flags';
import { useAssignTaskMutation } from '../../services/tasks';
import { useLazyGetAppTeamsQuery } from '../../services/apps';
import { useLazyAnalyseQuery } from '../../services/ai';
import { FaFlag, FaChartLine } from 'react-icons/fa';
import { notification } from 'antd';
import Loader from '../Loaders';
import Modal from '../../components/Modal';
import Report from './Report';
import { format } from 'date-fns';
import { FaList } from 'react-icons/fa6';
import Skeleton from '../Loaders/Skeleton';

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

	const [reporting, setReporting] = useState(undefined);

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

	const [analyse, { isLoading: analysing, isSuccess: analysed }] =
		useLazyAnalyseQuery();
	const [analysis, setAnalysis] = useState(undefined);

	const requestAnalysis = () => {
		analyse(reporting?.id)
			.unwrap()
			.then(({ response }) => {
				setAnalysis(response);
			})
			.catch((err) => {
				notification.error({
					message: err.data.error,
					duration: 5,
				});
			});
	};

	return (
		<>
			<Modal
				id={`log-${log.id}`}
				className="rounded-none min-w-[72.5%] px-10"
				withClose
			>
				<p className="font-articulat-bold text-xl py-5">
					{log.level.toUpperCase()}
				</p>
				<p className="line-clamp-2 pb-5">
					<span className="text-gray-500">Time</span>:{' '}
					{format(log.createdAt, 'P HH:mm:ss a')}
				</p>
				<p className="line-clamp-2 pb-5">
					<span className="text-gray-500">Message</span>: {log.text}
				</p>
				<div className="py-2"></div>
				<div className="md:flex items-stretch justify-start bg-[#EBEBF5]">
					<div className="md:w-[40%] md:border-r border-black px-4 py-5">
						<p className="py-2">Select a team to assign</p>
						{appteams.map((team) => (
							<label
								htmlFor=""
								key={team.id}
								className="w-full flex items-center"
							>
								<input
									type="checkbox"
									name="active-team"
									className="checkbox checkbox-xs mr-4"
									onChange={(e) => {
										if (e.target.checked) {
											setAssignTeam(team);
											setAssignMember(undefined);
										} else {
											setAssignTeam(undefined);
											setAssignMember(undefined);
										}
									}}
									checked={assignedTeam?.id == team.id}
								/>
								{team.name}
							</label>
						))}
					</div>

					<div className="w-full md:w-2/3 p-5">
						<p className="py-2">
							<strong className="font-articulat-bold">
								{assignedTeam?.name}
							</strong>
						</p>
						<div className="py-1"></div>
						{assignedTeam?.members.map((member) => (
							<label className="label" key={member.email}>
								<span>
									{member.name}{' '}
									<span className="hidden md:inline">({member.email})</span>
								</span>
								<input
									type="checkbox"
									className="checkbox checkbox-xs"
									name={assignedTeam?.name}
									checked={assignedMember?.id == member.id}
									onChange={(e) => {
										if (e.target.checked) {
											setAssignMember(member);
										} else {
											setAssignMember(undefined);
										}
									}}
								/>
							</label>
						))}
					</div>
				</div>

				{assignedTeam && (
					<>
						<div className="py-2"></div>
						<label className="text-sm">
							Description <span className="text-gray-500">(optional)</span>
						</label>
						<div className="py-2"></div>
						<textarea
							className="textarea w-full textarea-bordered border-[#EBEBF5] textarea-primary"
							rows={5}
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
						<div className="py-2"></div>
						<button
							className="btn btn-primary w-full"
							onClick={() => {
								submitAssignment()
									.then((res) => {
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
							{assigning ? <Loader theme={false} /> : 'Assign Task'}
						</button>
					</>
				)}
			</Modal>
			<Modal
				id={`log-report-${log.id}`}
				className="rounded-sm w-full md:min-w-[75%]"
			>
				{reporting && (
					<>
						<Report log={reporting} />
						<div className="py-2"></div>
						<button
							className="btn btn-primary"
							disabled={analysing}
							onClick={requestAnalysis}
						>
							{analysing ? 'Getting Analysis' : 'Request Analysis'}
						</button>
						<div className="py-2">
							{analysing ? (
								<Skeleton className="rounded-sm w-full h-8" />
							) : analysed ? (
								<div className="p-2 bg-black text-white">
									<p className='underline italic'>Christian Doppler says:</p>
									<p className="text-white text-[0.8em]">
										{analysis}
									</p>
								</div>
							) : null}
						</div>
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
						<div className="py-1 flex justify-between">
							<button
								className="btn btn-xs glass btn-ghost relative"
								onClick={(e) => {
									document.getElementById(`log-${log.id}`).showModal();
								}}
							>
								{/* <BsCone /> */}
								<FaChartLine />
								Create Task
							</button>
							<button
								className="btn btn-xs glass btn-ghost relative"
								onClick={(e) => {
									setReporting(log);
									document.getElementById(`log-report-${log.id}`).showModal();
								}}
							>
								<FaList /> View Report
								{isLoading && <Loader theme={false} />}
							</button>
						</div>
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
							curl -X POST https://api.dopple.cc/v1/logs --header "APP_ID:{' '}
							{app.token}" --json '
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
