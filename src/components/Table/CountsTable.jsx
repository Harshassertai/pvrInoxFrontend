import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import ReactSelect from ".././MultiSelect/MySelect";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Cookies from "js-cookie";
import {
  Table,
  notification,
  Modal,
  Button,
  Spin,
  Form,
  Popconfirm,
  Space,
  Input,
} from "antd";
import Magnifier from "react-magnifier";
import { SmileOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CAMERAICON from "../../Assets/camera.png";
import IMAGEICON from "../../Assets/picture.png";
import DATEICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import NOTFOUNDICON from "../../Assets/not-found.png";
import ALERT from "../../Assets/alert.png";
import TEAM from "../../Assets/group.png";
import SUPPORT from "../../Assets/help-desk.png";
import ZONEICON from "../../Assets/zone.png";
import STATUSICON from "../../Assets/clipboard.png";
import DOWNLOADICON from "../../Assets/download.png";
import HOUSE from "../../Assets/house.png";
import PERSONICON from "../../Assets/man.png";
import ALERTICON from "../../Assets/alert.png";
import TATICON from "../../Assets/delivery.png";
import TYPEICON from "../../Assets/typing.png";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SWITCHOFF from "../../Assets/powernew.png";
import jwt_decode from "jwt-decode";
import LOGO from "../../Assets/parekh.jpeg";
import "./index.css";

import { decryptRequest } from "../../utils/crypt";

//For Last 24hrs
import { get24hrsCardAlertsList } from "../../services/Last24hrs";
//For Filters
import { FilterForStatus } from "../../services/Filters";

import { BarGraphClick } from "../../services/Graph";
import {
  getCardAlertsList,
  postComment,
  commentList,
  closeStatus,
  bulkCloseStatus,
  postCommentForBulkStatusClose,
} from "../../services/AlertsTable";
const { TextArea } = Input;

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
const settings = ["Logout"];

function CountsTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cardNameValue, setCardName] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [Image, setImage] = React.useState("");

  const fetchDataForTable = async (cardName) => {
    console.log("fetch data ------> ", cardName);
    let { startDate, endDate, startTime, endTime } = state.dates;
    let data = await getCardAlertsList({
      startingDateValue: startDate,
      endingDateValue: endDate,
      startingTimeValue: startTime,
      endingTimeValue: endTime,
      cardName,
    });

    if (data == "Token Expired,Login Again.") {
      openNotification(data);
      navigate("/");
    } else if (data == "No Data") {
      setTableData([]);
    } else {
      console.log("Data values -----> ", data);
      setTableData(data?.data);
    }
  };

  const fetchDataForTableFor24hrs = async (cardName) => {
    console.log("fetch data ------> ", cardName);
    let data = await get24hrsCardAlertsList({
      cardName,
    });

    if (data == "Token Expired,Login Again.") {
      openNotification(data);
      navigate("/");
    } else if (data == "No Data") {
      setTableData([]);
    } else {
      console.log("Data values -----> ", data);
      setTableData(data?.data);
    }
  };

  useEffect(() => {
    console.log("State Value After Card Click ---> ", state);
    let { cardName } = state;
    setCardName(cardName);
    if (state.handleDataClicked) {
      console.log("State for handleDataClicked", state.handleDataClicked);
      fetchDataForTable(cardName);
    } else {
      fetchDataForTableFor24hrs(cardName);
    }
  }, []);

  const handleSideBar = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigate = (path) => {
    localStorage.setItem("path", path);
    navigate(path);
  };
  const handleOpenImageModal = () => setImageModalOpen(true);
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("Dates");
    localStorage.clear();
    Cookies.remove("name");
    navigate("/");
  };
  const onChange = (pagination, filters, sorter, extra) => {};

  const columns = [
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={DATEICON}
              style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
              alt="LOGO"
            />
          </IconButton>

          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Date
          </span>
        </>
      ),
      dataIndex: "date",
      // filters: tableData?.map((item) => {
      // 	return {
      // 		text: item.date,
      // 		value: item.date,
      // 	};
      // }),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.date.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={CLOCKICON}
              style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
              alt="LOGO"
            />
          </IconButton>

          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Time
          </span>
        </>
      ),
      dataIndex: "time",
      defaultSortOrder: "descend",
      // filters: tableData?.map((item) => {
      // 	return {
      // 		text: item.time,
      // 		value: item.time,
      // 	};
      // }),
      // onFilter: (value, record) => record.time.indexOf(value) === 0,
    },

    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={CAMERAICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
          </IconButton>

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
      dataIndex: "camera",
      // filters: tableData?.map((item) => {
      // 	return {
      // 		text: item.camera,
      // 		value: item.camera,
      // 	};
      // }),
      // onFilter: (value, record) => record.camera.indexOf(value) === 0,
    },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={ALERT}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
          </IconButton>

          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Alerts
          </span>
        </>
      ),
      key: "alert",
      dataIndex: "alert",
      align: "left",
    },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={ZONEICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
          </IconButton>

          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Zone
          </span>
        </>
      ),
      key: "zone",
      dataIndex: "zone",
      align: "left",
    },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={IMAGEICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
          </IconButton>

          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Image
          </span>
        </>
      ),
      dataIndex: "address",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1vh", alignItems: "center" }}>
          <img
            src={record.image != "" ? record.image : NOTFOUNDICON}
            alt={IMAGEICON}
            onClick={function () {
              handleOpenImageModal();
              setImage(record.image);
            }}
            style={{
              width: "200px",
              height: "100px",
              cursor: "pointer",
              border: "1px solid skyblue",
              padding: "0.5vh",
              borderRadius: "2vh",
            }}
          />
          {/* <Button
            type="primary"
            style={{ backgroundColor: "#2292A4" }}
            onClick={function () {
              handleOpenVideo();
              setVideo(record.video);
            }}
          >
            video
          </Button> */}
        </div>
      ),
      // filters: tableData?.map((item) => {
      // 	return {
      // 		text: item.image ? item.image : "not image",
      // 		value: item.image ? item.image : "not image",
      // 	};
      // }),
      // onFilter: (value, record) => record.image.indexOf(value) === 0,
    },
    // {
    //   title: (
    //     <>
    //       <IconButton sx={{ p: 1 }}>
    //         <img
    //           src={STATUSICON}
    //           style={{ width: "5vh", height: "5vh" }}
    //           alt="LOGO"
    //         />
    //       </IconButton>

    //       <span
    //         style={{
    //           color: "slategray",
    //           fontSize: "large",
    //           fontFamily: "Calibri",
    //           fontWeight: "normal",
    //         }}
    //       >
    //         Status
    //       </span>
    //     </>
    //   ),
    //   dataIndex: "",
    //   key: "status",
    //   // render: (value, record, index) => (
    //   //   <Button
    //   //     type="primary"
    //   //     style={{
    //   //       backgroundColor:
    //   //         record.status == "Open" ||
    //   //         record.status == null ||
    //   //         record.status == ""
    //   //           ? "#BA5D4F"
    //   //           : "#519872",
    //   //       height: "auto",
    //   //     }}
    //   //     onClick={async () => {
    //   //       setModalOpen(true);
    //   //       setModalRecord(record);
    //   //       console.log("Status ", record);

    //   //       let commentsList = await commentList(record.id);
    //   //       console.log("Comments List ", commentsList);
    //   //       setComments(
    //   //         JSON.parse(commentsList?.data[0]?.comments)
    //   //           ? JSON.parse(commentsList?.data[0]?.comments)
    //   //           : []
    //   //       );
    //   //       setStatusValue(record.status);
    //   //     }}
    //   //   >
    //   //     {record.status == "Open" ||
    //   //     record.status == null ||
    //   //     record.status == "" ? (
    //   //       // <img src={OPENICON} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
    //   //       <span>OPEN</span>
    //   //     ) : (
    //   //       <span>CLOSE</span>
    //   //       // <img
    //   //       // 	src={CLOSEDICON}
    //   //       // 	style={{ width: "5vh", height: "5vh" }}
    //   //       // 	alt="LOGO"
    //   //       // />
    //   //     )}
    //   //   </Button>
    //   // ),
    //   align: "left",
    // },
  ];
  const handleBack = (path) => {
    localStorage.setItem("path", path);
    let localStorageDates = localStorage.getItem("Dates");
    console.log("local Storage Dates -----> ", localStorageDates);
    let { startDate, endDate, startTime, endTime } =
      JSON.parse(localStorageDates);
    navigate("/home", {
      state: {
        backClicked: true,
        selectedDates: { startDate, endDate, startTime, endTime },
      },
    });
  };

  return (
    <>
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
                  <Tooltip title="Home">
                    <IconButton>
                      <img
                        src={HOUSE}
                        style={{ width: "5vh", height: "5vh" }}
                        alt="LOGO"
                      />
                    </IconButton>
                  </Tooltip>
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
                  <Tooltip title="Alerts">
                    <IconButton>
                      <img
                        src={ALERT}
                        style={{ width: "5vh", height: "5vh" }}
                        alt="LOGO"
                      />
                    </IconButton>
                  </Tooltip>
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
                onClick={() => handleNavigate("/support")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Support">
                    <IconButton>
                      <img
                        src={SUPPORT}
                        style={{ width: "5vh", height: "5vh" }}
                        alt="LOGO"
                      />
                    </IconButton>
                  </Tooltip>
                  <span
                    onClick={() => handleNavigate("/support")}
                    style={{ cursor: "pointer" }}
                  >
                    Support
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
        className="mx-3 my-3"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <span
          style={{
            width: "9vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "large",
            color: "slategray",
            backgroundColor: "#2292A4",
            color: "white",
            borderRadius: "5px",
          }}
        >
          Total Count {tableData?.length ? tableData.length : 0}
        </span>

        <span
          style={{
            width: "90vw",
            textAlign: "center",
            fontSize: "x-large",
            color: "slategray",
          }}
        >
          {cardNameValue ? cardNameValue : ""}
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "10vh",
          }}
        >
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#2292A4" }}
            onClick={() => handleBack("/home")}
          >
            Back
          </button>
        </div>
      </div>
      <div>
        <div style={{ padding: "2vh" }}>
          <Table
            rowKey={(record) => record.id}
            // rowSelection={rowSelection}
            // rowSelection={{
            //   selectedRowKeys: selectedRowsKeys,
            //   onChange: (keys, selectedRowKeys, selectedRows) => {
            //     console.log("Selected rows ", selectedRowKeys);
            //     setRowsValues(selectedRowKeys);
            //     setSelectedRowKeys(keys);
            //     setRowsDocuments(keys);
            //     setShowBulkCloseButton(true);
            //     if (selectedRowKeys.length <= 0) {
            //       setShowBulkCloseButton(false);
            //     }
            //   },
            // }}
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
          />
        </div>
      </div>
      <Modal
        open={imageModalOpen}
        centered
        onClose={handleCloseImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onOk={handleCloseImageModal}
        onCancel={handleCloseImageModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Image
          </Typography>
          {/* <Magnifier src={Image} mgShape="square" /> */}
          {/* {Image ? (
						<Magnifier src={Image} mgShape="square" alt="_blank" />
					) : (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<img
								src={NOTFOUNDICON}
								alt="_blank"
								style={{ width: "15vh", height: "15vh" }}
							/>
						</div>
					)} */}
          {Image ? (
            <>
              <Magnifier src={Image} mgShape="square" alt="_blank" />
              <a href={Image}>
                <img
                  src={DOWNLOADICON}
                  style={{ width: "5vh", height: "5vh" }}
                  className="my-3"
                />{" "}
                Download
              </a>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={NOTFOUNDICON}
                alt="_blank"
                style={{ width: "15vh", height: "15vh" }}
              />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default CountsTable;
