import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAppQuery } from '../services/apps';
import { useLazyGetMetricsForAppQuery } from '../services/metrics';
import DashboardApp from '../components/Metrics/DashboardApp';
import AppLogs from '../components/Logs';
import Skeleton from '../components/Loaders/Skeleton';
import { defaultDashboardParams } from '../config';
import { BsInfoCircle } from 'react-icons/bs';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isSuccess } = useGetAppQuery(id);
	const [getMetrics, { isFetching: fetching }] = useLazyGetMetricsForAppQuery();

	const [appMetrics, setMetrics] = useState([]);

	const copyToken = (e) => {
		window.navigator.clipboard.writeText(app.token);
	};

	useEffect(() => {
		if (app) {
			getMetrics({
				token: app.token,
				...defaultDashboardParams,
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
			{isLoading && (
				<div className="p-4">
					<Skeleton className="w-full h-64 rounded-none" />
				</div>
			)}
			{app && (
				<>
					<div className="py-3 md:px-4 gap-4 max-w-full">
						<div className="flex items-center justify-between md:px-4 md:pt-4">
							<h1 className="text-xl pb-2">{app.title}</h1>
							<button
								className="btn btn-sm btn-outline bg-red-500 text-white rounded-full right"
								onClick={() => document.getElementById('modal1').showModal()}
							>
								Clear Logs
							</button>
						</div>
						<div className="px-0 pb-10 md:pb-2 md:px-2 relative min-h-[350px] rounded-md grid grid-cols-1 mb-3">
							<DashboardApp app={app} data={appMetrics} />
						</div>
						<div className="py-2">
							<button
								onClick={copyToken}
								className="btn w-full btn-md relative"
							>
								<span className="relative ">
									<BsInfoCircle
										size={16}
										className="text-theme tooltip tooltip-top hover:tooltip-open"
										data-tip="#infotip"
									/>
									{/* <span className="" id='infotip'>Click to copy</span> */}
								</span>
								{app.token}
							</button>
						</div>
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
