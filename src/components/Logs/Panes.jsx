/**
 * @typedef {{id: number,level: string, text: string}} TLog
 *
 */

import React, { useEffect, useState } from 'react';
import { BsCaretDownFill, BsCone } from 'react-icons/bs';
import { useCreateFlagMutation } from '../../services/flags';
import {
	useLazyGetAppTeamsQuery,
} from '../../services/apps';
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

	const [assign, setAssign] = useState(undefined);

	return (
		<>
			<Modal id={`log-${log.id}`}>
				<p>{log.level.toUpperCase()}</p>
				<p>{log.text}</p>
				<div className="py-2"></div>
				<p className="text-sm">Select a team to assign </p>
				<div className="flex">
					<div className="w-1/3 border-r-2 border-black">
						{appteams?.map((team) => {
							return (
								<div key={`team-${team.id}-log-${log.id}`}>
									<label
										className="btn glass w-full rounded-none"
										onClick={() => {}}
									>
										{team.name}
										<input
											name="team"
											type="radio"
											className="radio radio-xs"
                      checked={assign?.team.id == team.id}
											onChange={(e) => {
												if (e.target.checked) {
													setAssign({
														team,
													});
												}
											}}
										/>
									</label>
								</div>
							);
						})}
					</div>

          {/* I dey go sleep */}
					<div className="w-2/3">
						{assign && (
							<form>
								{assign?.team?.members.map((member) => (
									<p>{member.name}</p>
								))}
							</form>
						)}
					</div>
				</div>
			</Modal>
			{open && (
				<>
					<div className={`log ${log.level} w-full px-[12px] py-2 rounded-lg`}>
						<div
							className="flex justify-between cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<span>IP Address: {log.ip}</span>
							<span>{format(log.createdAt, 'yyyy-MM-dd hh:ii:ss a')}</span>
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
