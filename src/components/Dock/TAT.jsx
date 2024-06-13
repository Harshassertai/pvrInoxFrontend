/* eslint-disable */
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LOGO from "../../Assets/parekh.jpeg";
import SWITCHOFF from "../../Assets/powernew.png";
import SideBar from "../Dashboard/SideBar";

import { decryptRequest } from "../../utils/crypt";
import TATICON from "../../Assets/stopwatches.png";
import Table from "./TATTable";

import "./index.css";

const pages = [""];
const settings = ["Logout"];

function TAT() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [open, setOpen] = useState(false);
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
	const handleSideBar = () => {
		setOpen(!open);
	};
	const handleLogout = () => {
		navigate("/");
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
	}, []);
	return (
		<div>
			{" "}
			<nav
				className="navbar navbar-expand-lg navBar"
				style={{
					display: "flex",
					justifyContent: "space-betweeen",
					backgroundColor: "#2292A4",
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
							{/* <MenuItem key={1} onClick={handleCloseUserMenu}>
									
								</MenuItem> */}

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
				<div className="MainDiv">
					<div
						style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
					>
						{/* <Tooltip title="TAT" placement="right-start">
							<img
								src={TATICON}
								style={{ width: "10vh", height: "10vh" }}
								alt="LOGO"
							/>
						</Tooltip> */}
						<Typography
							textAlign="center"
							style={{
								fontSize: "x-large",
								fontFamily: "Calibri",
								fontStyle: "normal",
								color: "slategray",
							}}
						>
							Vehicle Turn Around Time
						</Typography>
					</div>
					<Table />
				</div>
			</div>
		</div>
	);
}

export default TAT;
