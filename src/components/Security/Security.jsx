import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CAMERAICON from "../../Assets/camera.png";
import CALENDARICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import IMAGEICON from "../../Assets/picture.png";
import PPEICON from "../../Assets/vest.png";
import FIREEXTINGUISHERICON from "../../Assets/fire-extinguisher.png";
import EMERGENCYEXITICON from "../../Assets/emergency-sign.png";

function Security(props) {
	const [open, setOpen] = React.useState(false);
	const {
		securityApiResponse: {
			data: { ppe, emergencyExitBayCount, fireextingguishernotavailable } = {},
		},
		dates,
		last,
	} = props;
	console.log("security", props);
	const navigate = useNavigate();
	localStorage.setItem("Dates", JSON.stringify(dates));
	const handlePPE = () => {
		navigate("/personwithouthelmet");
	};
	const handlefireextingguisher = () => {
		navigate("/handlefireextingguisher");
	};
	const handleemergencyexitbayinterruption = () => {
		navigate("/handleemergencyexitbayinterruption");
	};

	return (
		<div>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div
					onClick={handlePPE}
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
						style={{ display: "flex", justifyContent: "space-evenly" }}
					>
						<img src={PPEICON} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
						<Typography
							textAlign="center"
							style={{
								fontSize: "large",
								fontFamily: "Calibri",
								fontStyle: "normal",
								color: "black",
							}}
						>
							PPE {ppe ? ppe : "0"}
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img src={last[2]?.image ? last[2]?.image : IMAGEICON} alt={IMAGEICON} />
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
				<div
					onClick={handleemergencyexitbayinterruption}
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
							src={EMERGENCYEXITICON}
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
							Emergency Exit Bay Interruption{" "}
							{emergencyExitBayCount ? emergencyExitBayCount : "0"}
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img src={last[1]?.image ? last[1]?.image : IMAGEICON} alt={IMAGEICON} />
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
					onClick={handlefireextingguisher}
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
							src={FIREEXTINGUISHERICON}
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
							Fire Extinguisher Not Available{" "}
							{fireextingguishernotavailable ? fireextingguishernotavailable : "0"}
						</Typography>
					</Box>
					<Divider style={{ backgroundColor: "skyblue" }} className="my-3 mb-3" />
					<div className="InnerCard">
						<img
							src={last && last[0]?.image ? last[0].image : IMAGEICON}
							alt={IMAGEICON}
						/>
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
			</div>
		</div>
	);
}

export default Security;
