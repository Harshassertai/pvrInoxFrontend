import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import LoginIcon from "@mui/icons-material/Login";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Divider from "@mui/material/Divider";

import INTRUSIONICON from "../../Assets/intrusionnew.png";
import LETTERLICON from "../../Assets/letter-l.png";
import CAMERAICON from "../../Assets/camera.png";
import CALENDARICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import IMAGEICON from "../../Assets/picture.png";
import DOOROPENICON from "../../Assets/door open.png";
import DOORCLOSEDICON from "../../Assets/door close.png";
import CROWDICON from "../../Assets/crowd.png";
import OFFICEAREATIMEICON from "../../Assets/working-man.png";

import "./index.css";

function Person(props) {
	console.log("PROPS OF PERSON ", props);

	const {
		personApiResponse: {
			data: {
				IntrusionCount,
				LoiteringCount,
				CrowdDetectionCount,
				OfficeAreaTimeCount,
				EntryCount,
				ExitCount,
			} = {},
		},
		dates,
		last,
	} = props;
	const navigate = useNavigate();
	localStorage.setItem("Dates", JSON.stringify(dates));
	const handleIntrusion = () => {
		navigate("/intrusion");
	};
	const handleLoitering = () => {
		navigate("/loitering");
	};

	const handleCrowdDetection = () => {
		navigate("/crowddetection");
	};
	const handleOfficeAreaTimeRestriction = () => {
		navigate("/officeareatimerestriction");
	};
	const handleEntryExit = () => {
		navigate("/entryexit");
	};
	return (
		<div>
			<div className="personMainContainer">
				<div
					onClick={handleIntrusion}
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
							src={INTRUSIONICON}
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
							Intrusion {IntrusionCount ? IntrusionCount : "0"}
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img
							src={last && last[1]?.image ? last[1]?.image : IMAGEICON}
							alt={IMAGEICON}
						/>
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
				<div className="cardWrapper" onClick={handleLoitering}>
					<div
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
								src={LETTERLICON}
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
								Loitering {LoiteringCount ? LoiteringCount : "0"}
							</Typography>
						</Box>
						<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
						<div className="InnerCard">
							<img
								src={last.length > 0 && last[0]?.image ? last[0]?.image : IMAGEICON}
								alt={IMAGEICON}
							/>
							<ul style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
								<li>
									<img
										src={CAMERAICON}
										style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
										alt="LOGO"
									/>
									{last.length > 0 && last[0]?.camera ? last[0]?.camera : "No Data"}
								</li>
								<li>
									<img
										src={CALENDARICON}
										style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
										alt="LOGO"
									/>
									{last.length > 0 && last[0].date ? last[0]?.date : "No Data"}
								</li>
								<li>
									<img
										src={CLOCKICON}
										style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
										alt="LOGO"
									/>
									{last.length && last[0]?.time ? last[0]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="cardWrapper" onClick={handleCrowdDetection}>
					<div
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
								src={CROWDICON}
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
								Crowd Detection {CrowdDetectionCount ? CrowdDetectionCount : "0"}
							</Typography>
						</Box>
						<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
						<div className="InnerCard">
							<img
								src={last && last[5]?.image ? last[5]?.image : IMAGEICON}
								alt={IMAGEICON}
							/>
							<ul style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
								<li>
									<img
										src={CAMERAICON}
										style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
										alt="LOGO"
									/>
									{last && last[5]?.camera ? last[5]?.camera : "No Data"}
								</li>
								<li>
									<img
										src={CALENDARICON}
										style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
										alt="LOGO"
									/>
									{last && last[5]?.date ? last[5]?.date : "No Data"}
								</li>
								<li>
									<img
										src={CLOCKICON}
										style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
										alt="LOGO"
									/>
									{last && last[5]?.time ? last[5]?.time : "No Data"}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					style={{
						border: "1px solid skyblue",
						padding: "1vh",
						borderRadius: "5px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "10vh",
						cursor: "pointer",
					}}
					onClick={handleEntryExit}
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
							Entry {EntryCount ? EntryCount : "0"}
						</Typography>
					</Box>

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
							Exit {ExitCount ? ExitCount : "0"}
						</Typography>
					</Box>
				</div>
			</div>
			<div className="my-3 personRow2">
				<div
					style={{
						border: "1px solid skyblue",
						padding: "1vh",
						borderRadius: "5px",
						cursor: "pointer",
					}}
					onClick={handleOfficeAreaTimeRestriction}
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
							src={OFFICEAREATIMEICON}
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
							Office Area Time Restriction{" "}
							{OfficeAreaTimeCount ? OfficeAreaTimeCount : "0"}
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img
							src={last && last[4]?.image ? last[4]?.image : IMAGEICON}
							alt={IMAGEICON}
						/>
						<ul style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
							<li>
								<img
									src={CAMERAICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[4]?.camera ? last[4]?.camera : "No Data"}
							</li>
							<li>
								<img
									src={CALENDARICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[4]?.date ? last[4]?.date : "No Data"}
							</li>
							<li>
								<img
									src={CLOCKICON}
									style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
									alt="LOGO"
								/>
								{last && last[4]?.time ? last[4]?.time : "No Data"}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Person;
