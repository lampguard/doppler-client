import { useEffect, useState } from 'react';
import Loader from '../components/Loaders';
import { useGetAppQuery, useLazyGetLogsQuery } from '../services/apps';
import { useLazyGetMetricsForAppQuery } from '../services/metrics';
import { useParams } from 'react-router-dom';
import LogPanes from '../components/Logs/Panes';

import { format, subDays } from 'date-fns';
import DashboardApp from '../components/Metrics/DashboardApp';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isSuccess } = useGetAppQuery(id);
	const [getMetrics, { isFetching: fetching }] = useLazyGetMetricsForAppQuery();
	const [
		getLogs,
		{ isUninitialized, isLoading: loading, isSuccess: success, isFetching },
	] = useLazyGetLogsQuery();

	const [appMetrics, setMetrics] = useState([]);
	const [logs, setLogs] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(20);
	const [total, setTotal] = useState(0);

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
			.catch((err) => {
				console.error(err);
			});
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

	useEffect(() => {
		if (app) {
			getMetrics({
				from: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
				token: app.token,
				range: 'day',
				interval: 1,
			})
				.unwrap()
				.then((response) => {
					setMetrics(response.data);
				})
				.catch((err) => console.error);
		}
	}, [app]);

	return (
		<>
			{isSuccess && success && (
				<>
					<div className="flex justify-end md:px-4 md:pt-4">
						<div className="btn btn-sm btn-outline bg-red rounded-full right">
							Clear Logs
						</div>
					</div>
					{fetching ? (
						<Loader />
					) : (
						<>
							{appMetrics.length > 0 && (
								<div
									className="px-0 md:px-2 md:pb-4 relative min-h-[350px] rounded-md grid grid-cols-1 mb-3"
									key={app.id}
								>
									<DashboardApp app={app} data={appMetrics} />
								</div>
							)}
						</>
					)}

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
