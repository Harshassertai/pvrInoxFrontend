import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { decryptRequest } from "../../utils/crypt";
import {
	postComment,
	commentList,
	closeStatus,
	bulkCloseStatus,
	getAlertsList,
} from "../../services/AlertsTable";
import { get24hrsAlertsList } from "../../services/Last24hrs";
import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
	Button,
	Table,
	Modal,
	Form,
	DatePicker,
	TimePicker,
	Input,
	Select,
	Space,
	notification,
} from "antd";
import Box from "@mui/material/Box";
import Magnifier from "react-magnifier";
import Typography from "@mui/material/Typography";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CAMERAICON from "../../Assets/camera.png";
import ALERTICON from "../../Assets/alert.png";
import STATUSICON from "../../Assets/clipboard.png";
import IMAGEICON from "../../Assets/picture.png";
import OPENICON from "../../Assets/open.png";
import CLOSEDICON from "../../Assets/closed.png";
import DATEICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import TYPEICON from "../../Assets/typing.png";
import EXPORTICON from "../../Assets/file.png";
import SEARCHICON from "../../Assets/data-analysis.png";
import PERSONICON from "../../Assets/man.png";
import NOTFOUNDICON from "../../Assets/not-found.png";
const { TextArea } = Input;

const openNotification = (description) => {
	console.log("descriptuon", description);
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

function AlertsTable(props) {
	const { data, filterObject } = props;
	console.log("Filter Objects", props.filterObject);
	const [showBulkCloseButton, setShowBulkCloseButton] = useState(false);
	const [selectedRowsKeys, setSelectedRowKeys] = useState([]);
	const [rowsDocuments, setRowsDocuments] = useState([]);
	const [name, setName] = useState("");
	const [open, setOpen] = React.useState(false);
	const [openVideoModal, setOpenVideoModal] = React.useState(false);
	const [Image, setImage] = React.useState("");
	const [video, setVideo] = React.useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalRecord, setModalRecord] = useState();
	const [dataSource, setDataSource] = useState(data);
	const [value, setValue] = useState("");
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const [statusValue, setStatusValue] = useState("");
	useEffect(() => {
		let token = localStorage.getItem("token");
		var decoded = jwt_decode(token);
		let { data } = decoded;
		decryptRequest(data).then((res) => {
			console.log(JSON.parse(res));
			let { name } = JSON.parse(res);
			setName(name);
		});
	}, []);

	const handleRowSelectChange = (newselectedRowKeys) => {
		console.log("selectedRowKeys changed: ", newselectedRowKeys);
	};

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	const handleButtonClick = async () => {
		// Call the function passed from the parent component
		console.log("props values ", filterObject);
		if (
			filterObject.cameraSelected == null &&
			filterObject.alertSelected == null
		) {
			console.log("yes");
		} else {
			console.log("no");
		}
		// let propsfunctionvalue = await props.callParentFunction();
		// console.log("Props function value", propsfunctionvalue);
	};
	const handleOpenVideo = () => setOpenVideoModal(true);
	const handleCloseVideo = () => setOpenVideoModal(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};
	const handleCommentChange = (e) => {
		setCommentText(e.target.value);
	};
	const handleCommentClick = async (e) => {
		console.log(JSON.parse(modalRecord.comments), commentText);
		console.log(comments);
		setComments([
			{
				date: new Date().toDateString(),
				time: new Date().toLocaleTimeString().split(" ")[0],
				comment: commentText,
				name: name,
			},
			...comments,
		]);

		let commentsResponse = await postComment(
			modalRecord.id,
			comments,
			commentText,
			name
		);
		console.log("Comments Response ", commentsResponse);
		// setComments([commentText, ...(JSON.parse(modalRecord?.comments)[0] || [])]);
		setCommentText("");
		// console.log("Comments ", comments.length);
	};

	const handleStatusClose = async (dataRecordOfStatus) => {
		console.log("DATA RECORD OF STATUS ", dataRecordOfStatus.id);
		let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
		console.log("data of closed ", dataofclosed);
		window.location.reload();
		setStatusValue("Closed");
	};

	useEffect(() => {
		handleButtonClick();
		console.log("Filters", props);
	}, []);

	useEffect(() => {
		console.log("comments length changes ", comments.length);
	}, [comments.length]);

	const onChange = (pagination, filters, sorter, extra) => {};
	const columns = [
		{
			title: (
				<Tooltip title="Date" placement="right-start">
					<IconButton sx={{ p: 1 }}>
						<img
							src={DATEICON}
							style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
							alt="LOGO"
						/>
					</IconButton>
				</Tooltip>
			),
			key: "date",
			dataIndex: "date",
			align: "center",
		},
		{
			title: (
				<Tooltip title="Time" placement="right-start">
					<IconButton sx={{ p: 1 }}>
						<img
							src={CLOCKICON}
							style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
							alt="LOGO"
						/>
					</IconButton>
				</Tooltip>
			),
			key: "time",
			dataIndex: "time",
			defaultSortOrder: "descend",
			align: "center",
		},
		{
			title: (
				<Tooltip title="Alert" placement="right-start">
					<IconButton sx={{ p: 1 }}>
						<img
							src={ALERTICON}
							style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
							alt="LOGO"
						/>
					</IconButton>
				</Tooltip>
			),
			key: "alert",
			dataIndex: "alert",
			align: "center",
		},
		{
			title: (
				<Tooltip title="Camera_id" placement="right-start">
					<IconButton sx={{ p: 1 }}>
						<img
							src={CAMERAICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
					</IconButton>
				</Tooltip>
			),
			key: "camera",
			dataIndex: "camera",
			align: "center",
		},
		{
			title: (
				<Tooltip title="Image" placement="right-start">
					<IconButton sx={{ p: 1 }}>
						<img src={IMAGEICON} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
					</IconButton>
				</Tooltip>
			),
			key: "image",
			dataIndex: "image",
			render: (_, record) => {
				return (
					<div style={{ display: "flex", gap: "1vh", alignItems: "center" }}>
						<img
							src={record.image}
							alt={IMAGEICON}
							onClick={function () {
								handleOpen();
								setImage(record.image);
							}}
							style={{
								width: "200px",
								height: "100px",
								cursor: "pointer",
								border: "1px solid skyblue",
								padding: "0.5vh",
								borderRadius: "2vh",
							}}
						/>
						<Button
							type="primary"
							onClick={function () {
								handleOpenVideo();
								setVideo(record.video);
							}}
						>
							video
						</Button>
					</div>
				);
			},
			align: "center",
		},
		{
			title: (
				<Tooltip title="Status" placement="right-start">
					<IconButton sx={{ p: 1 }}>
						<img
							src={STATUSICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
					</IconButton>
				</Tooltip>
			),
			dataIndex: "",
			key: "status",
			render: (value, record, index) => (
				<Button
					type="primary"
					style={{
						backgroundColor: index % 2 == 0 ? "red" : "green",
						height: "auto",
					}}
					onClick={async () => {
						setModalOpen(true);
						setModalRecord(record);
						handleButtonClick();
						console.log("REcord Values ", JSON.parse(record.comments));
						let commentsList = await commentList(record.id);
						console.log(
							"Comments List ---/>",
							JSON.parse(commentsList.data[0].comments)
						);
						if (JSON.parse(record?.comments)?.length > 0) {
							setComments(JSON.parse(commentsList.data[0].comments));
							setStatusValue(record.status);
							console.log("comments ", comments);
						} else {
							setComments([]);
						}
					}}
				>
					{record.status == "Open" ? (
						<img src={OPENICON} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
					) : (
						<img
							src={CLOSEDICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
					)}
				</Button>
			),
			align: "center",
		},
	];
	const handleDateChangeInModal = (e) => {
		console.log("DATE VALUE IS ", e.target.value);
	};
	const ExportToExcel = ({ apiData, fileName }) => {
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
		const fileExtension = ".xlsx";

		const exportToCSV = (apiData, fileName) => {
			let userSheetData = apiData.map((item) => {
				return {
					Date: item.date,
					time: item.time,
					alert: item.alert,
					camera: item.camera,
					image: item.image,
				};
			});
			const ws = XLSX.utils.json_to_sheet(userSheetData);
			const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
			const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
			const data = new Blob([excelBuffer], { type: fileType });
			FileSaver.saveAs(data, fileName + fileExtension);
		};

		return (
			<Button
				type="primary"
				onClick={(e) => exportToCSV(apiData, fileName)}
				style={{ marginLeft: "1em" }}
			>
				Export
			</Button>
		);
	};

	// const onSelectChange = (newSelectedRowKeys) => {
	// 	console.log("selectedRowKeys changed: ", rowSelection);
	// 	setSelectedRowKeys(newSelectedRowKeys);
	// };
	// const rowSelection = {
	// 	selectedRowKeys,
	// 	onChange: (keys, selectedRowKeys, selectedRows) => {
	// 		onSelectChange(selectedRowKeys);
	// 	},
	// };
	const handleCloseAllClick = async () => {
		console.log("documents selected", rowsDocuments);
		let response = await bulkCloseStatus(rowsDocuments, name);
		console.log("response is ", response);
		alert("Status Has Been Closed For Selected Rows.");
	};

	return (
		<>
			<div
				className="my-2 mb-3"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<div
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Button
						type="primary"
						style={{ display: showBulkCloseButton ? "block" : "none" }}
						onClick={handleCloseAllClick}
					>
						Close All
					</Button>
				</div>
				<input
					placeholder="Search"
					value={value}
					onChange={(e) => {
						const currValue = e.target.value;
						setValue(currValue);
						const filteredData = data.filter(
							(entry) =>
								entry.date.includes(currValue) ||
								entry.time.includes(currValue) ||
								entry.alert.includes(currValue) ||
								entry.camera.includes(currValue)
						);
						setDataSource(filteredData);
					}}
				/>
				<button className=" mx-2 btn btn-primary">
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
				<div
					className="btn btn-primary"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						// backgroundColor: "primary",
					}}
				>
					<img src={EXPORTICON} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
					<ExportToExcel apiData={data} fileName={"Alerts Sheet"} />
				</div>
			</div>
			<Table
				rowKey={(record) => record.id}
				// rowSelection={rowSelection}
				rowSelection={{
					selectedRowKeys: selectedRowsKeys,
					onChange: (keys, selectedRowKeys, selectedRows) => {
						console.log("Selected rows ", selectedRowKeys);

						setSelectedRowKeys(keys);
						setRowsDocuments(keys);
						setShowBulkCloseButton(!showBulkCloseButton);
					},

					// console.log("keys ", selectedRowKeys);
					// setSelectedRowKeys(selectedRowKeys);
					// setSelectedDocuments(selectedRowKeys);
					// },
					// preserveSelectedRowKeys: true,
					// ...rowSelection,
				}}
				columns={columns}
				dataSource={data}
			/>
			<Modal
				title="Comments"
				style={{
					top: 20,
				}}
				centered
				open={modalOpen}
				onOk={() => {
					setModalOpen(false);
					handleButtonClick();
					console.log("ok cliked");
				}}
				onCancel={() => {
					setModalOpen(false);
					handleButtonClick();
					console.log("ok cliked");
				}}
			>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 24 }}
					layout="horizontal"
					style={{ maxWidth: 1000 }}
				>
					<Form.Item>
						<div style={{ display: "flex" }}>
							<Tooltip title="Assigned To" placement="left-start">
								<img
									src={PERSONICON}
									style={{ width: "auto", height: "5vh", marginRight: "3vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<input
								type="text"
								value={"Person Name"}
								disabled
								style={{
									border: "1px solid skyblue",
									borderRadius: "3px",
									width: "100%",
									padding: "1vh",
								}}
							/>
						</div>
					</Form.Item>
					<Form.Item>
						<div style={{ display: "flex", gap: "2vh" }}>
							<Tooltip title="Date" placement="left-start">
								<img
									src={DATEICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<input
								type="date"
								value={modalRecord?.date}
								disabled
								style={{
									border: "1px solid skyblue",
									borderRadius: "3px",
									width: "14vw",
									padding: "1vh",
								}}
							/>
							<Tooltip title="Time" placement="left-start">
								<img
									src={CLOCKICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<input
								type="time"
								value={modalRecord?.time}
								disabled
								style={{
									border: "1px solid skyblue",
									borderRadius: "3px",
									width: "14vw",
									padding: "1vh",
								}}
							/>
						</div>
					</Form.Item>
					<Form.Item>
						<div style={{ display: "flex", gap: "1.5vh" }}>
							<Tooltip title="Alert" placement="left-start">
								<img
									src={ALERTICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<input
								type="text"
								value={modalRecord?.alert}
								disabled
								style={{
									border: "1px solid skyblue",
									borderRadius: "3px",
									width: "100vw",
									padding: "1vh",
								}}
							/>
						</div>
					</Form.Item>
					<Form.Item>
						<div style={{ display: "flex", gap: "2vh" }}>
							<Tooltip title="Camera" placement="left-start">
								<img
									src={CAMERAICON}
									style={{ width: "5vh", height: "5vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<input
								type="text"
								value={modalRecord?.camera}
								disabled
								style={{
									border: "1px solid skyblue",
									borderRadius: "3px",
									width: "100vw",
									padding: "1vh",
								}}
							/>
						</div>
					</Form.Item>
					<Form.Item>
						<div style={{ display: "flex", gap: "2vh" }}>
							<Tooltip title="Status" placement="left-start">
								<img
									src={STATUSICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<Space wrap>
								<input
									disabled={modalRecord?.status == "Closed" ? true : false}
									style={{
										border: "1px solid skyblue",
										borderRadius: "3px",
										width: "14vw",
										padding: "1vh",
									}}
									value={modalRecord?.status == "Open" ? "Open" : statusValue}
								/>
								{modalRecord?.status == "Open" ? (
									<Button type="primary" onClick={() => handleStatusClose(modalRecord)}>
										Close
									</Button>
								) : (
									<div></div>
								)}
							</Space>
						</div>
					</Form.Item>
					<Form.Item>
						<div
							style={{
								display: modalRecord?.status == "Open" ? "none" : "flex",
								marginLeft: "8vh",
								alignItems: "flex-start",
								gap: "2vh",
								flexDirection: "column",
							}}
						>
							<span>Closed By : {modalRecord?.statusclosedby}</span>
							<span>Closing Date :- {modalRecord?.statuscloseon}</span>
						</div>
					</Form.Item>
					<Form.Item>
						<div style={{ display: "flex", alignItems: "center", gap: "2vh" }}>
							<Tooltip title="Comment Input" placement="left-start">
								<img
									src={TYPEICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
							</Tooltip>
							<TextArea
								disabled={modalRecord?.status == "Closed" ? true : false}
								rows={4}
								style={{ border: "1px solid skyblue" }}
								placeholder="Enter Your Comments"
								onChange={handleCommentChange}
								value={commentText}
							/>
							<Button
								type="primary"
								onClick={handleCommentClick}
								disabled={modalRecord?.status == "Closed" ? true : false}
							>
								Comment
							</Button>
						</div>
					</Form.Item>
					<Form.Item
						// label="User List"
						shouldUpdate={(prevValues, curValues) => prevValues !== curValues}
					>
						{comments?.length > 0 ? (
							<ul>
								{comments?.map((item) => {
									return (
										<li
											style={{
												display: "flex",
												flexDirection: "column",
												border: "1px solid skyblue",
												borderRadius: "3px",
												width: "auto",
												padding: "1vh",
												marginBottom: "1vh",
											}}
										>
											<span>{item.comment}</span>
											<span style={{ color: "slategrey" }}>
												{new Date(item.date).toDateString()} {item.time}
											</span>
											<span style={{ color: "slategrey" }}>Commented By {item?.name}</span>
										</li>
									);
								})}
							</ul>
						) : (
							<div>
								<Typography>
									<SmileOutlined /> No Comments yet.
								</Typography>
							</div>
						)}
					</Form.Item>
				</Form>
			</Modal>
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
			<Modal
				open={openVideoModal}
				centered
				onClose={handleCloseVideo}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				onOk={handleCloseVideo}
				onCancel={handleCloseVideo}
				cancelButtonProps={{ style: { display: "none" } }}
			>
				<Box>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Video
					</Typography>
					{video ? (
						<Magnifier src={video} mgShape="square" alt="_blank" />
					) : (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<img
								src={NOTFOUNDICON}
								alt="_blank"
								style={{ width: "15vh", height: "15vh" }}
							/>
						</div>
					)}
				</Box>
			</Modal>
		</>
	);
}

export default AlertsTable;
