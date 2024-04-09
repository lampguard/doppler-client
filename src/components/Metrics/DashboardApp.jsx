import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	AreaChart,
	Area,
} from 'recharts';

/**
 * @type {React.FC<{app: Partial<{title: string}>, data: {
 *  info: {time: string, key: string}[]
 * }}>} DashboardApp
 */
const DashboardApp = ({ app, data }) => {
	return (
		<>
			<h1 className="font-bold">{app.title}</h1>
			<div className="py-3">
				<AreaChart width={800} height={400} data={data.info}>
					{/* <Line type={'monotone'} dataKey={'key'} stroke="#8884d8" /> */}
					<Area
						dataKey={'sum'}
						points={(data.info.map((r) => ({ x: r.key, y: r.sum }))}
						activeDot={true}
					/>
					<CartesianGrid />
					<XAxis dataKey={'key'} />
					<YAxis dataKey={'sum'} />
				</AreaChart>
			</div>
			<p>{JSON.stringify(data.info)}</p>
		</>
	);
};

export default DashboardApp;
