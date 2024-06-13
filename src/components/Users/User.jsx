/* eslint-disable */
import React, { useState, useEffect } from "react";
import { notification, Button, Modal, Input, Select } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import jwt_decode from "jwt-decode";
import { decryptRequest } from "../../utils/crypt";

import { useNavigate } from "react-router-dom";
import LOGO from "../../Assets/inoxLogo.png";
import SideBar from "../Dashboard/SideBar";
import SWITCHOFF from "../../Assets/powernew.png";
import USERSLOGO from "../../Assets/employee.png";
import HOUSE from "../../Assets/house.png";
import ALERT from "../../Assets/alert.png";
import TEAM from "../../Assets/group.png";
import SUPPORT from "../../Assets/help-desk.png";
import CAMERAICON from "../../Assets/camera.png";
import Table from "./UsersTable";

import { getUsersList } from "../../services/User";
import { signUpFetch } from "../../services/Login";

import "./index.css";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const pages = [""];
const settings = ["Logout"];

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

function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [usersdata, setUsersData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accessValueForNewUser, setAccessValuForNewUser] = useState("User");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [opendrawer, setOpenDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isActive, setIsActive] = useState(false);
  const [accessValue, setAccessValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addClick, setAddClick] = useState(false);

  //Modal Function
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  ///

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

  const usersListFunction = async () => {
    let data = await getUsersList();
    if (data?.response?.data?.message === "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      navigate("/");
    } else {
      setUsersData(data);
    }
  };

  useEffect(() => {
    let path = localStorage.getItem("path");
    console.log("Path value of users ", path);
    if (path == "/users") {
      setIsActive(true);
    }
    usersListFunction();
    setAddClick(false);
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    let { data } = decoded;
    decryptRequest(data).then((res) => {
      console.log("USERS LIST RESPONSE -----> ", JSON.parse(res));
      let { name, email, access } = JSON.parse(res);
      setName(name);
      setEmail(email);
      setAccessValue(access);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setNewUserPassword(e.target.value);
  };

  const handleAccessChange = (value) => {
    setAccessValuForNewUser(value);
  };
  function validateEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }
  const handleAddUser = async (e) => {
    let emailValidation = validateEmail(newUserEmail);
    if (newUserName == "") {
      openNotification("Enter User Name");
      setIsModalOpen(false);
      return;
    }
    if (emailValidation) {
      let data = await signUpFetch({
        newUserName,
        newUserEmail,
        newUserPassword,
        accessValueForNewUser,
      });
      if (data === "User got registered with us") {
        openNotification("User Added Successfully");
        setIsModalOpen(false);
        await usersListFunction();
        window.location.reload();
      } else if (data === "This User Already Exists") {
        openNotification("The User With Same Email Already Exists.");
        setIsModalOpen(false);
      } else {
        openNotification(data);
        setIsModalOpen(false);
      }
    } else {
      openNotification("Enter a valid email");
      setIsModalOpen(false);
    }
  };

  const handleSideBar = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    navigate("/");
  };
  const handleNavigate = (path) => {
    localStorage.setItem("path", path);
    navigate(path);
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
              style={{ width: "9vh", height: "8vh" }}
              alt="LOGO"
            />
            <Typography
              textAlign="center"
              style={{
                fontSize: "x-large",
                fontFamily: "Calibri",
                fontStyle: "normal",
              }}
            >
              PVR INOX
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
          <Box sx={{ flexGrow: 0, display: "flex", gap: "5vh" }}>
            <div
              style={{
                display: "flex",
                width: "auto",
                gap: "5vh",
              }}
            >
              <Box sx={{ flexGrow: 0 }} onClick={() => handleNavigate("/home")}>
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
                    onClick={() => handleNavigate("/support")}
                    style={{ cursor: "pointer" }}
                  >
                    Support
                  </span>
                </div>
              </Box>
              <Box
                sx={{ flexGrow: 0 }}
                onClick={() => handleNavigate("/users")}
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
                fontFamily: "Calibri",
                fontStyle: "normal",
                color: "slategray",
              }}
            >
              Users
            </Typography>
          </div>
          {/* <div style={{ position: "absolute" }}>
            <Tooltip
              title={
                accessValue == "Admin"
                  ? "Click Here To Add The User"
                  : "You Don't Have Permission For Adding User."
              }
            >
              <Button
                onClick={showModal}
                disabled={accessValue == "Admin" ? false : true}
              >
                Add User
              </Button>
            </Tooltip>
          </div> */}
          {/* <div style={{ position: "absolute" }}>
            <Button
              onClick={() => {
                navigate("/timeline", {
                  state: {
                    email,
                  },
                });
              }}
            >
              Show Activity
            </Button>
          </div> */}

          <Table apiData={usersdata} addClick={addClick} />

          <>
            <Modal
              title="Add User"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div
                style={{ display: "flex", Gap: "2vh", flexDirection: "column" }}
              >
                <div style={{ padding: "1vh" }}>
                  <Input placeholder="Name" onChange={handleNameChange} />
                </div>
                <div style={{ padding: "1vh" }}>
                  <Input placeholder="Email" onChange={handleEmailChange} />
                </div>
                <div style={{ padding: "1vh" }}>
                  <Select
                    placeholder="Outlined"
                    style={{
                      width: 120,
                    }}
                    defaultValue="User"
                    value={accessValueForNewUser}
                    onChange={handleAccessChange}
                    options={[
                      {
                        value: "User",
                        label: "User",
                      },
                      {
                        value: "Admin",
                        label: "Admin",
                      },
                    ]}
                  />
                </div>
                <div style={{ padding: "1vh" }}>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div style={{ padding: "1vh", gap: "1vh", display: "flex" }}>
                  <Button onClick={handleAddUser}>Submit</Button>
                  <Button onClick={handleModalClose}>Cancel</Button>
                </div>
              </div>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
}

export default User;
