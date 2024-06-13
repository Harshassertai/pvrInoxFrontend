/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Tables } from "../../services/Tables";
import { Table, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CAMERAICON from "../../Assets/camera.png";
import IMAGEICON from "../../Assets/picture.png";
import DATEICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import SEARCHICON from "../../Assets/data-analysis.png";

const openNotification = (description) => {
	notification.open({
		message: "Alert",
		description,
		icon: (
			<SmileOutlined
				style={{
					color: "#108ee9",
				}}
			/>
		),
	});
};
function EntryExitTable() {
	const [tableData, setTableData] = useState([]);
	let datesObj = localStorage.getItem("Dates");
	const { startDate, startTime, endDate, endTime } = JSON.parse(datesObj);

	const getTablesList = async () => {
		let apiData = await Tables({
			startingDateValue: startDate,
			startingTimeValue: startTime,
			endingDateValue: endDate,
			endingTimeValue: endTime,
			TabNo: 2,
			alert: "loitering",
		});
		if (apiData !== null) {
			setTableData(apiData);
		} else if (apiData == null) {
			openNotification("No Data Found.");
			setTableData([]);
		}
	};

	useEffect(() => {
		getTablesList();
	}, []);
	const onChange = (pagination, filters, sorter, extra) => {};
	const columns = [
		{
			title: (
				<>
					<Tooltip title="Date" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img
								src={DATEICON}
								style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
								alt="LOGO"
							/>
						</IconButton>
					</Tooltip>
					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Date
					</span>
				</>
			),
			dataIndex: "date",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.date,
			// 		value: item.date,
			// 	};
			// }),
			// // specify the condition of filtering result
			// // here is that finding the name started with `value`
			// onFilter: (value, record) => record.date.indexOf(value) === 0,
			// sorter: (a, b) => a.name.length - b.name.length,
			// sortDirections: ["descend"],
		},
		{
			title: (
				<>
					<Tooltip title="Time" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img
								src={CLOCKICON}
								style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
								alt="LOGO"
							/>
						</IconButton>
					</Tooltip>
					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Time
					</span>
				</>
			),
			dataIndex: "time",
			defaultSortOrder: "descend",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.time,
			// 		value: item.time,
			// 	};
			// }),
			// onFilter: (value, record) => record.time.indexOf(value) === 0,
		},
		{
			title: (
				<>
					<Tooltip title="image" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img
								src={IMAGEICON}
								style={{ width: "5vh", height: "5vh" }}
								alt="LOGO"
							/>
						</IconButton>
					</Tooltip>
					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Image
					</span>
				</>
			),
			dataIndex: "address",
			render: () => (
				<img
					src={IMAGEICON}
					alt="_blank"
					style={{ width: "100px", height: "100px" }}
				/>
			),
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.image ? item.image : "not image",
			// 		value: item.image ? item.image : "not image",
			// 	};
			// }),
			// onFilter: (value, record) => record.image.indexOf(value) === 0,
		},
		{
			title: (
				<>
					<Tooltip title="Camera" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img
								src={CAMERAICON}
								style={{ width: "5vh", height: "5vh" }}
								alt="LOGO"
							/>
						</IconButton>
					</Tooltip>
					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Camera
					</span>
				</>
			),
			dataIndex: "camera",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.camera,
			// 		value: item.camera,
			// 	};
			// }),
			// onFilter: (value, record) => record.camera.indexOf(value) === 0,
		},
	];
	return (
		<>
			<div
				className="mb-3"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<input placeholder="Search" />
				<button className="mx-2 btn btn-primary">
					<Tooltip title="Search" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img
								src={SEARCHICON}
								style={{ width: "5vh", height: "4vh" }}
								alt="LOGO"
							/>
						</IconButton>
					</Tooltip>
				</button>
			</div>
			<Table columns={columns} dataSource={tableData} onChange={onChange} />
		</>
	);
}

export default EntryExitTable;
