import { useLazyGetLogsQuery, useDeleteLogsMutation, useGetAppTeamsQuery } from '../../services/apps';
import { useState, useEffect } from 'react';
import Modal from '../Modal';
import Log from './Log';

import io from 'socket.io-client';
import Loader from '../Loaders';
import Skeleton from '../Loaders/Skeleton';
import { copy } from '../../services/util';
import { notification } from 'antd';

const wsUrl = __ENV__.WS_URL;

const socket = io(wsUrl, {
	autoConnect: false,
});

export const SampleLog = ({ app }) => {
	const cmd = `curl -X POST ${__ENV__.WS_DISPLAY_URL} --header "APP_ID: ${app?.token}" --json '${JSON.stringify({
		level: 'info',
		text: 'This is a sample info log',
	})}'`;

	return (
		<div className="m-auto prose min-w-full">
			{/* <p>
				Your app has generated 0 logs. Copy your token to start receiving logs.
			</p> */}
			<div
				className="text-left bg-black btn hover:bg-black h-fit w-full p-3 rounded-md text-white tooltip tooltip-bottom"
				data-tip="Click to copy"
				onClick={() => copy(cmd)}
			>
				<code className="not-prose text-sm">
					// Paste this code in your terminal to send a sample log
					<br />
					{cmd}
				</code>
			</div>
			<div className="pb-4"></div>
		</div>
	);
};

const LogSkeleton = () => (
	<div className="join gap-1 w-full border p-0.5">
		<Skeleton className="h-9 w-1/4 rounded-md bg-gray-200" />
		<Skeleton className="h-9 w-full rounded-md bg-gray-100 border-black" />
	</div>
);

const AppLogs = ({ app, setShowSample }) => {
	const [logs, setLogs] = useState([]);
	const [cursor, setCursor] = useState(null);
	const count = 20;

	const { data: appteams } = useGetAppTeamsQuery(app.id);

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}

		socket.on('connect', () => {
			socket.emit('connect-log-stream', app.token);
		});

		socket.on('log', (data) => {
			const log = JSON.parse(data);
			log.createdAt = new Date(log.createdat);
			setLogs((prev) => [log, ...prev]);
			console.log(log);
		});

		return () => {
			socket.emit('closing_stream', app.token);
			socket.disconnect();
		};
	}, [socket]);

	const [getLogs, { isLoading: loading, isFetching }] = useLazyGetLogsQuery();

	const [deleteLogs, { isFetching: deleting, isLoading: loadingDelete }] = useDeleteLogsMutation();

	const fetchLogs = (data, append = false) => {
		getLogs({
			...data,
			id: app.token,
		})
			.unwrap()
			.then((response) => {
				if (append) {
					setLogs([...logs, ...response.data.logs]);
				} else {
					setLogs([...response.data.logs]);
				}

				setCursor(Number(response.data.logs[response.data.logs.length - 1].id));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const loadMore = () => {
		fetchLogs({ cursor, count }, true);
	};

	const clearLogs = () => {
		deleteLogs(app.token)
			.unwrap()
			.then((response) => {
				notification.success({
					message: 'Success',
					duration: 3,
				});
				setLogs([]);
				setCursor(null);
				fetchLogs({ cursor, count: 20 });
			})
			.catch((err) => {
				notification.error({
					message: err?.data.message || 'An error occurred',
					duration: 3,
				});
				console.error(err);
			});
	};

	useEffect(() => {
		if (logs.length == 0) {
			setShowSample(true);
		} else {
			setShowSample(false);
		}
	}, [logs]);

	useEffect(() => {
		fetchLogs({ cursor, count });
	}, []);

	return (
		<>
			<Modal id="modal1" withClose>
				<p>Are you sure? This will delete any logs that don't have tasks assigned to them.</p>
				<button className="btn btn-sm btn-primary" onClick={clearLogs} disabled={deleting}>
					{deleting || loadingDelete ? <Loader /> : "Yes, I'm sure"}
				</button>
			</Modal>

			{loading ? (
				<div className="pb-4">
					<p className="mb-2">Latest</p>
					{Array(4)
						.fill(0)
						.map(({ v, i }) => (
							<div className="mb-1" key={i}>
								<LogSkeleton />
							</div>
						))}
				</div>
			) : (
				logs.length > 0 && (
					<>
						<p className="pb-2">Latest</p>
						{logs.map((log) => (
							<Log log={log} key={log.id} appteams={appteams} />
						))}

						<button className="btn btn-sm w-full" onClick={loadMore}>
							{loading || isFetching ? <Loader /> : 'Load More'}
						</button>
					</>
				)
			)}
		</>
	);
};

export default AppLogs;
