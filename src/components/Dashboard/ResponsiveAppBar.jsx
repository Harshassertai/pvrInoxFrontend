import React, { useState, useEffect } from "react";
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
import SWITCHOFF from "../../Assets/powernew.png";
import jwt_decode from "jwt-decode";
import { decryptRequest } from "../../utils/crypt";
import Main from "./Main";

const pages = [""];
const settings = ["Logout"];

function ResponsiveAppBar() {
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
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<img src={LOGO} style={{ width: "10vh", height: "8vh" }} alt="LOGO" />
						{/* <img
							src={ASSERTLOGO}
							style={{ width: "20vh", height: "8vh", marginLeft: "1vh" }}
							alt="LOGO"
						/> */}
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex" },
								mx: "5vh",
								flexWrap: "nowrap",
							}}
						>
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
						</Box>

						{/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography> */}
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{page}
								</Button>
							))}
						</Box>
						{/* <Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
									<img src={HOUSE} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
								</IconButton>
							</Tooltip>
						</Box> */}
						{/* <Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Dashboard">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
									<img src={HOUSE} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
								</IconButton>
							</Tooltip>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Alerts">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
									<img src={ALERT} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
								</IconButton>
							</Tooltip>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Users">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
									<img src={TEAM} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
								</IconButton>
							</Tooltip>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Support">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
									<img
										src={SUPPORT}
										style={{ width: "5vh", height: "5vh" }}
										alt="LOGO"
									/>
								</IconButton>
							</Tooltip>
						</Box> 
            */}
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
									<Typography textAlign="center">Name : {name}</Typography>
								</MenuItem>
								<MenuItem key={2} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">Email : {email}</Typography>
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
										>
											<img
												src={SWITCHOFF}
												style={{ width: "5vh", height: "5vh" }}
												alt="LOGO"
											/>
											<span style={{ marginLeft: "2vh" }}>{setting}</span>
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<div style={{ display: "flex" }} className="my-3 mx-2">
				{/* <SideBar display={open} /> */}
				<Main />
			</div>
		</>
	);
}

export default ResponsiveAppBar;
