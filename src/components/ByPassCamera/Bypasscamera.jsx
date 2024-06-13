/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { notification } from "antd";
import { Table, Modal, Spin, Form, Popconfirm, Space, Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import FormControl from "@mui/material/FormControl";
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
import CAMERAICON from "../../Assets/camera.png";

import AdbIcon from "@mui/icons-material/Adb";
import ASSERTLOGO from "../../Assets/assertlogo.png";
import HOUSE from "../../Assets/house.png";
import ALERT from "../../Assets/alert.png";
import TEAM from "../../Assets/group.png";
import SUPPORT from "../../Assets/help-desk.png";
import jwt_decode from "jwt-decode";
import ReactSelect from "../MultiSelect/MySelect";

import { useNavigate } from "react-router-dom";
import SWITCHOFF from "../../Assets/powernew.png";
import LOGO from "../../Assets/parekh.jpeg";
import SideBar from "../Dashboard/SideBar";
import { decryptRequest } from "../../utils/crypt";
import { FilterForByPassCamera } from "../../services/Filters";
import { getByPassCameraList } from "../../services/AlertsTable";
import { sendQuery } from "../../services/Support";
import { LogActivity } from "../../services/Login";

import "./index.css";

const { TextArea } = Input;

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

function Bypasscamera() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accessValue, setAccessValue] = useState("");
  const [description, setDescription] = useState("");
  const [opendrawer, setOpenDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cameraoptions, setCameraOptions] = useState([]);
  const [cameraOptionSelected, setcameraoptionSelected] = useState(null);

  const handleCameraChange = (selected) => {
    setcameraoptionSelected(selected);
  };
  const getFiltersData = async () => {
    let camerasList = await FilterForByPassCamera();
    if (camerasList?.data.length > 0) {
      setCameraOptions(camerasList.data);
    }
  };
  const getTableData = async () => {
    let camerasListData = await getByPassCameraList();
    if (camerasListData?.data.length > 0) {
      setTableData(camerasListData.data);
    }
  };
  const onChange = (checked) => {
    if (checked == true) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
      setcameraoptionSelected(null);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
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
  const handleLogout = () => {
    navigate("/");
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let path = localStorage.getItem("path");
    if (path == "/bypasscamera") {
      setIsActive(true);
    }
    var decoded = jwt_decode(token);
    let { data } = decoded;
    decryptRequest(data).then((res) => {
      let { name, email, access } = JSON.parse(res);
      setName(name);
      setEmail(email);
      setAccessValue(access);
    });
    getFiltersData();
    getTableData();
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

  const handleSubmit = async () => {
    let cameraSelected = cameraOptionSelected;
    if (description == "") {
      openNotification("Please Enter Description.");
    } else {
      let emailResponse = await sendQuery({
        email,
        description,
        cameraSelected,
      });
      if (emailResponse.message == "Check Your Mail. A Link has been sent.") {
        openNotification("Check Your Mail. A Link has been sent.");
      } else {
        openNotification("Something Went Wrong.");
      }
    }
  };
  const columns = [
    {
      title: (
        <>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Sno.
          </span>
        </>
      ),
      key: "Id",
      dataIndex: "id",
      align: "left",
    },
    {
      title: (
        <>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Camera
          </span>
        </>
      ),
      key: "camera_name",
      dataIndex: "camera_name",
      align: "left",
    },
    {
      title: (
        <>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Status
          </span>
        </>
      ),
      key: "status",
      dataIndex: "status",
      align: "left",
      render: (status) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "2vh",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            {status}
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor:
                  status == "Online"
                    ? "green"
                    : status == "Offline"
                    ? "Orange"
                    : "Red",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: (
        <>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            ByPass
          </span>
        </>
      ),
      key: "bypass",
      dataIndex: "bypass",
      align: "left",
      render: (bypass) => {
        return <>{bypass == "False" ? "Not Bypassed" : "By Passed"}</>;
      },
    },
  ];
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
                localStorage.setItem("path", "/home");
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
      <div
        style={{
          display: accessValue == "Admin" ? "flex" : "none",
          width: "100%",
        }}
      >
        <div className="filters2" style={{ width: "100%" }}>
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
          <div
            style={{
              marginLeft: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <TextArea
              rows={4}
              placeholder="Enter Description for Bypassing the camera"
              onChange={handleDescriptionChange}
              style={{ width: "100vh" }}
            />
          </div>
          <button
            className="my-3 btn btn-dark"
            style={{ backgroundColor: "#2292A4" }}
            onClick={handleSubmit}
          >
            {" "}
            Submit
          </button>
        </div>
      </div>
      <div style={{ padding: "5vh" }}>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
}

export default Bypasscamera;
