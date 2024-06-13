import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
	Table,
	notification,
	Modal,
	Button,
	Spin,
	Form,
	Input,
	Popconfirm,
	Space,
} from "antd";
import Magnifier from "react-magnifier";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
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
import TYPEICON from "../../Assets/typing.png";
import PERSONICON from "../../Assets/man.png";
import ALERTICON from "../../Assets/alert.png";
import TATICON from "../../Assets/delivery.png";

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
import { BarClickListFor24hrsForUserAssigned } from "../../services/Last24hrs";
//For Filters
import { FilterForStatus } from "../../services/Filters";

import { BarGraphClickForUsersAssigned } from "../../services/Graph";

import {
	getAlertsList,
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

function BarClickTableForUsersAssigned() {
	const [tableData, setTableData] = useState([]);
	const [tableTitle, setTableTitle] = useState("");
	const location = useLocation();
	const state = location.state;
	let { dates, usersAssigned, status } = state;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);
  const [opendrawer, setOpenDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [Image, setImage] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [openVideoModal, setOpenVideoModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusOptionSelected, setStatusOptionSelected] = useState("Open");

  const [commentText, setCommentText] = useState("");
  const [bulkCloseCommentText, setBulkCloseCommentText] = useState("");
  const [showBulkCloseButton, setShowBulkCloseButton] = useState(false);
  const [selectedRowsKeys, setSelectedRowKeys] = useState([]);
  const [rowsDocuments, setRowsDocuments] = useState([]);
  const [openBulkCommentModal, setOpenBulkCommentModal] = useState(false);
  const [rowsValues, setRowsValues] = useState([]);
  const [bulkStatusCommentsResponse, setBulkStatusCommentsResponse] = useState(
    []
  );
  const [comments, setComments] = useState([]);
  const [modalRecord, setModalRecord] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState("");

  const handleStatusChange = (e) => {
    setStatusOptionSelected(e.target.value);
  };

  const handleOpenImageModal = () => setImageModalOpen(true);
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  const handleOpenVideo = () => setOpenVideoModal(true);
  const handleCloseVideo = () => setOpenVideoModal(false);

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

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };
  const cancel = (e) => {
    //console.log(e);
    // message.error("Click on No");
  };
  const confirm = async (dataRecordOfStatus) => {
    if (comments.length == 0) {
      openNotification("Status Cannot be closed without comments.");
    } else {
      console.log("DATA RECORD OF STATUS ", dataRecordOfStatus.id);
      let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
      //console.log("data of closed ", dataofclosed);
      setStatusValue("Close");
      let startingDateValue = dates.startDate;
      let endingDateValue = dates.endDate;
      let startingTimeValue = dates.startTime;
      let endingTimeValue = dates.endTime;
      let alertSelected = dataRecordOfStatus.alert;
      let cameraSelected = dataRecordOfStatus.camera;
      let zoneSelected = dataRecordOfStatus.zone;
      let usersSelected = usersAssigned;
      if (state.isApiCall == false) {
        // let updatedTableData = await get24hrsAlertsList();
        // // //console.log("UpdatedTableData", updatedTableData);
        // setTableData(updatedTableData.data);
        let apiData = await BarClickListFor24hrsForUserAssigned(
          state.usersAssigned
        );
        setLoading(false);
        // setTableData(apiData.data);
        console.log("Status selected ", statusOptionSelected);
        let tableDataToBeSet = apiData.data
          .filter((item) => {
            if (statusOptionSelected) {
              return item.status == statusOptionSelected;
            }
          })
          .map((item) => {
            return item;
          });
        setTableData(tableDataToBeSet);
        setTableTitle(apiData.title);
      } else {
        // let updatedTableData = await getAlertsList({
        // 	startingDateValue,
        // 	startingTimeValue,
        // 	endingDateValue,
        // 	endingTimeValue,
        // 	cameraSelected,
        // 	alertSelected,
        // 	zoneSelected,
        // 	usersSelected,
        // });
        // // //console.log("UpdatedTableData", updatedTableData);
        // setTableData(updatedTableData.data);
        let apiData = await BarGraphClickForUsersAssigned({
          startingDateValue: dates.startDate,
          startingTimeValue: dates.startTime,
          endingDateValue: dates.endDate,
          endingTimeValue: dates.endTime,
          usersAssigned: usersAssigned,
        });
        setLoading(false);
        console.log("Status selected ", statusOptionSelected);
        let tableDataToBeSet = apiData.data
          .filter((item) => {
            if (statusOptionSelected) {
              return item.status == statusOptionSelected;
            }
          })
          .map((item) => {
            return item;
          });
        setTableData(tableDataToBeSet);
        setTableTitle(apiData.title);
      }
      setModalOpen(false);
    }
    // message.success("Click on Yes");
  };

  const handleCommentClick = async (e) => {
    //console.log(JSON.parse(modalRecord.comments), commentText);
    //console.log(comments);
    console.log(commentText);
    setComments([
      {
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString().split(" ")[0],
        comment: commentText,
        name: name,
      },
      ...comments,
    ]);

    let commentsResponse = await postComment(
      modalRecord.id,
      comments,
      commentText,
      name
    );
    //console.log("Comments Response ", commentsResponse);
    // setComments([commentText, ...(JSON.parse(modalRecord?.comments)[0] || [])]);
    setCommentText("");
    // //console.log("Comments ", comments.length);
  };
  const handleOpenBulkCommentModal = () => {
    setOpenBulkCommentModal(true);
  };
  const handleBulkCloseCommentChange = (e) => {
    setBulkCloseCommentText(e.target.value);
  };
  const handleBulkCloseCommentClick = async (e) => {
    //console.log(
    //"Bulk Close Comment Parameters ", name, rowsDocuments, bulkCloseCommentText;
    //);
    // //console.log(JSON.parse(modalRecord.comments), commentText);
    // //console.log(comments);
    // setComments([
    // 	{
    // 		date: new Date().toDateString(),
    // 		time: new Date().toLocaleTimeString().split(" ")[0],
    // 		comment: commentText,
    // 		name: name,
    // 	},
    // 	...comments,
    // ]);

    let commentsResponse = await postCommentForBulkStatusClose(
      rowsDocuments,
      bulkCloseCommentText,
      name
    );
    //console.log("Comments Response ", commentsResponse.data);
    setBulkCloseCommentText("");
    setBulkStatusCommentsResponse(commentsResponse.data);
    openNotification(commentsResponse.data);
    // // setComments([commentText, ...(JSON.parse(modalRecord?.comments)[0] || [])]);
    // setCommentText("");
    // // //console.log("Comments ", comments.length);
  };

  const getBarGraphClickData = async () => {
    let apiData = await BarGraphClickForUsersAssigned({
      startingDateValue: state.dates.startDate,
      startingTimeValue: state.dates.startTime,
      endingDateValue: state.dates.endDate,
      endingTimeValue: state.dates.endTime,
      usersAssigned: state.usersAssigned,
    });
    setLoading(false);
    // setTableData(apiData.data);
    if (status == "Total") {
      setTableData(apiData.data);
      setTableTitle(apiData.title);
    } else {
      let tableDataToBeSet = apiData.data
        .filter((item) => {
          return item.status == status;
        })
        .map((item) => {
          return item;
        });
      setTableData(tableDataToBeSet);
      setTableTitle(apiData.title);
    }
  };

  const getBarGraphClickDataFor24hrs = async () => {
    console.log(
      "Users Assigned In Bar Graph click ",
      state.usersAssigned,
      status
    );
    let apiData = await BarClickListFor24hrsForUserAssigned(
      state.usersAssigned
    );
    setLoading(false);
    //setTableData(apiData.data);
    if (status == "Total") {
      setTableData(apiData.data);
      setTableTitle(apiData.title);
    } else {
      let tableDataToBeSet = apiData?.data
        .filter((item) => {
          return item.status == status;
        })
        .map((item) => {
          return item;
        });
      setTableData(tableDataToBeSet);
      setTableTitle(apiData.title);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Dates");
    localStorage.clear();
    Cookies.remove("name");
    navigate("/");
  };
  const getStatusFilterData = async () => {
    let statusList = await FilterForStatus();
    setStatusOptions(statusList?.data);
  };
  useEffect(() => {
    getStatusFilterData();
  }, []);
  useEffect(() => {
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    let { data } = decoded;
    decryptRequest(data).then((res) => {
      // console.log(JSON.parse(res));
      let { name, email } = JSON.parse(res);
      setName(name);
      setEmail(email);
    });
    if (state.isApiCall) {
      getBarGraphClickData();
    } else {
      getBarGraphClickDataFor24hrs();
    }
  }, [state.isApiCall, statusOptionSelected]);
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
            Alert
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
          <Button
            type="primary"
            style={{ backgroundColor: "#2292A4" }}
            onClick={function () {
              handleOpenVideo();
              setVideo(record.video);
            }}
          >
            video
          </Button>
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
    // 	title: (
    // 		<>
    // 			<IconButton sx={{ p: 1 }}>
    // 				<img
    // 					src={STATUSICON}
    // 					style={{ width: "5vh", height: "5vh" }}
    // 					alt="LOGO"
    // 				/>
    // 			</IconButton>

    // 			<span
    // 				style={{
    // 					color: "slategray",
    // 					fontSize: "large",
    // 					fontFamily: "Calibri",
    // 					fontWeight: "normal",
    // 				}}
    // 			>
    // 				Status
    // 			</span>
    // 		</>
    // 	),
    // 	dataIndex: "",
    // 	key: "status",
    // 	render: (value, record, index) => (
    // 		<span
    // 			type="primary"
    // 			style={{
    // 				backgroundColor:
    // 					record.status == "Open" || record.status == null || record.status == ""
    // 						? "#BA5D4F"
    // 						: "#519872",
    // 				height: "4vh",
    // 				width: "10vh",
    // 				padding: "2vh",
    // 				borderRadius: "5px",
    // 				color: "white",
    // 			}}
    // 			onClick={async () => {
    // 				setModalOpen(true);
    // 				setModalRecord(record);
    // 				let commentsList = await commentList(record.id);
    // 				if (JSON.parse(record?.comments)?.length > 0) {
    // 					setComments(JSON.parse(commentsList.data[0].comments));
    // 					setStatusValue(record.status);
    // 				} else {
    // 					setComments([]);
    // 				}
    // 			}}
    // 		>
    // 			{record.status == "Open" ||
    // 			record.status == null ||
    // 			record.status == "" ? (
    // 				// <img src={OPENICON} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
    // 				<span>OPEN</span>
    // 			) : (
    // 				<span>CLOSE</span>
    // 				// <img
    // 				// 	src={CLOSEDICON}
    // 				// 	style={{ width: "5vh", height: "5vh" }}
    // 				// 	alt="LOGO"
    // 				// />
    // 			)}
    // 		</span>
    // 	),
    // 	align: "left",
    // },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={STATUSICON}
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
            Status
          </span>
        </>
      ),
      dataIndex: "",
      key: "status",
      render: (value, record, index) => (
        <Button
          type="primary"
          style={{
            backgroundColor:
              record.status == "Open" ||
              record.status == null ||
              record.status == ""
                ? "#BA5D4F"
                : "#519872",
            height: "auto",
          }}
          onClick={async () => {
            setModalOpen(true);
            setModalRecord(record);
            console.log("Status ", record);

            let commentsList = await commentList(record.id);
            console.log("Comments List ", commentsList);
            setComments(
              JSON.parse(commentsList?.data[0]?.comments)
                ? JSON.parse(commentsList?.data[0]?.comments)
                : []
            );
            setStatusValue(record.status);
          }}
        >
          {record.status == "Open" ||
          record.status == null ||
          record.status == "" ? (
            // <img src={OPENICON} style={{ width: "5vh", height: "4vh" }} alt="LOGO" />
            <span>OPEN</span>
          ) : (
            <span>CLOSE</span>
            // <img
            // 	src={CLOSEDICON}
            // 	style={{ width: "5vh", height: "5vh" }}
            // 	alt="LOGO"
            // />
          )}
        </Button>
      ),
      align: "left",
    },
  ];
  const handleBack = (path) => {
    localStorage.setItem("path", path);
    navigate("/home");
  };
  const handleNavigate = (path) => {
    localStorage.setItem("path", path);
    navigate(path);
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
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin />
          <span className="mx-3" style={{ color: "slategray" }}>
            Loading please wait...
          </span>
        </div>
      ) : (
        <>
          <div
            className="mx-3 my-3"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <span
              style={{
                backgroundColor: "#2292A4",
                padding: "2vh",
                borderRadius: "5px",
                color: "white",
              }}
            >{`Total Alerts  ${tableData.length}`}</span>
            <span
              style={{
                width: "80vw",
                textAlign: "center",
                fontSize: "x-large",
                color: "slategray",
              }}
            >
              {tableTitle ? tableTitle : ""}
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

          <div className="mx-3">
            {/* <div>
							<FormControl style={{ width: "10vw" }}>
								<InputLabel id="demo-simple-select-label">Status</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={statusOptionSelected}
									label="Status"
									onChange={handleStatusChange}
								>
									{statusOptions.map((item) => {
										return <MenuItem value={item.label}>{item.label}</MenuItem>;
									})}
								</Select>
							</FormControl>
						</div> */}
            <div style={{ paddingTop: "1vh", paddingBottom: "1vh" }}>
              <Popconfirm
                title="Close the status"
                description="Are you sure to close the status of selected records?"
                onConfirm={handleOpenBulkCommentModal}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{
                    display: showBulkCloseButton ? "block" : "none",
                    backgroundColor: "#4B88A2",
                  }}
                  type="primary"
                  // onClick={() => handleStatusClose(modalRecord)}
                >
                  Close All
                </Button>
              </Popconfirm>
            </div>
            <Table
              rowKey={(record) => record.id}
              // rowSelection={rowSelection}
              rowSelection={{
                selectedRowKeys: selectedRowsKeys,
                onChange: (keys, selectedRowKeys, selectedRows) => {
                  console.log("Selected rows ", selectedRowKeys);
                  setRowsValues(selectedRowKeys);
                  setSelectedRowKeys(keys);
                  setRowsDocuments(keys);
                  setShowBulkCloseButton(true);
                  if (selectedRowKeys.length <= 0) {
                    setShowBulkCloseButton(false);
                  }
                },
              }}
              columns={columns}
              dataSource={tableData}
              onChange={onChange}
            />
          </div>
        </>
      )}
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
      <Modal
        open={openVideoModal}
        centered
        onClose={handleCloseVideo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onOk={handleCloseVideo}
        onCancel={handleCloseVideo}
        cancelButtonProps={true}
        // footer={() => (
        // 	<>
        // 		<Button>Custom Button</Button>
        // 		{/* <CancelBtn />
        // 		<OkBtn /> */}
        // 	</>
        // )}
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Video
          </Typography>
          {video ? (
            <>
              <Magnifier src={video} mgShape="square" alt="_blank" />
              <a href={video}>
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
      <Modal
        title="Alert Status"
        style={{
          top: 20,
        }}
        centered
        open={modalOpen}
        onOk={async () => {
          setModalOpen(false);
          // handleButtonClick();
          //console.log("ok cliked");
          // let startingDateValue = await convertDate(startDate);
          // let endingDateValue = await convertDate(endDate);
          // let startingTimeValue = await convertTime(startTime);
          // let endingTimeValue = await convertTime(endTime);
          // let alertSelected = optionSelected;
          // let cameraSelected = cameraOptionSelected;
          // let zoneSelected = zoneOptionSelected;
          // let usersSelected = usersAssignedOptionSelected;
          // if (alertSelected == null && cameraSelected == null) {
          // 	let updatedTableData = await get24hrsAlertsList();
          // 	// //console.log("UpdatedTableData", updatedTableData);
          // 	setDataSource(updatedTableData.data);
          // } else {
          // 	let updatedTableData = await getAlertsList({
          // 		startingDateValue,
          // 		startingTimeValue,
          // 		endingDateValue,
          // 		endingTimeValue,
          // 		cameraSelected,
          // 		alertSelected,
          // 		zoneSelected,
          // 		usersSelected,
          // 	});
          // 	// //console.log("UpdatedTableData", updatedTableData);
          // 	setDataSource(updatedTableData.data);
          // }
        }}
        onCancel={async () => {
          setModalOpen(false);
          // handleButtonClick();
          //console.log("ok cliked");
          // let startingDateValue = await convertDate(startDate);
          // let endingDateValue = await convertDate(endDate);
          // let startingTimeValue = await convertTime(startTime);
          // let endingTimeValue = await convertTime(endTime);
          // let alertSelected = optionSelected;
          // let cameraSelected = cameraOptionSelected;
          // let zoneSelected = zoneOptionSelected;
          // let usersSelected = usersAssignedOptionSelected;
          // if (alertSelected == null && cameraSelected == null) {
          // 	let updatedTableData = await get24hrsAlertsList();
          // 	// //console.log("UpdatedTableData", updatedTableData);
          // 	setDataSource(updatedTableData.data);
          // } else {
          // 	let updatedTableData = await getAlertsList({
          // 		startingDateValue,
          // 		startingTimeValue,
          // 		endingDateValue,
          // 		endingTimeValue,
          // 		cameraSelected,
          // 		alertSelected,
          // 		zoneSelected,
          // 		usersSelected,
          // 	});
          // 	// //console.log("UpdatedTableData", updatedTableData);
          // 	setDataSource(updatedTableData.data);
          // }
        }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ maxWidth: 1000 }}
        >
          <Form.Item>
            <div style={{ display: "flex" }}>
              <Tooltip title="Assigned To" placement="left-start">
                <img
                  src={PERSONICON}
                  style={{ width: "auto", height: "5vh", marginRight: "3vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <input
                type="text"
                value={
                  modalRecord?.usersAssigned
                    ? modalRecord.usersAssigned
                    : "UnAssigned"
                }
                disabled
                style={{
                  border: "1px solid skyblue",
                  borderRadius: "3px",
                  width: "100%",
                  padding: "1vh",
                }}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", gap: "2vh" }}>
              <Tooltip title="Date" placement="left-start">
                <img
                  src={DATEICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <input
                type="date"
                value={modalRecord?.date}
                disabled
                style={{
                  border: "1px solid skyblue",
                  borderRadius: "3px",
                  width: "14vw",
                  padding: "1vh",
                }}
              />
              <Tooltip title="Time" placement="left-start">
                <img
                  src={CLOCKICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <input
                type="time"
                value={modalRecord?.time}
                disabled
                style={{
                  border: "1px solid skyblue",
                  borderRadius: "3px",
                  width: "14vw",
                  padding: "1vh",
                }}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", gap: "1.5vh" }}>
              <Tooltip title="Alert" placement="left-start">
                <img
                  src={ALERTICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <input
                type="text"
                value={modalRecord?.alert}
                disabled
                style={{
                  border: "1px solid skyblue",
                  borderRadius: "3px",
                  width: "100vw",
                  padding: "1vh",
                }}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", gap: "2vh" }}>
              <Tooltip title="Camera" placement="left-start">
                <img
                  src={CAMERAICON}
                  style={{ width: "5vh", height: "5vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <input
                type="text"
                value={modalRecord?.camera}
                disabled
                style={{
                  border: "1px solid skyblue",
                  borderRadius: "3px",
                  width: "100vw",
                  padding: "1vh",
                }}
              />
            </div>
          </Form.Item>
          {modalRecord?.tat ? (
            <div style={{ display: "flex", gap: "2vh" }}>
              <Tooltip title="TAT" placement="left-start">
                <img
                  src={TATICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1vh",
                  }}
                >
                  <span
                    style={{
                      border: "1px solid skyblue",
                      borderRadius: "2px",
                      padding: "1vh",
                      height: "auto",
                    }}
                  >
                    Vehicle Turn Around Time : - {modalRecord?.tat}
                  </span>
                  <span
                    style={{
                      border: "1px solid skyblue",
                      borderRadius: "2px",
                      padding: "1vh",
                      height: "auto",
                    }}
                  >
                    Vehicle Turn Around Start Time : -{" "}
                    {modalRecord?.tatstarttime ? modalRecord?.tatstarttime : ""}
                  </span>
                  <span
                    style={{
                      border: "1px solid skyblue",
                      borderRadius: "2px",
                      padding: "1vh",
                      height: "auto",
                    }}
                  >
                    Vehicle Turn Around End Time : -{" "}
                    {modalRecord?.tatendtime ? modalRecord?.tatendtime : ""}
                  </span>
                </div>
              </Form.Item>
            </div>
          ) : (
            ""
          )}
          <Form.Item>
            <div style={{ display: "flex", alignItems: "center", gap: "2vh" }}>
              <Tooltip title="Comment Input" placement="left-start">
                <img
                  src={TYPEICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <TextArea
                disabled={
                  modalRecord?.status == "Close" ||
                  modalRecord?.status == "Closed"
                    ? true
                    : false
                }
                rows={4}
                style={{ border: "1px solid skyblue" }}
                placeholder="Enter Your Comments"
                onChange={handleCommentChange}
                value={commentText}
              />
              <Button
                type="primary"
                onClick={handleCommentClick}
                disabled={
                  modalRecord?.status == "Close" ||
                  modalRecord?.status == "Closed"
                    ? true
                    : false
                }
              >
                Comment
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", gap: "2vh" }}>
              <Tooltip title="Status" placement="left-start">
                <img
                  src={STATUSICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>
              <Space wrap>
                <input
                  disabled={
                    modalRecord?.status == "Close" ||
                    modalRecord?.status == "Closed"
                      ? true
                      : false
                  }
                  style={{
                    border: "1px solid skyblue",
                    borderRadius: "3px",
                    width: "14vw",
                    padding: "1vh",
                    color: "slategrey",
                  }}
                  value={
                    modalRecord?.status == "Open" ||
                    modalRecord?.status == null ||
                    modalRecord?.status == ""
                      ? statusValue
                      : "Close"
                  }
                />
                {modalRecord?.status == "Open" ||
                modalRecord?.status == null ||
                modalRecord?.status == "" ? (
                  <>
                    {/* <Button type="primary" onClick={() => handleStatusClose(modalRecord)}>
											Close
										</Button> */}
                    <Popconfirm
                      title="Close the status"
                      description="Are you sure to close this status?"
                      onConfirm={() => confirm(modalRecord)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        // onClick={() => handleStatusClose(modalRecord)}
                      >
                        Close
                      </Button>
                    </Popconfirm>
                  </>
                ) : (
                  <div></div>
                )}
              </Space>
            </div>
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: modalRecord?.status == "Open" ? "none" : "flex",
                marginLeft: "8vh",
                alignItems: "flex-start",
                gap: "2vh",
                flexDirection: "column",
              }}
            >
              {modalRecord?.statusclosedby ? (
                <span>Closed By : {modalRecord?.statusclosedby}</span>
              ) : (
                ""
              )}
              {modalRecord?.statuscloseon ? (
                <span>Closing Date :- {modalRecord?.statuscloseon}</span>
              ) : (
                ""
              )}
              {modalRecord?.bulkclosecomment ? (
                <span>
                  Bulk Close Comment : {modalRecord?.bulkclosecomment}
                </span>
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <Form.Item
            // label="User List"
            shouldUpdate={(prevValues, curValues) => prevValues !== curValues}
          >
            {comments?.length > 0 ? (
              <>
                <span style={{ color: "slategrey" }}>Comments List</span>
                <ul>
                  {comments?.map((item) => {
                    return (
                      <li
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid skyblue",
                          borderRadius: "3px",
                          width: "auto",
                          padding: "1vh",
                          marginBottom: "1vh",
                        }}
                      >
                        <span>{item.comment}</span>
                        <span style={{ color: "slategrey" }}>
                          {new Date(item.date).toDateString()} {item.time}
                        </span>
                        <span style={{ color: "slategrey" }}>
                          Commented By {item?.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <div>
                <Typography>
                  {modalRecord?.bulkclosecomment ? (
                    ""
                  ) : (
                    <>
                      <SmileOutlined /> No Comments yet.
                    </>
                  )}
                </Typography>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Bulk Comment"
        style={{
          top: 20,
        }}
        centered
        open={openBulkCommentModal}
        onOk={async () => {
          console.log("Rows Document", bulkCloseCommentText);
          setOpenBulkCommentModal(false);
          let startingDateValue = dates.startDate;
          let endingDateValue = dates.endDate;
          let startingTimeValue = dates.startTime;
          let endingTimeValue = dates.endTime;
          let alertSelected = rowsValues.map((item) => {
            return item.alert;
          });
          let cameraSelected = rowsValues.map((item) => {
            return item.camera;
          });
          let zoneSelected = rowsValues.map((item) => {
            return item.zone;
          });
          let usersSelected = state.usersAssigned;

          if (state.isApiCall == false) {
            let apiData = await BarClickListFor24hrsForUserAssigned(
              state.usersAssigned
            );
            setLoading(false);
            //setTableData(apiData.data);
            let tableDataToBeSet = apiData.data
              .filter((item) => {
                if (statusOptionSelected) {
                  return item.status == statusOptionSelected;
                }
              })
              .map((item) => {
                return item;
              });
            setTableData(tableDataToBeSet);
            setTableTitle(apiData.title);
            // let updatedTableData = await get24hrsAlertsList();
            // // //console.log("UpdatedTableData", updatedTableData);
            // setTableData(updatedTableData.data);
          } else {
            let updatedTableData = await getAlertsList({
              startingDateValue,
              startingTimeValue,
              endingDateValue,
              endingTimeValue,
              cameraSelected,
              alertSelected,
              zoneSelected,
              usersSelected,
            });
            setTableData(updatedTableData.data);
          }
          setSelectedRowKeys([]);
          setShowBulkCloseButton(false);
        }}
        onCancel={async () => {
          setOpenBulkCommentModal(false);
          let startingDateValue = dates.startDate;
          let endingDateValue = dates.endDate;
          let startingTimeValue = dates.startTime;
          let endingTimeValue = dates.endTime;
          let alertSelected = rowsValues.map((item) => {
            return item.alert;
          });
          let cameraSelected = rowsValues.map((item) => {
            return item.camera;
          });
          let zoneSelected = rowsValues.map((item) => {
            return item.zone;
          });
          let usersSelected = state.usersAssigned;

          if (state.isApiCall == false) {
            let apiData = await BarClickListFor24hrsForUserAssigned(
              state.usersAssigned
            );
            setLoading(false);
            //setTableData(apiData.data);
            let tableDataToBeSet = apiData.data
              .filter((item) => {
                if (statusOptionSelected) {
                  return item.status == statusOptionSelected;
                }
              })
              .map((item) => {
                return item;
              });
            setTableData(tableDataToBeSet);
            setTableTitle(apiData.title);

            // let updatedTableData = await get24hrsAlertsList();
            // setTableData(updatedTableData.data);
          } else {
            let updatedTableData = await getAlertsList({
              startingDateValue,
              startingTimeValue,
              endingDateValue,
              endingTimeValue,
              cameraSelected,
              alertSelected,
              zoneSelected,
              usersSelected,
            });
            setTableData(updatedTableData.data);
          }
          setSelectedRowKeys([]);
          setShowBulkCloseButton(false);
        }}
      >
        {modalRecord?.status == "Close" || modalRecord?.status == "Closed" ? (
          <span style={{ color: "slategray" }}>Comment Below Is Closed</span>
        ) : (
          ""
        )}
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ maxWidth: 1000 }}
        >
          <Form.Item>
            <div style={{ display: "flex", alignItems: "center", gap: "2vh" }}>
              <Tooltip title="Comment Input" placement="left-start">
                <img
                  src={TYPEICON}
                  style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                  alt="LOGO"
                />
              </Tooltip>

              <TextArea
                disabled={
                  modalRecord?.status == "Close" ||
                  modalRecord?.status == "Closed"
                    ? true
                    : false
                }
                rows={4}
                style={{ border: "1px solid skyblue" }}
                placeholder="Enter Your Comments"
                onChange={handleBulkCloseCommentChange}
                value={bulkCloseCommentText}
              />
              <Button
                type="primary"
                onClick={handleBulkCloseCommentClick}
                disabled={
                  modalRecord?.status == "Close" ||
                  modalRecord?.status == "Closed"
                    ? true
                    : false
                }
              >
                Comment
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default BarClickTableForUsersAssigned;
