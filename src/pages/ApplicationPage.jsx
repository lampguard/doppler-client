import { useEffect, useState } from 'react';
import Loader from '../components/Loaders';
import { useGetAppQuery, useLazyGetLogsQuery } from '../services/apps';
import { useParams } from 'react-router-dom';
import LogPanes from '../components/Logs/Panes';

const ApplicationPage = () => {
	const { id } = useParams();
	const { isLoading, isSuccess } = useGetAppQuery(id);

	const [logs, setLogs] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(20);

	const [getLogs, { isUninitialized, isLoading: loading }] =
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
			})
			.catch((err) => console.error);
	}, []);

	return (
		<>
			{isSuccess && (
				<div className="container p-3">
					<LogPanes data={logs} />
				</div>
			)}
			{(isLoading || loading || isUninitialized) && <Loader />}
		</>
	);
};

export default ApplicationPage;
