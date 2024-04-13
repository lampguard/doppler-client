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
	const [total, setTotal] = useState(0);

	const [
		getLogs,
		{ isUninitialized, isLoading: loading, isSuccess: success, isFetching },
	] = useLazyGetLogsQuery();

	const loadMore = () => {
		getLogs({
			page: page + 1,
			id,
			count,
		})
			.unwrap()
			.then((response) => {
				setLogs([...logs, ...response.data]);

				if (response.data.length > 0) {
					setPage(Number(response.page));
				}
			})
			.catch((err) => {});
	};

	useEffect(() => {
		getLogs({
			page,
			count,
			id,
		})
			.unwrap()
			.then((response) => {
				setLogs(response.data);
				setTotal(response.total);
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
				<>
					<div className="container p-3" id="loglist">
						<LogPanes data={logs} app={app} />
						{isFetching && <Loader />}
						<button className="btn btn-sm w-full" onClick={loadMore}>
							Load More
						</button>
					</div>
				</>
			)}
			{(isLoading || isUninitialized) && <Loader />}
		</>
	);
};

export default ApplicationPage;
