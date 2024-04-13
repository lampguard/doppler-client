import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loaders';
import { useGetAppQuery, useLazyGetLogsQuery } from '../services/apps';
import { useParams } from 'react-router-dom';
import LogPanes from '../components/Logs/Panes';
import PageContext from '../context/PageContext';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isError, isSuccess } = useGetAppQuery(id);

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
			{(isLoading || loading) && <Loader />}
		</>
	);
};

export default ApplicationPage;
