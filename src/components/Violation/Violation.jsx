import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import CAMERAICON from "../../Assets/camera.png";
import CALENDARICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import IMAGEICON from "../../Assets/picture.png";
import NOTWOWHEELERICON from "../../Assets/no-bike.png";
import MATERIALOUTSIDEICON from "../../Assets/packages.png";
import PERSONBOXICON from "../../Assets/helping.png";

function Violation(props) {
	const {
		violationApiResponse: {
			data: { noTwoWheelerCount, materialLayingOutside, personCarryingBoxes } = {},
		},
		dates,
		last,
	} = props;
	const navigate = useNavigate();
	localStorage.setItem("Dates", JSON.stringify(dates));
	const handleNoTwoWheeler = () => {
		navigate("/notwowheeler");
	};
	const handleMateriallayingOutside = () => {
		navigate("/materiallayingoutside");
	};
	const handlePersonCarryingBoxes = () => {
		navigate("/personcarryingboxes");
	};
	return (
		<div>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				{/* <div
					style={{
						width: "auto",
						border: "1px solid skyblue",
						borderRadius: "5px",
						height: "auto",
						padding: "2vh",
						cursor: "pointer",
					}}
					onClick={handleNoTwoWheeler}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<h4>No Two wheeler </h4>
						<h6>{noTwoWheelerCount ? noTwoWheelerCount : "0"}</h6>
					</div>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<h6>Last Alert</h6>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								width: "auto",
								padding: "1vh",
							}}
						>
							<img
								src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
								alt="_blank"
								style={{ width: "20vw", height: "10vw" }}
							/>
							<ul>
								<li>
									<CameraAltIcon />
									{last && last[2]?.camera ? last[2]?.camera : "No Data"}
								</li>
								<li>
									<CalendarMonthIcon />
									{last && last[2]?.date ? last[2]?.date : "No Data"}
								</li>
								<li>
									<AccessAlarmIcon />
									{last && last[2]?.time ? last[2]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div>
				</div> */}
				<div
					onClick={handleNoTwoWheeler}
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
							flexWrap: "wrap",
						}}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<img
							src={NOTWOWHEELERICON}
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
							No Two Wheeler {noTwoWheelerCount ? noTwoWheelerCount : "0"}
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
					style={{
						width: "auto",
						border: "1px solid skyblue",
						borderRadius: "5px",
						height: "auto",
						padding: "2vh",
						cursor: "pointer",
					}}
					onClick={handleMateriallayingOutside}
				>
					<div
					// onClick={handleNoTwoWheeler}
					// style={{
					// 	border: "1px solid skyblue",
					// 	padding: "1vh",
					// 	borderRadius: "5px",
					// }}
					>
						<Box
							sx={{
								flexGrow: 0,
								display: { xs: "flex" },
								mx: "5vh",
								flexWrap: "wrap",
							}}
							style={{ display: "flex", justifyContent: "space-between" }}
						>
							<img
								src={MATERIALOUTSIDEICON}
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
								Material Laying Outside{" "}
								{materialLayingOutside ? materialLayingOutside : "0"}
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
					{/* <div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<h4>Material laying outside</h4>
						<h6>{materialLayingOutside ? materialLayingOutside : "0"}</h6>
					</div>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<h6>Last Alert</h6>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								width: "auto",
								padding: "1vh",
							}}
						>
							<img
								src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
								alt="_blank"
								style={{ width: "20vw", height: "10vw" }}
							/>
							<ul>
								<li>
									<CameraAltIcon />{" "}
									{last && last[0]?.camera ? last[0]?.camera : "No Data"}
								</li>
								<li>
									<CalendarMonthIcon />{" "}
									{last && last[0]?.date ? last[0]?.date : "No Data"}
								</li>
								<li>
									<AccessAlarmIcon /> {last && last[0]?.time ? last[0]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div> */}
				</div>
				<div
					style={{
						width: "auto",
						border: "1px solid skyblue",
						borderRadius: "5px",
						height: "auto",
						padding: "2vh",
						cursor: "pointer",
					}}
					onClick={handlePersonCarryingBoxes}
				>
					<Box
						sx={{
							flexGrow: 0,
							display: { xs: "flex" },
							mx: "5vh",
							flexWrap: "wrap",
						}}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<img
							src={PERSONBOXICON}
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
							Person Carrying Boxes{" "}
							{materialLayingOutside ? materialLayingOutside : "0"}
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
			</div>
			{/* <div
				style={{ display: "flex", justifyContent: "space-between" }}
				className="my-3"
			>
				<div
					style={{
						width: "auto",
						border: "1px solid skyblue",
						borderRadius: "5px",
						height: "auto",
						padding: "2vh",
						cursor: "pointer",
					}}
					onClick={handlePersonCarryingBoxes}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<h4>Person carrying boxes</h4>
						<h6>{personCarryingBoxes ? personCarryingBoxes : "0"}</h6>
					</div>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<h6>Last Alert</h6>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								width: "auto",
								padding: "1vh",
							}}
						>
							<img
								src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
								alt="_blank"
								style={{ width: "20vw", height: "10vw" }}
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
			</div> */}
		</div>
	);
}

export default Violation;
