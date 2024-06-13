import React, { useEffect, useState } from "react";
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
import { BarGraphList } from "../../services/Graph";

function Bargraph() {
	const [value, setValue] = useState([]);

	const getBarGraphList = async () => {
		let apiData = await BarGraphList();
		setValue(apiData);
	};

	useEffect(() => {
		getBarGraphList();
	}, []);
	const data = [
		{
			name: "Dock_gate",
			dock_gate: 400,
		},
		{
			name: "Person",
			// uv: 3000,
			person: 398,
		},
		{
			name: "Security",
			// uv: 2000,
			security: 800,
		},
		{
			name: "Violation",
			// uv: 2780,
			violation: 908,
		},
	];
	return (
		<div style={{ backgroundColor: "white", padding: "2vh", display: "flex" }}>
			<BarChart width={1500} height={300} data={value}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="Intrusiondetected" fill="#8884d8" barGap={2} />
				<Bar dataKey="officeareatimerestriction" fill="#8884d8" barGap={2} />
				<Bar dataKey="entry" fill="#8884d8" />
				<Bar dataKey="exit" fill="#8884d8" />
				<Bar dataKey="loitering" fill="#8884d8" />
				<Bar dataKey="personwithouthelmet" fill="#ff5733" />
				<Bar dataKey="personwithouthelmet&vest" fill="#ff5733" />
				<Bar dataKey="emergencyExitBayInterruption" fill="#ff5733" />
			</BarChart>
		</div>
	);
}

export default Bargraph;
