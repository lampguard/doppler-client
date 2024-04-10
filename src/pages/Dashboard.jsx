import { useEffect } from 'react';
import Layout from '../components/DashboardLayout/Template';
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
		<Layout title="Dashboard">
			{isLoading || isUninitialized ? (
				<div className="h-full w-full flex items-center justify-center">
					<span className="loading loading-ring loading-lg text-theme"></span>
				</div>
			) : (
				<>
					<div className="p-4 w-full h-full">
						{data?.map(({ app, data }) => {
							return (
								<React.Fragment key={app.id}>
									<div
										className="border p-4 grid grid-cols-1 h-[25rem]"
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
		</Layout>
	);
};

export default Dashboard;
