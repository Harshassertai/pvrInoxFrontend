import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Support from "../Support/Support";
import AdbIcon from "@mui/icons-material/Adb";
import ASSERTLOGO from "../../Assets/assertlogo.png";
import HOUSE from "../../Assets/house.png";
import ALERT from "../../Assets/alert.png";
import TEAM from "../../Assets/group.png";
import SUPPORT from "../../Assets/help-desk.png";
import SWITCHOFF from "../../Assets/powernew.png";
import { Col, Divider, Drawer, List, Row } from "antd";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { deDE } from "@mui/x-date-pickers/locales";
import FormControl from "@mui/material/FormControl";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import LOGO from "../../Assets/parekh.jpeg";
import SideBar from "../Dashboard/SideBar";
import Table from "./AlertsTable";
import "./index.css";
import convertDate from "../../utils/convertDates";
import convertTime from "../../utils/convertTimes";
import { getAlertsList } from "../../services/AlertsTable";
import { FilterForAlert, FilterForCamera } from "../../services/Filters";
import ReactSelect from "../MultiSelect/MySelect";
import { decryptRequest } from "../../utils/crypt";

//For Last 24hrs
import { get24hrsAlertsList } from "../../services/Last24hrs";

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

const alertoptions = [
	{ value: "Intrusion detected", label: "Intrusion detected" },
	{
		value: "office area time restriction",
		label: "office area time restriction",
	},
	{ value: "crowd detected", label: "crowd detected" },
	{ value: "entry", label: "entry" },
	{ value: "exit", label: "exit" },
	{ value: "person without helmet", label: "ppe" },
	{
		value: "emergency Exit Bay Interruption",
		label: "emergency Exit Bay Interruption",
	},
	{
		value: "fireextinguishernotavailable",
		label: "fire extinguisher not available",
	},
	{ value: "two wheeler detected", label: "two wheeler detected" },
	{ value: "person carrying boxes", label: "person carrying boxes" },
	{ value: "material laying outside", label: "material laying outside" },
	{ value: "Intrusion detected", label: "Intrusion detected" },
	{ value: "dooropen", label: "door open" },
	{ value: "doorclosed", label: "door closed" },
	{ value: "tat", label: "tat" },
	{ value: "novehicleatdock", label: "no vehicle at dock" },
];

const cameraoptions = [
	{ value: "Pharma main gate entry", label: "Pharma main gate entry" },
	{
		value: "Periphery Pharma Bike Parking 2",
		label: "Periphery Pharma Bike Parking 2",
	},
	{ value: "Pharma Transport Room", label: "Pharma Transport Room" },
	{ value: "Pharma WH Employee Entry", label: "Pharma WH Employee Entry" },
	{ value: "Pharma WH B Front Side", label: "Pharma WH B Front Side" },
	{ value: "Pharma WH Entry Passage", label: "Pharma WH Entry Passage" },
	{ value: "Pharma Staging Area 4", label: "Pharma Staging Area 4" },
	{ value: "Doc No 2", label: "Doc No 2" },
	{ value: "Pharma WH Front Middle", label: "Pharma WH Front Middle" },
	{ value: "Pharma Centre Walkway", label: "Pharma Centre Walkway" },
];

// const personAssignedOptions = [
// 	{ value: "Person1", label: "Person1" },
// 	{ value: "Person2", label: "Person2" },
// 	{ value: "Person3", label: "Person3" },
// 	{ value: "Person4", label: "Person4" },
// 	{ value: "Person5", label: "Person5" },
// ];

const DescriptionItem = ({ title, content }) => (
	<div className="site-description-item-profile-wrapper">
		<p className="site-description-item-profile-p-label">{title}:</p>
		{content}
	</div>
);
const pages = [""];
const settings = ["Logout"];

