import React from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

function Linegraph() {
	const data = [
		{
			time: "12:00:00",
			dock_gate: 4000,
			person: 1100,
			security: 0,
			violation: 4000,
		},
		{
			time: "13:00:00",
			// uv: 3000,
			dock_gate: 3000,
			person: 1398,
			security: 900,
			violation: 3000,
		},
		{
			time: "14:00:00",
			// uv: 2000,
			dock_gate: 2000,
			person: 1800,
			security: 1800,
			violation: 2000,
		},
		{
			time: "15:00:00",
			// uv: 2780,
			dock_gate: 4000,
			person: 0,
			security: 2500,
			violation: 0,
		},
	];
	return (
		<div style={{ marginTop: "9vh", backgroundColor: "white", padding: "2vh" }}>
			<LineChart
				width={600}
				height={300}
				data={data}
				// margin={{
				// 	top: 5,
				// 	right: 30,
				// 	left: 20,
				// 	bottom: 5,
				// }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line dataKey="dock_gate" fill="#8884d8" />
				<Line dataKey="person" fill="#82ca9d" />
				<Line dataKey="security" fill="orange" />
				<Line dataKey="violation" fill="skyblue" />
			</LineChart>
		</div>
	);
}

export default Linegraph;
