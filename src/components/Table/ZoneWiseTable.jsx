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
	Popconfirm,
	Input,
	Space,
} from "antd";
import convertDate from "../../utils/convertDates";
import convertTime from "../../utils/convertTimes";
import Magnifier from "react-magnifier";
import { SmileOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CAMERAICON from "../../Assets/camera.png";
import ALERTICON from "../../Assets/alert.png";
import STATUSICON from "../../Assets/clipboard.png";
import IMAGEICON from "../../Assets/picture.png";
import OPENICON from "../../Assets/open.png";
import CLOSEDICON from "../../Assets/closed.png";
import DATEICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import TYPEICON from "../../Assets/typing.png";
import EXPORTICON from "../../Assets/file.png";
import SEARCHICON from "../../Assets/data-analysis.png";
import PERSONICON from "../../Assets/man.png";
import NOTFOUNDICON from "../../Assets/not-found.png";
import ZONEICON from "../../Assets/zone.png";
import HOUSE from "../../Assets/house.png";
import ALERT from "../../Assets/alert.png";
import TEAM from "../../Assets/group.png";
import SUPPORT from "../../Assets/help-desk.png";
import DOWNLOADICON from "../../Assets/download.png";
import TATICON from "../../Assets/delivery.png";
import ALLICON from "../../Assets/warning.png";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SWITCHOFF from "../../Assets/powernew.png";
import jwt_decode from "jwt-decode";
import LOGO from "../../Assets/parekh.jpeg";

import { decryptRequest } from "../../utils/crypt";

import {
  getAlertsList,
  getAlertsListZoneWise,
  postComment,
  commentList,
  closeStatus,
  bulkCloseStatus,
  postCommentForBulkStatusClose,
} from "../../services/AlertsTable";
//For Last 24hrs
import {
  BarClickListFor24hrs,
  get24hrsAlertsList,
} from "../../services/Last24hrs";
//For Filters
import { BarGraphClick } from "../../services/Graph";
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

function ZoneWiseTable(props) {
  const { item, dates, call } = props;
  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState("");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);
  const [opendrawer, setOpenDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRecord, setModalRecord] = useState();
  const [comments, setComments] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [Image, setImage] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [openVideoModal, setOpenVideoModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
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

  const [rowsForBulkClose, setRowsForBulkClose] = useState([]);

  const handleOpenImageModal = () => setImageModalOpen(true);
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  const handleOpenVideo = () => setOpenVideoModal(true);
  const handleCloseVideo = () => setOpenVideoModal(false);
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
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
  const getBarGraphClickData = async () => {
    let apiData = await BarGraphClick({
      startingDateValue: dates.startDate,
      startingTimeValue: dates.startTime,
      endingDateValue: dates.endDate,
      endingTimeValue: dates.endTime,
      zone: item,
    });
    setLoading(false);
    setTableData(apiData.data);
    setTableTitle(apiData.title);
  };

  const getBarGraphClickDataFor24hrs = async () => {
    let apiData = await BarClickListFor24hrs(item);
    setLoading(false);
    setTableData(apiData.data);
    setTableTitle(apiData.title);
  };

  const handleLogout = () => {
    localStorage.removeItem("Dates");
    localStorage.clear();
    Cookies.remove("name");
    navigate("/");
  };
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
    if (call) {
      getBarGraphClickData();
    } else {
      getBarGraphClickDataFor24hrs();
    }
  }, [call]);
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
    },

    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={ALERTICON}
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
    },
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
            let commentsList = await commentList(record.id);
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
            <span>OPEN</span>
          ) : (
            <span>CLOSE</span>
          )}
        </Button>
      ),
      align: "left",
    },
  ];
  const handleBack = () => {
    navigate("/home");
  };
  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleStatusClose = async (dataRecordOfStatus) => {
    //console.log("DATA RECORD OF STATUS ", dataRecordOfStatus.id);
    let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
    //console.log("data of closed ", dataofclosed);
    setStatusValue("Close");

    let startingDateValue = dates.startDate;
    let endingDateValue = dates.endDate;
    let startingTimeValue = dates.startTime;
    let endingTimeValue = dates.endTime;
    let alertSelected = dataRecordOfStatus.alert;
    let cameraSelected = dataRecordOfStatus.camera;
    let zoneSelected = item;
    let usersSelected = dataRecordOfStatus.usersAssigned;
    if (call == false) {
      let updatedTableData = await get24hrsAlertsList();
      // //console.log("UpdatedTableData", updatedTableData);
      setTableData(updatedTableData.data);
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
      // //console.log("UpdatedTableData", updatedTableData);
      setTableData(updatedTableData.data);
    }
    setModalOpen(false);
  };
  const confirm = async (dataRecordOfStatus) => {
    let { usersAssigned } = dataRecordOfStatus;
    if (comments.length == 0) {
      openNotification("Status Cannot be closed without comments.");
    } else if (usersAssigned != name) {
      openNotification("You cannot close this status.[NOT ASSIGNED]")
      return;
    } else {
      let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
      setStatusValue("Close");
      let startingDateValue = dates.startDate;
      let endingDateValue = dates.endDate;
      let startingTimeValue = dates.startTime;
      let endingTimeValue = dates.endTime;
      let alertSelected = dataRecordOfStatus.alert;
      let cameraSelected = dataRecordOfStatus.camera;
      let zoneSelected = item;
      let usersSelected = dataRecordOfStatus.usersAssigned;
      if (call == false) {
        await getBarGraphClickDataFor24hrs();
      } else {
        await getBarGraphClickData();
      }
      setModalOpen(false);
    }
  };
  const cancel = (e) => {
    setOpenBulkCommentModal(false);
  };
  const handleOpenBulkCommentModal = (records) => {
    let alreadyClosedRecords = records.filter((item) => {
      if (item.status == "Close") {
        return item;
      }
    });
    if (alreadyClosedRecords.length > 0) {
      openNotification("Select Only Open Records");
    } else {
      setOpenBulkCommentModal(true);
    }
  };
  const handleBulkCloseCommentChange = (e) => {
    setBulkCloseCommentText(e.target.value);
  };
  const handleBulkCloseCommentClick = async (e) => {
    console.log("I am Here ");
    let commentsResponse = await postCommentForBulkStatusClose(
      rowsDocuments,
      bulkCloseCommentText,
      name
    );
    setBulkCloseCommentText("");
    console.log("Comments Response ", commentsResponse.data);
    setBulkStatusCommentsResponse(commentsResponse.data);
    openNotification(commentsResponse.data);
  };
  return (
    <>
      <div className="mx-3">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Popconfirm
                title="Close the status"
                description="Are you sure to close the status of selected records?"
                onConfirm={() => handleOpenBulkCommentModal(rowsForBulkClose)}
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
                >
                  Close All
                </Button>
              </Popconfirm>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span
                style={{
                  backgroundColor: "#2292A4",
                  padding: "1vh",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                <img
                  src={ALLICON}
                  style={{ width: "5vh", height: "5vh" }}
                  alt="LOGO"
                />
                Total Zone Alerts {tableData?.length}
              </span>
            </div>
            <Table
              rowKey={(record) => record.id}
              rowSelection={{
                selectedRowKeys: selectedRowsKeys,
                onChange: (keys, selectedRowKeys, selectedRows) => {
                  console.log(
                    "Table Rows Selected is ----> ",
                    keys,
                    selectedRowKeys,
                    selectedRows
                  );
                  setRowsValues(selectedRowKeys);
                  setSelectedRowKeys(keys);
                  setRowsDocuments(keys);
                  setRowsForBulkClose(selectedRowKeys);
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
          </>
        )}
      </div>
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
                    <Popconfirm
                      title="Close the status"
                      description="Are you sure to close this status?"
                      onConfirm={() => confirm(modalRecord)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary">Close</Button>
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
                <>
                  <span>Closing Date :- {modalRecord?.statuscloseon}</span>
                  <span>
                    Closing time difference :-{" "}
                    {modalRecord?.alertClosureDiffTime}
                  </span>
                </>
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
        title="Bulk Comment"
        style={{
          top: 20,
        }}
        centered
        open={openBulkCommentModal}
        onOk={async () => {
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
          let usersSelected = rowsValues.map((item) => {
            return item.usersAssigned;
          });

          if (call == false) {
            await getBarGraphClickDataFor24hrs();
          } else {
            await getBarGraphClickData();
          }
          setSelectedRowKeys([]);
          setShowBulkCloseButton(false);
        }}
        onCancel={() => {
          setOpenBulkCommentModal(false);
        }}
      >
        {rowsForBulkClose[0]?.status === "Close" ? (
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
                disabled={rowsForBulkClose[0]?.status == "Close" ? true : false}
                rows={4}
                style={{ border: "1px solid skyblue" }}
                placeholder="Enter Your Comments"
                onChange={handleBulkCloseCommentChange}
                value={bulkCloseCommentText}
              />
              <Button
                type="primary"
                onClick={handleBulkCloseCommentClick}
                disabled={rowsForBulkClose[0]?.status == "Close" ? true : false}
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

export default ZoneWiseTable;
