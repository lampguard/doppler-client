import React from 'react';
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
	return (
		<>
			<h1 className="font-articulat-bold">{app.title}</h1>
			<ResponsiveContainer width="100%" height="100%">
				{/* <AreaChart
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="info"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="debug"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="critical"
            stackId="1"
            stroke="#000000"
            fill="#000000"
          />
          <Area
            type="monotone"
            dataKey="error"
            stackId="1"
            stroke="#F17A7A"
            fill="#F17A7A"
          />
          <Area
            type="monotone"
            dataKey="fatal"
            stackId="1"
            stroke="#FF0000"
            fill="#FF0000"
          />
        </AreaChart> */}
				<LineChart
					width={500}
					height={400}
					data={
						data && data.length > 0
							? data
							: [defaultLine, defaultLine, defaultLine, defaultLine]
					}
					margin={{
						top: 0,
						right: 10,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="time" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey={'info'}
						stroke="#8884d8"
						fill="#8884d8"
					/>
					<Line
						type="monotone"
						dataKey={'error'}
						stroke="#F17A7A"
						fill="#F17A7A"
					/>
					<Line
						type="monotone"
						dataKey={'fatal'}
						stroke="#FF0000"
						fill="#F17A7A"
					/>
					<Line
						type="monotone"
						dataKey={'debug'}
						stroke="#82ca9d"
						fill="#F17A7A"
					/>
					<Line
						type="monotone"
						dataKey={'critical'}
						stroke="#000"
						fill="#000"
					/>
				</LineChart>
			</ResponsiveContainer>
			{/* <p>{JSON.stringify(data.info)}</p> */}
		</>
	);
};

export default DashboardApp;
