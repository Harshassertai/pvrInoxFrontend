import React, { useState, useEffect } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
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
import CAMERAICON from "../../Assets/camera.png";
// import { Avatar, Col, Divider, Drawer, List, Row } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LOGO from "../../Assets/parekh.jpeg";
import SWITCHOFF from "../../Assets/powernew.png";
import SideBar from "./SideBar";
import { decryptRequest } from "../../utils/crypt";
import { LogActivity } from "../../services/Login";
import Main from "./Main";
import "./index.css";
import { Divider } from "@mui/material";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const pages = [""];
const settings = ["Logout"];
function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accessValue, setAccessValue] = useState("");
  const [open, setOpen] = useState(true);
  const [opendrawer, setOpenDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isActive, setIsActive] = useState(false);

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

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleSideBar = () => {
    setOpen(!open);
  };
  const handleLogout = async () => {
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    let { data } = decoded;
    let decryptedResponse = await decryptRequest(data);
    console.log("Decrypted Response is ----> ", decryptedResponse);
    let { email } = JSON.parse(decryptedResponse);
    LogActivity({
      activity: [{ workDone: "Logout" }],
      type: "Logout button Clicked",
      email: email,
    });
    localStorage.removeItem("Dates");
    localStorage.clear();
    Cookies.remove("name");
    navigate("/");
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let path = localStorage.getItem("path");
    if (path == "/home") {
      setIsActive(true);
    }
    var decoded = jwt_decode(token);
    let { data } = decoded;
    decryptRequest(data).then((res) => {
      // console.log(JSON.parse(res));
      let { name, email, access } = JSON.parse(res);
      setName(name);
      setEmail(email);
      setAccessValue(access);
    });
  }, []);
  const handleNavigate = async (path) => {
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    let { data } = decoded;
    let decryptedResponse = await decryptRequest(data);
    let { email } = JSON.parse(decryptedResponse);
    LogActivity({
      activity: [{ workDone: "Get Data button Clicked Of Dashboard Page" }],
      type: "Get Data button Clicked",
      email: email,
    });
    if (accessValue == "User" && path == "/users") {
      localStorage.setItem("path", "/unauthorized");
      navigate("/unauthorized");
    } else if (accessValue == "User" && path == "/support") {
      localStorage.setItem("path", "/unauthorized");
      navigate("/unauthorized");
    } else {
      LogActivity({
        activity: [{ workDone: `Navigated to page ${path}` }],
        type: "Page Navigation",
        email: email,
      });
      localStorage.setItem("path", path);
      navigate(path);
    }
  };

  return (
    <div>
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
            <img
              src={LOGO}
              style={{ width: "9vh", height: "8vh", cursor: "pointer" }}
              alt="LOGO"
              onClick={() => {
                navigate("/home");
              }}
            />
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

        {/* <div
					className="logoutBtn"
					// style={{ display: "flex", justifyContent: "flex-end", width: "100vw" }}
				>
					<button className="btn btn-light my-2 my-sm-0" onClick={handleLogout}>
						Logout
					</button>
				</div> */}
        {/* <List
					dataSource={[
						{
							id: 1,
							name: name,
						},
					]}
					// bordered
					renderItem={(item) => (
						<List.Item
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
							key={item.id}
							actions={[
								<a onClick={showDrawer} key={`a-${item.id}`} style={{ color: "white" }}>
									View Profile
								</a>,
							]}
						>
							<List.Item.Meta
								avatar={
									<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
								}
							/>
						</List.Item>
					)}
				/>
				<Drawer
					width={640}
					placement="right"
					closable={false}
					onClose={onClose}
					open={opendrawer}
				>
					<p
						className="site-description-item-profile-p"
						style={{
							marginBottom: 24,
						}}
					>
						User Profile
					</p>
					<p className="site-description-item-profile-p">Personal Details</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Full Name" content={name} />
						</Col>
						<Col span={12}>
							<DescriptionItem title="Email" content={email} />
						</Col>
					</Row>
					<div
						className="logoutBtn my-3"
						// style={{ display: "flex", justifyContent: "flex-end", width: "100vw" }}
					>
						<button className="btn btn-primary my-2 my-sm-0" onClick={handleLogout}>
							Logout
						</button>
					</div>
				</Drawer> */}
        <div>
          <Box sx={{ flexGrow: 0, display: "flex", gap: "5vh" }}>
            <div
              style={{
                display: "flex",
                width: "auto",
                gap: "5vh",
              }}
            >
              <Box
                sx={{ flexGrow: 0 }}
                onClick={() => handleNavigate("/home")}
                className={isActive ? "NavbarItems" : ""}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <img
                      src={HOUSE}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                  </IconButton>

                  <span
                    onClick={() => handleNavigate("/home")}
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </span>
                </div>
              </Box>
              <Box
                sx={{ flexGrow: 0 }}
                onClick={() => handleNavigate("/alerts")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <img
                      src={ALERT}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                  </IconButton>
                  <span
                    onClick={() => handleNavigate("/alerts")}
                    style={{ cursor: "pointer" }}
                  >
                    Alerts
                  </span>
                </div>
              </Box>
              <Box
                sx={{ flexGrow: 0 }}
                onClick={() => handleNavigate("/bypasscamera")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <img
                      src={CAMERAICON}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                  </IconButton>
                  <span
                    onClick={() => handleNavigate("/bypasscamera")}
                    style={{ cursor: "pointer" }}
                  >
                    Camera
                  </span>
                </div>
              </Box>
              <Box
                sx={{ flexGrow: 0 }}
                onClick={() => handleNavigate("/support")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <img
                      src={SUPPORT}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                  </IconButton>
                  <span
                    onClick={(e) => handleNavigate(e, "/support")}
                    style={{ cursor: "pointer" }}
                  >
                    Support
                  </span>
                </div>
              </Box>
              <Box
                sx={{ flexGrow: 0 }}
                onClick={() => handleNavigate("/users")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <img
                      src={TEAM}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                  </IconButton>
                  <span
                    onClick={(e) => handleNavigate(e, "/users")}
                    style={{ cursor: "pointer" }}
                  >
                    Users
                  </span>
                </div>
              </Box>
            </div>

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
                  style={{
                    fontFamily: "Sans-serif",
                    fontStyle: "italic",
                    padding: "1vh",
                  }}
                >
                  Name : {name}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem key={2} onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  style={{
                    fontFamily: "Sans-serif",
                    fontStyle: "italic",
                    padding: "1vh",
                  }}
                >
                  Email : {email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                key={"1"}
                onClick={handleLogout}
                style={{
                  border: "1px solid slategray",
                  borderRadius: "5px",
                  backgroundColor: "#df2935",
                  marginLeft: "2vh",
                  marginRight: "2vh",
                  color: "whitesmoke",
                }}
              >
                <span>Logout</span>
              </MenuItem>
              {/* {settings.map((setting) => (
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
              ))} */}
            </Menu>
          </Box>
        </div>
      </nav>
      <div style={{ display: "flex" }} className="my-3 mx-2">
        {/* <SideBar display={open} /> */}
        <Main />
      </div>
    </div>
  );
}

export default Navbar;
