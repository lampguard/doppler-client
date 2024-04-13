import { useEffect } from 'react';
import Template from '../components/DashboardLayout/Template';
import {
	useLazyGetMetricsQuery,
	useGetMetricsQuery,
} from '../services/metrics';
import DashboardApp from '../components/Metrics/DashboardApp';
import React from 'react';

const Dashboard = () => {
	const { isLoading, data, isUninitialized } = useGetMetricsQuery();
	// useEffect(() => {
	//   trigger()
	//     .unwrap()
	//     .then((data) => console.log)
	//     .catch(console.error);
	// }, []);

	return (
		<Template title="Dashboard">
			{isLoading || isUninitialized ? (
				<div className="h-full w-full flex items-center justify-center">
					<span className="loading loading-ring loading-lg text-theme"></span>
				</div>
			) : (
				<>
					<div className="p-2 md:p-4 w-full h-full">
						{data?.map(({ app, data }) => {
							return (
								<React.Fragment key={app.id}>
									<div
										className="px-0 md:px-2 md:pt-2 md:pb-4 relative h-[25rem] rounded-md grid grid-cols-1 mb-3"
										key={app.id}
									>
										<DashboardApp app={app} data={data} />
									</div>
								</React.Fragment>
							);
						})}
					</div>
				</>
			)}
		</Template>
	);
};

export default Dashboard;
