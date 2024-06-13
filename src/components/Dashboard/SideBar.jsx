import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Support from "../Support/Support";
import AdbIcon from "@mui/icons-material/Adb";

import LOGO from "../../Assets/parekh.jpeg";
import ASSERTLOGO from "../../Assets/assertlogo.png";
import HOUSE from "../../Assets/house.png";
import ALERT from "../../Assets/alert.png";
import TEAM from "../../Assets/group.png";
import SUPPORT from "../../Assets/help-desk.png";
import "./index.css";

function SideBar(props) {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

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
	const handleNavigate = (path) => {
		console.log("path", path);
		navigate(path);
	};
	const { display } = props;
	return (
		<div
			className="navBar"
			style={{
				// backgroundColor: "white",
				width: "auto",
				height: "auto",
				padding: "2vh",
				display: display ? "block" : "none",
				borderRadius: "10px",
				backgroundColor: "#2292A4",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "5vh",
					// marginTop: "2vh",
				}}
			>
				<Box sx={{ flexGrow: 0 }} onClick={() => handleNavigate("/home")}>
					<Tooltip title="Dashboard" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img src={HOUSE} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
						</IconButton>
					</Tooltip>
				</Box>
				<Box sx={{ flexGrow: 0 }} onClick={() => handleNavigate("/alerts")}>
					<Tooltip title="Alerts" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img src={ALERT} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
						</IconButton>
					</Tooltip>
				</Box>
				<Box sx={{ flexGrow: 0 }} onClick={() => handleNavigate("/users")}>
					<Tooltip title="Users" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img src={TEAM} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
						</IconButton>
					</Tooltip>
				</Box>
				<Box sx={{ flexGrow: 0 }} onClick={() => handleNavigate("/support")}>
					<Tooltip title="Support" placement="right-start">
						<IconButton sx={{ p: 1 }}>
							<img src={SUPPORT} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
						</IconButton>
					</Tooltip>
				</Box>
			</div>
			{/* <div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "2vh",
					marginTop: "2vh",
				}}
			>
				<a className="sidebarOption" href="/home">
					Dashboard
				</a>
				<a className="sidebarOption" href="/users">
					Users
				</a>
				<a className="sidebarOption" href="/alerts">
					Alerts
				</a>
				<a className="sidebarOption" href="/support">
					Support
				</a>
			</div> */}
		</div>
	);
}

export default SideBar;
