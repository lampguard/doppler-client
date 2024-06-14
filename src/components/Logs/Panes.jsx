/**
 * @typedef {{id: number,level: string, text: string}} TLog
 *
 */

import React, { useEffect, useRef, useState } from 'react';
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

const analysisMessages = [
	'Running analysis',
	"We're still thinking about it",
	"Hold on, we're going home",
	'This your issue strong o',
	'Jesus, what did you break',
	"Are you sure you know what you're doing?",
];

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
