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
										className="border md:px-2 md:pt-2 md:pb-4 relative h-[25rem] rounded-md grid grid-cols-1"
										key={app.id}
									>
										<h1 className="font-bold">{app.title}</h1>
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
