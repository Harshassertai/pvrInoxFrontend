import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./index.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Divider from "@mui/material/Divider";
import Linegraph from "../Graph/ApexLineGraphForTAT";

import LINEGRAPHICON from "../../Assets/line-graph.png";
import DOOROPENICON from "../../Assets/door open.png";
import DOORCLOSEDICON from "../../Assets/door close.png";
import NOVEHICLEICON from "../../Assets/no-vehicle.png";
import CAMERAICON from "../../Assets/camera.png";
import CALENDARICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import IMAGEICON from "../../Assets/picture.png";

function Dock(props) {
	const {
		dockApiResponse: {
			data: {
				dockOpenCount,
				dockClosedCount,
				tatCount,
				novehicleatdockCount,
			} = {},
		},
		dates,
		last,
		tatData,
	} = props;
	localStorage.setItem("Dates", JSON.stringify(dates));
	const navigate = useNavigate();
	const handleDockOpen = () => {
		navigate("/dockopen");
	};
	const handleDockClose = () => {
		navigate("/dockclose");
	};
	const handleTAT = () => {
		navigate("/tat");
	};
	const handleNoVehicle = () => {
		navigate("/novehicleatdock");
	};
	return (
		<div>
			<div className="mainContainer">
				<div
					onClick={handleDockOpen}
					style={{
						border: "1px solid skyblue",
						padding: "1vh",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					<Box
						sx={{
							flexGrow: 0,
							display: { xs: "flex" },
							mx: "5vh",
							flexWrap: "nowrap",
						}}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<img
							src={DOOROPENICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
						<Typography
							textAlign="center"
							style={{
								fontSize: "large",
								fontFamily: "Calibri",
								fontStyle: "normal",
								color: "black",
							}}
						>
							Door Open 10
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img src={IMAGEICON} alt={IMAGEICON} />
						<ul style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
							<li>
								<img
									src={CAMERAICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[0]?.camera ? last[0]?.camera : "No Data"}
							</li>
							<li>
								<img
									src={CALENDARICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[0]?.date ? last[0]?.date : "No Data"}
							</li>
							<li>
								<img
									src={CLOCKICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[0]?.time ? last[0]?.time : "No Data"}
							</li>
						</ul>
					</div>
				</div>
				<div
					onClick={handleDockClose}
					style={{
						border: "1px solid skyblue",
						padding: "1vh",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					<Box
						sx={{
							flexGrow: 0,
							display: { xs: "flex" },
							mx: "5vh",
							flexWrap: "nowrap",
						}}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<img
							src={DOORCLOSEDICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
						<Typography
							textAlign="center"
							style={{
								fontSize: "large",
								fontFamily: "Calibri",
								fontStyle: "normal",
								color: "black",
							}}
						>
							Door Close 10
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img src={IMAGEICON} alt={IMAGEICON} />
						<ul style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
							<li>
								<img
									src={CAMERAICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[1]?.camera ? last[1]?.camera : "No Data"}
							</li>
							<li>
								<img
									src={CALENDARICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[1]?.date ? last[1]?.date : "No Data"}
							</li>
							<li>
								<img
									src={CLOCKICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[1]?.time ? last[1]?.time : "No Data"}
							</li>
						</ul>
					</div>
				</div>
				<div
					onClick={handleNoVehicle}
					style={{
						border: "1px solid skyblue",
						padding: "1vh",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					<Box
						sx={{
							flexGrow: 0,
							display: { xs: "flex" },
							mx: "5vh",
							flexWrap: "nowrap",
							gap: "4vh",
						}}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<img
							src={NOVEHICLEICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
						<Typography
							textAlign="center"
							style={{
								fontSize: "large",
								fontFamily: "Calibri",
								fontStyle: "normal",
								color: "black",
							}}
						>
							No Vehicle At Dock 10
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img src={IMAGEICON} alt={IMAGEICON} />
						<ul style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
							<li>
								<img
									src={CAMERAICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[2]?.camera ? last[2]?.camera : "No Data"}
							</li>
							<li>
								<img
									src={CALENDARICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[2]?.date ? last[2]?.date : "No Data"}
							</li>
							<li>
								<img
									src={CLOCKICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[2]?.time ? last[2]?.time : "No Data"}
							</li>
						</ul>
					</div>
				</div>
				{/* <div className="dockOpenWrapper" onClick={handleDockClose}>
					<div className="dockOpenWrapperInner">
						<div className="InnerText">
							<h4>Door closed</h4>
							<h4>{dockClosedCount ? dockClosedCount : "0"}</h4>
						</div>
						<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
						<div className="InnerCard">
							<img
								src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
								alt="_blank"
							/>
							<ul>
								<li>
									<CameraAltIcon />
									{last && last[1]?.camera ? last[1]?.camera : "No Data"}
								</li>
								<li>
									<CalendarMonthIcon />
									{last && last[1]?.date ? last[1]?.date : "No Data"}
								</li>
								<li>
									<AccessAlarmIcon />
									{last && last[1]?.time ? last[1]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="dockOpenWrapper" onClick={handleNoVehicle}>
					<div className="dockOpenWrapperInner">
						<div className="InnerText">
							<h4>No vehicle at dock</h4>
							<h4>{novehicleatdockCount ? novehicleatdockCount : "0"}</h4>
						</div>
						<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
						<div className="InnerCard">
							<img
								src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
								alt="_blank"
							/>
							<ul>
								<li>
									<CameraAltIcon />
									{last && last[3]?.camera ? last[3]?.camera : "No Data"}
								</li>
								<li>
									<CalendarMonthIcon />
									{last && last[3]?.date ? last[3]?.date : "No Data"}
								</li>
								<li>
									<AccessAlarmIcon />
									{last && last[3]?.time ? last[3]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div>
				</div> */}
			</div>
			{/* <div className="my-3 dockRow2">
				<div className="dockOpenWrapper" onClick={handleNoVehicle}>
					<div className="dockOpenWrapperInner">
						<div className="InnerText">
							<h4>No vehicle at dock</h4>
							<h4>{novehicleatdockCount ? novehicleatdockCount : "0"}</h4>
						</div>
						<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
						<div className="InnerCard">
							<img
								src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
								alt="_blank"
							/>
							<ul>
								<li>
									<CameraAltIcon />
									{last && last[3]?.camera ? last[3]?.camera : "No Data"}
								</li>
								<li>
									<CalendarMonthIcon />
									{last && last[3]?.date ? last[3]?.date : "No Data"}
								</li>
								<li>
									<AccessAlarmIcon />
									{last && last[3]?.time ? last[3]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div> */}
			<div
				className="my-3"
				onClick={handleTAT}
				style={{
					border: "1px solid skyblue",
					borderRadius: "5px",
					width: "auto",
					cursor: "pointer",
					width: "85vw",
				}}
			>
				<div style={{ display: "flex", padding: "2vh" }}>
					<img
						src={LINEGRAPHICON}
						style={{ width: "5vh", height: "4vh" }}
						alt="LOGO"
					/>
					<h6
						style={{
							marginLeft: "2vh",
							fontSize: "x-large",
							color: "slategrey",
							fontFamily: "Calibri",
							fontStyle: "normal",
						}}
					>
						TAT Graph{" "}
					</h6>
				</div>
				<Divider className="my-1 mb-5 divider" />
				<Linegraph tatData={tatData} />
			</div>
		</div>
	);
}

export default Dock;
