import { useEffect, useState } from 'react';
import Loader from '../components/Loaders';
import { useGetAppQuery, useLazyGetLogsQuery } from '../services/apps';
import { useParams } from 'react-router-dom';
import LogPanes from '../components/Logs/Panes';

import ws from '../services/socket';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isSuccess } = useGetAppQuery(id);

	const socket = ws();

	const [logs, setLogs] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(20);

	const [getLogs, { isUninitialized, isLoading: loading, isSuccess: success }] =
		useLazyGetLogsQuery();

	useEffect(() => {
		getLogs({
			page,
			count,
			id,
		})
			.unwrap()
			.then((response) => {
				setLogs([...logs, ...response.data]);

				window.addEventListener('scroll', (e) => {
					console.log("scrolled:", window.scrollY);
					console.log(window.innerHeight);
				});
			})
			.catch((err) => console.error);
	}, []);

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		socket.emit('connect-log-stream', app?.token);
	// 		socket.on('log', (data) => {
	// 			console.log(data);
	// 		});

	// 		return () => {
	// 			socket.off('log');
	// 		};
	// 	}
	// }, [isSuccess]);

	return (
		<>
			{isSuccess && success && (
				<div className="container p-3">
					<LogPanes data={logs} app={app} />
				</div>
			)}
			{(isLoading || loading || isUninitialized) && <Loader />}
		</>
	);
};

export default ApplicationPage;
