import {
	useLazyGetLogsQuery,
	useDeleteLogsMutation,
} from '../../services/apps';
import { useState, useEffect } from 'react';
import Modal from '../Modal';
import Log from './Log';

import io from 'socket.io-client';
import Loader from '../Loaders';

const wsUrl = __ENV__.WS_URL;

const socket = io(wsUrl, {
	autoConnect: false,
});

const AppLogs = ({ app }) => {
	const [logs, setLogs] = useState([]);
	const [page, setPage] = useState(1);
	const count = 20;

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}

		socket.on('connect', () => {
			socket.emit('connect-log-stream', app.token);
			console.log('connected');
		});

		socket.on('log', (data) => {
			data.createdAt = new Date(data.createdat);
			setLogs((prev) => [data, ...prev]);
		});

		return () => {
			socket.emit('closing_stream', app.token);
			socket.disconnect();
		};
	}, [socket]);

	const [
		getLogs,
		{ isUninitialized, isLoading: loading, isSuccess: success, isFetching },
	] = useLazyGetLogsQuery();

	const [deleteLogs, { isFetching: deleting, isLoading: loadingDelete }] =
		useDeleteLogsMutation();

	const fetchLogs = (data, append = false) => {
		getLogs({
			...data,
			id: app.id,
		})
			.unwrap()
			.then((response) => {
				if (append) {
					setLogs([...logs, ...response.data]);
				} else {
					setLogs([...response.data]);
				}
				setPage(Number(response.page));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const loadMore = () => {
		fetchLogs(
			{
				page: page + 1,
				count,
			},
			true
		);
	};

	const clearLogs = () => {
		deleteLogs(app.id)
			.unwrap()
			.then((response) => {
				setLogs([]);
				fetchLogs({ page: 1, count: 20 });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchLogs({
			page: 1,
			count,
		});
	}, []);

	return (
		<>
			<Modal id="modal1" withClose>
				<p>Are you sure? This will delete all your logs.</p>
				<button
					className="btn btn-sm btn-primary"
					onClick={clearLogs}
					disabled={deleting}
				>
					{deleting || loadingDelete ? <Loader /> : "Yes, I'm sure"}
				</button>
			</Modal>

			<div className="flex justify-end md:px-4 md:pt-4">
				<button
					className="btn btn-sm btn-outline bg-red rounded-full right"
					onClick={() => document.getElementById('modal1').showModal()}
				>
					Clear Logs
				</button>
			</div>
			<div className="py-2"></div>

			{logs.map((log, i) => (
				<Log log={log} key={i} />
			))}
		</>
	);
};

export default AppLogs;
