import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, subDays } from 'date-fns';

import {
	useGetAppQuery,
	useLazyGetLogsQuery,
	useDeleteLogsMutation,
} from '../services/apps';
import { useLazyGetMetricsForAppQuery } from '../services/metrics';
// import { useCreateFlagMutation } from '../services/flags';
import DashboardApp from '../components/Metrics/DashboardApp';
import Loader from '../components/Loaders';
import Skeleton from '../components/Loaders/Skeleton';
import LogPanes from '../components/Logs/Panes';
import Modal from '../components/Modal';
import AppLogs from '../components/Logs';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isSuccess } = useGetAppQuery(id);
	const [getMetrics, { isFetching: fetching }] = useLazyGetMetricsForAppQuery();

	const [appMetrics, setMetrics] = useState([]);

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

	// return (
	// 	<>
	// 		{isSuccess && success && (
	// 			<>
	// 				<div className="px-2 md:px-10">
	// 					{fetching ? (
	// 						<Skeleton className="w-full h-64" />
	// 					) : (
	// 						appMetrics.length > 0 && (
	// 							<div
	// 								className="px-0 pb-10 md:pb-2 md:px-2 relative min-h-[350px] rounded-md grid grid-cols-1 mb-3"
	// 								key={app.id}
	// 							>
	// 								<DashboardApp app={app} data={appMetrics} />
	// 							</div>
	// 						)
	// 					)}
	// 				</div>

	// 				<div className="container p-3" id="loglist">
	// 					<LogPanes data={logs} app={app} />
	// 					{isFetching && <Loader />}
	// 					<button className="btn btn-sm w-full" onClick={loadMore}>
	// 						Load More
	// 					</button>
	// 				</div>
	// 			</>
	// 		)}
	// 		{(isLoading || isUninitialized) && (
	// 			<div className="grid w-full h-full place-items-center">
	// 				<Loader />
	// 			</div>
	// 		)}
	// 	</>
	// );

	return (
		<>
			{app && (
				<>
					<div className="py-3 md:px-4 grid gap-4">
						<DashboardApp app={app} data={appMetrics} />
						<div>
							<AppLogs app={app} />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ApplicationPage;
