import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Legend,
	Line,
} from 'recharts';

const defaultLine = {
	info: 0,
	error: 0,
	fatal: 0,
	debug: 0,
	critical: 0,
	time: new Date().toLocaleDateString(),
};

const DashboardApp = ({ app, data }) => {
	const [visibleCharts, setCharts] = useState([
		{
			type: 'info',
			color: '#8884d8',
			visible: true,
		},
		{
			type: 'error',
			color: '#F17A7A',
			visible: true,
		},
		{
			type: 'fatal',
			color: '#FF0000',
			visible: true,
		},
		{
			type: 'debug',
			color: '#82ca9d',
			visible: true,
		},
		{
			type: 'critical',
			color: '#000000',
			visible: true,
		},
	]);

	const toggleChart = (type) => {
		setCharts(
			visibleCharts.map((chart) => {
				if (chart.type == type) {
					chart.visible = !chart.visible;
				}
				return chart;
			})
		);
	};

	return (
		<>
			<Link to={`/apps/${app.id}`}>
				<h1 className="font-articulat-bold">{app.title}</h1>
			</Link>
			<div className="md:flex items-center max-h-[300px] md:max-h-none">
				<ResponsiveContainer width="100%" height="100%" debounce={2}>
					<AreaChart
						width={500}
						height={400}
						data={data || []}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="5" />
						<XAxis dataKey="time" />
						<YAxis />
						<Tooltip />
						{visibleCharts.map(({ type, color, visible }, index) => {
							if (visible) {
								return (
									<Area
										key={index}
										type="monotone"
										dataKey={type}
										stackId="1"
										stroke={color}
										fill={color}
									/>
								);
							}
						})}
					</AreaChart>
				</ResponsiveContainer>

				<div className="flex items-center justify-center md:flex-col md:w-[10%] md:p-0">
					{visibleCharts.map(({ type, color, visible }) => {
						return (
							<span
								key={type}
								className="text-xs pb-[0.5em] w-full hover:bg-[#ccc] cursor-pointer"
								onClick={(e) => toggleChart(type)}
							>
								<FaEye color={visible ? color : '#ccc'} className="inline" />{' '}
								<span className="text-base">{type}</span>
							</span>
						);
					})}
				</div>
			</div>
			{/* <p>{JSON.stringify(data.info)}</p> */}
		</>
	);
};

export default DashboardApp;