function Alerts() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const [startDate, setStartDate] = useState(dayjs(new Date()));
	const [endDate, setEndDate] = useState(dayjs(new Date()));
	const [startTime, setStartTime] = useState(new Date().setHours(0, 0, 0));
	const [endTime, setEndTime] = useState(new Date());
	const [apiResponseData, setApiResponseData] = React.useState([]);
	// const [personoptionSelected, setpersonoptionSelected] = useState(null);
	const [optionSelected, setoptionSelected] = useState(null);
	const [cameraOptionSelected, setcameraoptionSelected] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [opendrawer, setOpenDrawer] = useState(false);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [cameraoptions, setCameraOptions] = useState([]);
	const [alertoptions, setAlertOptions] = useState([]);
	const [apiCallFilterObject, setApiCallFilterObject] = useState({});

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// const showDrawer = () => {
	// 	setOpenDrawer(true);
	// };
	const showDrawer = () => {
		setOpenDrawer(true);
	};
	const onClose = () => {
		setOpenDrawer(false);
	};
	const handleChange = (selected) => {
		setoptionSelected(selected);
	};
	// const handlePersonChange = (selected) => {
	// 	setpersonoptionSelected(selected);
	// };

	const handleCameraChange = (selected) => {
		setcameraoptionSelected(selected);
	};
	const handleSideBar = () => {
		setOpen(!open);
	};
	const handleLogout = () => {
		navigate("/");
	};

	const getFiltersData = async () => {
		let camerasList = await FilterForCamera();
		let alertsList = await FilterForAlert();
		if (camerasList?.data.length > 0) {
			setCameraOptions(camerasList.data);
		}
		if (alertsList?.data.length > 0) {
			setAlertOptions(alertsList.data);
		}
	};
	const get24hrsAlerts = async () => {
		let alertfor24 = await get24hrsAlertsList();
		console.log("24hrs alerts", alertfor24);
		setApiResponseData(alertfor24.data);
	};
	useEffect(() => {
		let token = localStorage.getItem("token");
		var decoded = jwt_decode(token);
		let { data } = decoded;
		decryptRequest(data).then((res) => {
			console.log(JSON.parse(res));
			let { name, email } = JSON.parse(res);
			setName(name);
			setEmail(email);
		});
		getFiltersData();
		get24hrsAlerts();
	}, []);


	const handleGetData = async () => {
		let startingDateValue = await convertDate(startDate);
		let endingDateValue = await convertDate(endDate);
		let startingTimeValue = await convertTime(startTime);
		let endingTimeValue = await convertTime(endTime);
		let alertSelected = optionSelected;
		let cameraSelected = cameraOptionSelected;
		setApiCallFilterObject({
			startingDateValue,
			startingTimeValue,
			endingDateValue,
			endingTimeValue,
			alertSelected,
			cameraSelected,
		});
		let apiData = await getAlertsList({
			startingDateValue,
			startingTimeValue,
			endingDateValue,
			endingTimeValue,
			alertSelected,
			cameraSelected,
		});
		if (apiData == "Token Expired,Login Again.") {
			openNotification("Token Expired,Login Again.");
			navigate("/");
		} else if (apiData !== "No Data Found.") {
			setApiResponseData(apiData.data);
		} else if (apiData === "No Data Found.") {
			openNotification(apiData);
			setApiResponseData([]);
		}
	};

	return (
		<div>
			<nav
				className="navbar navbar-expand-lg navBar"
				style={{
					display: "flex",
					justifyContent: "space-betweeen",
				}}
			>
				<div
					className="navbar-brand"
					onClick={handleSideBar}
					style={{ color: "white" }}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							gap: "2vh",
							alignItems: "center",
						}}
					>
						<img src={LOGO} style={{ width: "9vh", height: "8vh" }} alt="LOGO" />
						<Typography
							textAlign="center"
							style={{
								fontSize: "x-large",
								fontFamily: "Calibri",
								fontStyle: "normal",
							}}
						>
							PISPL - CCTV Analytics - BGR6
						</Typography>
					</div>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open profile">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt={`${name.split(" ")[0]}`}
									src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem key={1} onClick={handleCloseUserMenu}>
								<Typography
									textAlign="center"
									style={{ fontFamily: "Calibri", fontStyle: "normal" }}
								>
									Name : {name}
								</Typography>
							</MenuItem>
							<MenuItem key={2} onClick={handleCloseUserMenu}>
								<Typography
									textAlign="center"
									style={{ fontFamily: "Calibri", fontStyle: "normal" }}
								>
									Email : {email}
								</Typography>
							</MenuItem>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography
										textAlign="center"
										style={{
											color: "black",
											border: "1px solid slategrey",
											padding: "1vh",
											borderRadius: "1vh",
										}}
										onClick={handleLogout}
									>
										<img
											src={SWITCHOFF}
											style={{ width: "5vh", height: "5vh" }}
											alt="LOGO"
										/>
										<span
											style={{
												marginLeft: "2vh",
												fontFamily: "Calibri",
												fontStyle: "normal",
											}}
										>
											{setting}
										</span>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</div>
			</nav>
			<div style={{ display: "flex" }} className="my-3 mx-2">
				<SideBar display={open} />
				<div className="UsersMainDiv">
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							cursor: "pointer",
						}}
					>
						<Typography
							textAlign="center"
							style={{
								fontSize: "x-large",
								fontFamily: "Calibri", //fontFamily: "Calibri"
								fontStyle: "normal",
								color: "slategray",
							}}
						>
							Alerts
						</Typography>
						{/* <Tooltip title="Alerts" placement="right-start">
							<img src={ALERT} style={{ width: "10vh", height: "10vh" }} alt="LOGO" />
						</Tooltip> */}
					</div>
					<div className="filters">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label="Start Date"
									value={startDate}
									onChange={(date) => setStartDate(date)}
								/>
							</DemoContainer>
						</LocalizationProvider>
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							localeText={
								deDE.components.MuiLocalizationProvider.defaultProps.localeText
							}
						>
							<DemoContainer components={["TimePicker"]}>
								<TimePicker
									label="Start Time"
									views={["hours", "minutes", "seconds"]}
									ampm={true}
									clearIcon={null}
									format="HH:mm:ss"
									onChange={(time) => {
										setStartTime(time);
									}}
									value={startTime}
								/>
							</DemoContainer>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label="End Date"
									// selected={endDate}
									value={endDate}
									onChange={(date) => setEndDate(date)}
								/>
							</DemoContainer>
						</LocalizationProvider>
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							localeText={
								deDE.components.MuiLocalizationProvider.defaultProps.localeText
							}
						>
							<DemoContainer components={["TimePicker"]}>
								<TimePicker
									label="End Time"
									views={["hours", "minutes", "seconds"]}
									ampm={true}
									clearIcon={null}
									format="HH:mm:ss"
									onChange={(time) => setEndTime(time)}
									value={endTime}
								/>
							</DemoContainer>
						</LocalizationProvider>
					</div>
					<div className="filters2">
						<FormControl sx={{ m: 1, width: 300 }}>
							<ReactSelect
								options={cameraoptions}
								isMulti
								closeMenuOnSelect={false}
								hideSelectedOptions={false}
								// components={{
								// 	Option,
								// }}
								onChange={(e) => handleCameraChange(e)}
								allowSelectAll={true}
								placeholder="Select Cameras"
								value={cameraOptionSelected}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: 300 }}>
							<ReactSelect
								options={alertoptions}
								isMulti
								closeMenuOnSelect={false}
								hideSelectedOptions={false}
								// components={{
								// 	Option,
								// }}
								onChange={(e) => handleChange(e)}
								allowSelectAll={true}
								placeholder="Select Alerts"
								value={optionSelected}
							/>
						</FormControl>
						{/* <FormControl sx={{ m: 1, width: 300 }}>
							<ReactSelect
								options={personAssignedOptions}
								isMulti
								closeMenuOnSelect={false}
								hideSelectedOptions={false}
								// components={{
								// 	Option,
								// }}
								onChange={(e) => handlePersonChange(e)}
								allowSelectAll={true}
								placeholder="Select Person"
								value={personoptionSelected}
							/>
						</FormControl> */}
						<button
							className="btn btn-primary"
							onClick={handleGetData}
							style={{ width: "15vw" }}
						>
							Get Data
						</button>
					</div>
					<Table data={apiResponseData} filterObject={apiCallFilterObject} />
				</div>
			</div>
		</div>
	);
}

export default Alerts;
