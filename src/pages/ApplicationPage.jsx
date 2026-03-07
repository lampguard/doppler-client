import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAppQuery } from '../services/apps';
import { useLazyGetMetricsForAppQuery } from '../services/metrics';
import DashboardApp from '../components/Metrics/DashboardApp';
import AppLogs, { SampleLog } from '../components/Logs';
import Skeleton from '../components/Loaders/Skeleton';
import { defaultDashboardParams } from '../config';
import { BsInfoCircle } from 'react-icons/bs';
import { copy } from '../services/util';

const ApplicationPage = () => {
	const { id } = useParams();
	const { data: app, isLoading, isSuccess } = useGetAppQuery(id);
	const [getMetrics, { isFetching: fetching }] = useLazyGetMetricsForAppQuery();

	// const [appMetrics, setMetrics] = useState([]);
	const [showSample, setShowSample] = useState(false);
	const [lock, setLock] = useState(false);

	const [tip, setTip] = useState('Click to copy');

	// useEffect(() => {
	// 	if (app) {
	// 		getMetrics({
	// 			token: app.token,
	// 			...defaultDashboardParams,
	// 		})
	// 			.unwrap()
	// 			.then((response) => {
	// 				setMetrics(response.data);
	// 			})
	// 			.catch((err) => console.error);
	// 	}
	// }, [app]);

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
						{/* <div className="px-0 pb-10 md:pb-2 md:px-2 relative min-h-[350px] rounded-md grid grid-cols-1 mb-3">
							<DashboardApp app={app} data={appMetrics} />
						</div> */}
						<div className={`grid p-1 rounded-md`}>
							<div
								className="py-2 w-full tooltip"
								data-tip={tip}
								onClick={(e) => {
									setShowSample(!showSample);
								}}
							>
								<button onClick={() => copy(app.token)} className="btn w-full btn-md relative">
									<span className="relative ">
										<BsInfoCircle
											size={16}
											className="text-theme tooltip tooltip-top hover:tooltip-open"
											data-tip="#infotip"
										/>
										{/* <span className="" id='infotip'>Click to copy</span> */}
									</span>
									Your app token is
									<span className="font-articulat-bold">{app.token}</span>
								</button>
							</div>
							<div className={`${!showSample && !lock && 'hidden'}`}>
								<SampleLog app={app} />
							</div>
						</div>
						<div>
							<AppLogs
								app={app}
								setShowSample={(t) => {
									setShowSample(t);
									setLock(t);
								}}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ApplicationPage;
