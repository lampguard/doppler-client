import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, subDays } from 'date-fns';

import {
	useGetAppQuery,
	useLazyGetLogsQuery,
	useDeleteLogsMutation,
} from '../services/apps';
import { useLazyGetMetricsForAppQuery } from '../services/metrics';
import DashboardApp from '../components/Metrics/DashboardApp';
import Loader from '../components/Loaders';
import LogPanes from '../components/Logs/Panes';
import Modal from '../components/Modal';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isSuccess } = useGetAppQuery(id);
	const [getMetrics, { isFetching: fetching }] = useLazyGetMetricsForAppQuery();
	const [
		getLogs,
		{ isUninitialized, isLoading: loading, isSuccess: success, isFetching },
	] = useLazyGetLogsQuery();
	const [deleteLogs, { isFetching: deleting, isLoading: loadingDelete }] =
		useDeleteLogsMutation();

	const [appMetrics, setMetrics] = useState([]);
	const [logs, setLogs] = useState([]);
	const [page, setPage] = useState(1);
	const count = 20;

	const fetchLogs = (data, append = false) => {
		getLogs({
			...data,
			id: id,
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

	useEffect(() => {
		fetchLogs({
			page: 1,
			count,
		});
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

	const clearLogs = () => {
		deleteLogs(id)
			.unwrap()
			.then((response) => {
				fetchLogs({ page: 1, count: 20 });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			{isSuccess && success && (
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
