/* eslint-disable */
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Tables } from "../../services/Tables";
import { Table, notification, Modal } from "antd";
import Box from "@mui/material/Box";
import Magnifier from "react-magnifier";
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

function EmergencyExitBayInterruptionTable() {
	const [open, setOpen] = React.useState(false);
	const [Image, setImage] = React.useState("");
	const [tableData, setTableData] = useState([]);
	let datesObj = localStorage.getItem("Dates");
	const { startDate, startTime, endDate, endTime } = JSON.parse(datesObj);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const getTablesList = async () => {
		let apiData = await Tables({
			startingDateValue: startDate,
			startingTimeValue: startTime,
			endingDateValue: endDate,
			endingTimeValue: endTime,
			TabNo: 3,
			alert: "emergency Exit Bay Interruption",
		});
		if (apiData !== null) {
			setTableData(apiData.data);
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
			<Modal
				open={open}
				centered
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				onOk={handleClose}
				onCancel={handleClose}
				cancelButtonProps={{ style: { display: "none" } }}
			>
				<Box>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Image
					</Typography>
					<Magnifier src={Image} mgShape="square" />
				</Box>
			</Modal>
		</>
	);
}

export default EmergencyExitBayInterruptionTable;
