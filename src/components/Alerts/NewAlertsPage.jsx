import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SWITCHOFF from "../../Assets/powernew.png";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { deDE } from "@mui/x-date-pickers/locales";
import FormControl from "@mui/material/FormControl";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import LOGO from "../../Assets/parekh.jpeg";
import SideBar from "../Dashboard/SideBar";
// import Table from "./AlertsTable";
import "./index.css";
import convertDate from "../../utils/convertDates";
import convertTime from "../../utils/convertTimes";
import {
  getAlertsList,
  getAlertsListDateWise,
  postComment,
  commentList,
  closeStatus,
  bulkCloseStatus,
  postCommentForBulkStatusClose,
  editVisibility,
} from "../../services/AlertsTable";
import {
  FilterForAlert,
  FilterForCamera,
  FilterForZones,
  FilterForUsersAssigned,
  FilterForStatus,
} from "../../services/Filters";
import { LogActivity } from "../../services/Login";
import ReactSelect from "../MultiSelect/MySelect";
import { decryptRequest } from "../../utils/crypt";

//For Last 24hrs
import { get24hrsAlertsList } from "../../services/Last24hrs";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  Spin,
  Radio,
} from "antd";
import Magnifier from "react-magnifier";
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
import VISIBILITYICON from "../../Assets/visibility.png";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CommonButton from "../../common/commonbutton/CommonButton";
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

const alertoptions = [
  { value: "Intrusion detected", label: "Intrusion detected" },
  {
    value: "office area time restriction",
    label: "office area time restriction",
  },
  { value: "crowd detected", label: "crowd detected" },
  { value: "entry", label: "entry" },
  { value: "exit", label: "exit" },
  { value: "person without helmet", label: "ppe" },
  {
    value: "emergency Exit Bay Interruption",
    label: "emergency Exit Bay Interruption",
  },
  {
    value: "fireextinguishernotavailable",
    label: "fire extinguisher not available",
  },
  { value: "two wheeler detected", label: "two wheeler detected" },
  { value: "person carrying boxes", label: "person carrying boxes" },
  { value: "material laying outside", label: "material laying outside" },
  { value: "Intrusion detected", label: "Intrusion detected" },
  { value: "dooropen", label: "door open" },
  { value: "doorclosed", label: "door closed" },
  { value: "tat", label: "tat" },
  { value: "novehicleatdock", label: "no vehicle at dock" },
];

const cameraoptions = [
  { value: "Pharma main gate entry", label: "Pharma main gate entry" },
  {
    value: "Periphery Pharma Bike Parking 2",
    label: "Periphery Pharma Bike Parking 2",
  },
  { value: "Pharma Transport Room", label: "Pharma Transport Room" },
  { value: "Pharma WH Employee Entry", label: "Pharma WH Employee Entry" },
  { value: "Pharma WH B Front Side", label: "Pharma WH B Front Side" },
  { value: "Pharma WH Entry Passage", label: "Pharma WH Entry Passage" },
  { value: "Pharma Staging Area 4", label: "Pharma Staging Area 4" },
  { value: "Doc No 2", label: "Doc No 2" },
  { value: "Pharma WH Front Middle", label: "Pharma WH Front Middle" },
  { value: "Pharma Centre Walkway", label: "Pharma Centre Walkway" },
];

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const pages = [""];
const settings = ["Logout"];

function NewAlertsPage() {
  const navigate = useNavigate();
  const [openBulkCommentModal, setOpenBulkCommentModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [startTime, setStartTime] = useState(new Date().setHours(0, 0, 0));
  const [endTime, setEndTime] = useState(new Date());
  const [apiResponseData, setApiResponseData] = React.useState([]);
  const [optionSelected, setoptionSelected] = useState(null);
  const [cameraOptionSelected, setcameraoptionSelected] = useState();
  const [zoneOptionSelected, setzoneoptionSelected] = useState(null);
  const [usersAssignedOptionSelected, setUsersAssignedOptionSelected] =
    useState(null);
  const [statusOptionSelected, setStatusOptionSelected] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mailForPdf, setMailForPdf] = useState("");
  const [accessValue, setAccessValue] = useState("");
  const [opendrawer, setOpenDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cameraoptions, setCameraOptions] = useState([]);
  const [alertoptions, setAlertOptions] = useState([]);
  const [zoneoptions, setZoneOptions] = useState([]);
  const [usersAssignedOptions, setUsersAssignedOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [apiCallFilterObject, setApiCallFilterObject] = useState({});

  const [showBulkCloseButton, setShowBulkCloseButton] = useState(false);
  const [selectedRowsKeys, setSelectedRowKeys] = useState([]);
  const [rowsDocuments, setRowsDocuments] = useState([]);
  const [rowsForBulkClose, setRowsForBulkClose] = useState([]);

  const [openVideoModal, setOpenVideoModal] = React.useState(false);
  const [Image, setImage] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenForPdf, setModalOpenForPdf] = useState(false);
  const [modalRecord, setModalRecord] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const [bulkStatusCommentsResponse, setBulkStatusCommentsResponse] = useState(
    []
  );

  const [handleGetDataClicked, setHandleGetDataClicked] = useState(0);

  const [bulkCloseCommentText, setBulkCloseCommentText] = useState("");

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [pageNavigationData, setPageNavigationData] = useState(false);

  const handleOpenVideo = () => setOpenVideoModal(true);
  const handleCloseVideo = () => setOpenVideoModal(false);
  const handleOpenImageModal = () => setImageModalOpen(true);
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
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
  const handleCloseBulkCommentModal = () => setOpenBulkCommentModal(false);

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

  const handleChange = (selected) => {
    setoptionSelected(selected);
  };

  const handleCameraChange = (selected) => {
    setcameraoptionSelected(selected);
  };
  const handleZoneChange = (selected) => {
    setzoneoptionSelected(selected);
  };
  const handlePersonChange = (selected) => {
    setUsersAssignedOptionSelected(selected);
  };
  const handleStatusChange = (selected) => {
    setStatusOptionSelected(selected);
  };
  const handleSideBar = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    navigate("/");
  };

  const getFiltersData = async () => {
    let camerasList = await FilterForCamera();
    let alertsList = await FilterForAlert();
    let zonesList = await FilterForZones();
    let userAssignedList = await FilterForUsersAssigned();
    let statusList = await FilterForStatus();
    if (camerasList?.data.length > 0) {
      setCameraOptions(camerasList.data);
    }
    if (alertsList?.data.length > 0) {
      let alertData = alertsList.data
        .filter((item) => {
          if (item.label !== "Entry" && item.label != "Exit") {
            return item;
          }
        })
        .map((item) => {
          return item;
        });

      setAlertOptions(alertData);
    }
    if (zonesList?.data.length > 0) {
      setZoneOptions(zonesList.data);
    }
    if (userAssignedList?.data.length > 0) {
      setUsersAssignedOptions(userAssignedList.data);
    }
    if (statusList?.data.length > 0) {
      setStatusOptions(statusList.data);
    }
  };
  const get24hrsAlerts = async () => {
    let alertfor24 = await get24hrsAlertsList();
    if (alertfor24 == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      localStorage.removeItem("Dates");
      localStorage.clear();
      Cookies.remove("name");
      navigate("/");
    } else if (alertfor24 !== "No Data Found.") {
      setLoading(false);
      setApiResponseData(alertfor24.data);
      let tableData = alertfor24.data
        .filter((item) => {
          if (
            item.visibility != "hide" &&
            item.alert != "Exit" &&
            item.alert != "Entry"
          ) {
            return item;
          }
        })
        .map((item) => {
          return item;
        });

      setDataSource(tableData);
    } else if (alertfor24 === "No Data Found.") {
      setLoading(false);
      openNotification("Token Expired,Login Again.");
      localStorage.removeItem("Dates");
      localStorage.clear();
      Cookies.remove("name");
      navigate("/");
      setApiResponseData([]);
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let path = localStorage.getItem("path");
    if (path == "/alerts") {
      setIsActive(true);
    }
    var decoded = jwt_decode(token);
    let { data } = decoded;
    decryptRequest(data).then((res) => {
      let { name, email, access } = JSON.parse(res);
      setName(name);
      setEmail(email);
      setMailForPdf(email);
      setAccessValue(access);
    });
    getFiltersData();
  }, []);
  const getDataThroughNavigationInput = async ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    let apiData = await getAlertsList({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      alertSelected: [],
      cameraSelected: [],
      zoneSelected: [],
      usersSelected: [],
      statusSelected: [],
    });
    if (apiData == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      localStorage.removeItem("Dates");
      localStorage.clear();
      Cookies.remove("name");
      navigate("/");
    } else if (apiData !== "No Data Found.") {
      setLoading(false);
      setApiResponseData(apiData.data);
      let tableData = apiData.data
        .filter((item) => {
          if (
            item.visibility != "hide" &&
            item.alert != "Exit" &&
            item.alert != "Entry"
          ) {
            return item;
          }
        })
        .map((item) => {
          return item;
        });
      setDataSource(tableData);
    } else if (apiData === "No Data Found.") {
      openNotification(apiData);
      setApiResponseData([]);
    }
  };
  useEffect(() => {
    let pageNavigationObjects = localStorage.getItem(
      "getDataClickedFromDashboard"
    );
    let datesObj = localStorage.getItem("Dates");
    let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
    if (pageNavigationObjects == "true") {
      let timeArray = startTime.split(":");
      let hr = new Number(timeArray[0]);
      let min = new Number(timeArray[1]);
      let sec = new Number(timeArray[2]);
      let timeArray1 = endTime.split(":");
      let hr1 = new Number(timeArray1[0]);
      let min1 = new Number(timeArray1[1]);
      let sec1 = new Number(timeArray1[2]);
      setStartDate(dayjs(startDate));
      setEndDate(dayjs(endDate));
      setStartTime(new Date().setHours(hr, min, sec));
      setEndTime(new Date().setHours(hr1, min1, sec1));
      getDataThroughNavigationInput({ startDate, endDate, startTime, endTime });
      setPageNavigationData(true);
    } else {
      setPageNavigationData(false);
      get24hrsAlerts();
    }
  }, []);

  const handleGetData = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    let { data } = decoded;
    let decryptedResponse = await decryptRequest(data);
    let { email } = JSON.parse(decryptedResponse);
    LogActivity({
      activity: [{ workDone: "Get Data button Clicked Of Alerts Page" }],
      type: "Get Data button Clicked",
      email: email,
    });

    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    let alertSelected = optionSelected;
    let cameraSelected = cameraOptionSelected;
    let zoneSelected = zoneOptionSelected;
    let usersSelected = usersAssignedOptionSelected;
    let statusSelected = statusOptionSelected;
    setApiCallFilterObject({
      startingDateValue,
      startingTimeValue,
      endingDateValue,
      endingTimeValue,
      alertSelected,
      cameraSelected,
      usersSelected,
      statusSelected,
    });
    let getData = 0;
    setHandleGetDataClicked(getData + 1);
    let apiData = await getAlertsList({
      startingDateValue,
      startingTimeValue,
      endingDateValue,
      endingTimeValue,
      alertSelected,
      cameraSelected,
      zoneSelected,
      usersSelected,
      statusSelected,
    });

    if (apiData == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      localStorage.removeItem("Dates");
      localStorage.clear();
      Cookies.remove("name");
      navigate("/");
    } else if (apiData !== "No Data Found.") {
      setLoading(false);
      setApiResponseData(apiData.data);
      let tableData = apiData.data
        .filter((item) => {
          if (
            item.visibility != "hide" &&
            item.alert != "Exit" &&
            item.alert != "Entry"
          ) {
            return item;
          }
        })
        .map((item) => {
          return item;
        });
      setDataSource(tableData);
    } else if (apiData === "No Data Found.") {
      setLoading(false);
      openNotification(apiData);
      setApiResponseData([]);
    }
  };

  const handleGetDataDateWise = async () => {
    setLoading(true);
    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let alertSelected = optionSelected;
    let cameraSelected = cameraOptionSelected;
    let zoneSelected = zoneOptionSelected;
    let usersSelected = usersAssignedOptionSelected;
    let statusSelected = statusOptionSelected;
    setApiCallFilterObject({
      startingDateValue,
      endingDateValue,
      alertSelected,
      cameraSelected,
      usersSelected,
      statusSelected,
    });
    let getData = 0;
    setHandleGetDataClicked(getData + 1);
    let apiData = await getAlertsListDateWise({
      startingDateValue,
      endingDateValue,
      alertSelected,
      cameraSelected,
      zoneSelected,
      usersSelected,
      statusSelected,
    });
    if (apiData == "Network Error") {
      setLoading(false);
      openNotification("Network Error");
      setApiResponseData([]);
    } else if (apiData == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      localStorage.removeItem("Dates");
      localStorage.clear();
      Cookies.remove("name");
      navigate("/");
    } else if (apiData !== "No Data Found.") {
      setLoading(false);
      setApiResponseData(apiData.data);
      let tableData = apiData.data
        .filter((item) => {
          if (
            item.visibility != "hide" &&
            item.alert != "Exit" &&
            item.alert != "Entry"
          ) {
            return item;
          }
        })
        .map((item) => {
          return item;
        });
      setDataSource(tableData);
    } else if (apiData === "No Data Found.") {
      setLoading(false);
      openNotification(apiData);
      setApiResponseData([]);
    }
  };

  const sendPostBodyForGeneratePdf = async () => {
    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    let alertSelected = optionSelected?.length > 0 ? optionSelected : [];
    let cameraSelected =
      cameraOptionSelected?.length > 0 ? cameraOptionSelected : [];
    let zoneSelected = zoneOptionSelected?.length > 0 ? zoneOptionSelected : [];
    let usersSelected =
      usersAssignedOptionSelected?.length > 0
        ? usersAssignedOptionSelected
        : [];
    let statusSelected =
      statusOptionSelected?.length > 0 ? statusOptionSelected : [];

    const response = await axios.post(
      "https://pispl.app-assertai.com:8000/api/post",
      {
        startDate: startingDateValue,
        endDate: endingDateValue,
        startTime: startingTimeValue,
        endTime: endingTimeValue,
        camera: cameraSelected,
        alert: alertSelected,
        zone: zoneSelected,
        person: usersSelected,
        status: statusSelected,
        email: email,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status == 200) {
      openNotification(
        "A Mail will be sent to your confirmed mail. Please check after sometime."
      );
      setModalOpenForPdf(false);
    } else {
      openNotification("Something went wrong. Try after sometime.");
      setModalOpenForPdf(false);
    }
  };

  const generatePDF = () => {
    setModalOpenForPdf(true);
  };
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleBulkCloseCommentChange = (e) => {
    setBulkCloseCommentText(e.target.value);
  };

  const onChange = (record) => {};

  const handleHideChange = async (record, e) => {
    let visibilityResponse = await editVisibility({ id: record });

    if ((visibilityResponse.data = "Visibility Updated")) {
      openNotification(visibilityResponse.data);

      if (handleGetDataClicked == 0) {
        get24hrsAlerts();
      } else {
        handleGetData();
      }
    } else {
      openNotification("Some Error Caught");
    }
  };

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
      key: "date",
      dataIndex: "date",
      align: "left",
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
      key: "time",
      dataIndex: "time",
      defaultSortOrder: "descend",
      align: "left",
    },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={ALERTICON}
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
      key: "camera",
      dataIndex: "camera",
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
      key: "image",
      dataIndex: "image",
      render: (_, record) => {
        return (
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
            {record.alert === "Vehicle Turn Around Time" ? (
              ""
            ) : (
              <Button
                type="primary"
                style={{ backgroundColor: "#2292A4" }}
                onClick={function () {
                  handleOpenVideo();
                  setLoading(false);
                  setVideo(record.video);
                }}
              >
                video
              </Button>
            )}
          </div>
        );
      },
      align: "left",
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
            if (JSON.parse(record?.comments)?.length > 0) {
              setComments(JSON.parse(commentsList.data[0].comments));
              setStatusValue(record.status);
            } else {
              setComments([]);
            }
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
    {
      title: (
        <div style={{ display: accessValue === "Support" ? "block" : "none" }}>
          <IconButton sx={{ p: 1 }}>
            <img
              src={VISIBILITYICON}
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
            Visibility
          </span>
        </div>
      ),
      key: "visibility",
      align: "left",
      render: (_, record) => (
        <Radio
          style={{ display: accessValue === "Support" ? "block" : "none" }}
          onChange={(e) => {
            handleHideChange(record.id);
          }}
        >
          Hide
        </Radio>
      ),
    },
  ];

  const handleCloseAllClick = async () => {
    let response = await bulkCloseStatus(rowsDocuments, name);

    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    let alertSelected = optionSelected;
    let cameraSelected = cameraOptionSelected;
    let zoneSelected = zoneOptionSelected;
    if (alertSelected == null && cameraSelected == null) {
      let updatedTableData = await get24hrsAlertsList();
      setDataSource(updatedTableData.data);
      setSelectedRowKeys([]);
    } else {
      let updatedTableData = await getAlertsList({
        startingDateValue,
        startingTimeValue,
        endingDateValue,
        endingTimeValue,
        cameraSelected,
        alertSelected,
        zoneSelected,
      });
      setDataSource(updatedTableData.data);
      setSelectedRowKeys([]);
    }
  };

  const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
      let userSheetData = apiData.map((item) => {
        return {
          Date: item.date,
          time: item.time,
          alert: item.alert,
          camera: item.camera,
          zone: item.zone,
          tat: item.tat ? item.tat : "",
          status: item.status ? item.status : "",
          image: {
            s: { color: "blue" },
            t: "s",
            v: `${item.image}`,
            l: { Target: `${item.image}`, Tooltip: "Download Image" },
          },
          video: {
            s: { color: "blue" },
            t: "s",
            v: `${item.video}`,
            l: { Target: `${item.video}`, Tooltip: "Download Video" },
          },
          comments: item.comments ? item.comments : "",
        };
      });
      const ws = XLSX.utils.json_to_sheet(userSheetData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
      <CommonButton
        onClick={(e) => exportToCSV(apiData, fileName)}
        icon={FileUploadIcon}
      >
        Export
      </CommonButton>
    );
  };

  const handleCommentClick = async (e) => {
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
    setCommentText("");
  };

  const handleBulkCloseCommentClick = async (e) => {
    let commentsResponse = await postCommentForBulkStatusClose(
      rowsDocuments,
      bulkCloseCommentText,
      name
    );
    setBulkCloseCommentText("");
    setBulkStatusCommentsResponse(commentsResponse.data);
    openNotification(commentsResponse.data);
  };
  const handleStatusClose = async (dataRecordOfStatus) => {
    let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
    setStatusValue("Close");
    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    let alertSelected = optionSelected;
    let cameraSelected = cameraOptionSelected;
    let zoneSelected = zoneOptionSelected;
    let usersSelected = usersAssignedOptionSelected;
    let statusSelected = statusOptionSelected;
    if (alertSelected == null && cameraSelected == null) {
      let updatedTableData = await get24hrsAlertsList();
      setDataSource(updatedTableData.data);
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
        statusSelected,
      });
      setDataSource(updatedTableData.data);
    }
    setModalOpen(false);
  };
  const confirm = async (dataRecordOfStatus) => {
    let { AlertsAssigned, usersAssigned } = dataRecordOfStatus;
    // let { usersAssigned } = dataRecordOfStatus;
    if (comments.length == 0) {
      return openNotification("Status Cannot be closed without comments.");
    } else {
      if (!AlertsAssigned?.includes(name)) {
        return openNotification(
          `You cannot close this status.[NOT ASSIGNED]. Only ${
            AlertsAssigned
              ? AlertsAssigned?.replace(/[\[\]']+/g, "").replace(/['"]+/g, "")
              : `${usersAssigned} can close this alert.`
          }
            `
        );
      } else {
        let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
        setStatusValue("Close");
        let startingDateValue = await convertDate(startDate);
        let endingDateValue = await convertDate(endDate);
        let startingTimeValue = await convertTime(startTime);
        let endingTimeValue = await convertTime(endTime);
        let alertSelected = optionSelected;
        let cameraSelected = cameraOptionSelected;
        let zoneSelected = zoneOptionSelected;
        let usersSelected = usersAssignedOptionSelected;
        let statusSelected = statusOptionSelected;
        if (alertSelected == null && cameraSelected == null) {
          let updatedTableData = await get24hrsAlertsList();
          setDataSource(updatedTableData.data);
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
            statusSelected,
          });
        }
        setModalOpen(false);
      }
    }
    // if (comments.length == 0) {
    //   openNotification("Status Cannot be closed without comments.");
    // } else if (usersAssigned != name) {
    //   openNotification(
    //     `You cannot close this status.[NOT ASSIGNED]. Only ${usersAssigned} can close this alert.`
    //   );
    //   return;
    // } else if (!AlertsAssigned?.includes(name)) {
    //   openNotification(
    //     `You cannot close this status.[NOT ASSIGNED]. Only ${JSON.stringify(
    //       AlertsAssigned
    //     )
    //       .replace(/[\[\]']+/g, "")
    //       .replace(/['"]+/g, "")}`
    //   );
    //   return;
    // } else {
    //   let dataofclosed = await closeStatus(dataRecordOfStatus.id, name);
    //   setStatusValue("Close");
    //   let startingDateValue = await convertDate(startDate);
    //   let endingDateValue = await convertDate(endDate);
    //   let startingTimeValue = await convertTime(startTime);
    //   let endingTimeValue = await convertTime(endTime);
    //   let alertSelected = optionSelected;
    //   let cameraSelected = cameraOptionSelected;
    //   let zoneSelected = zoneOptionSelected;
    //   let usersSelected = usersAssignedOptionSelected;
    //   let statusSelected = statusOptionSelected;
    //   if (alertSelected == null && cameraSelected == null) {
    //     let updatedTableData = await get24hrsAlertsList();
    //     setDataSource(updatedTableData.data);
    //   } else {
    //     let updatedTableData = await getAlertsList({
    //       startingDateValue,
    //       startingTimeValue,
    //       endingDateValue,
    //       endingTimeValue,
    //       cameraSelected,
    //       alertSelected,
    //       zoneSelected,
    //       usersSelected,
    //       statusSelected,
    //     });
    //   }
    //   setModalOpen(false);
    // }
  };
  const cancel = (e) => {};
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
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
      navigate(path, {
        state: {
          dates: { startDate, endDate, startTime, endTime },
          alertsToDashboardPage: true,
        },
      });
    }
  };

  const handleResetFilters = () => {
    localStorage.setItem("getDataClickedFromDashboard", false);
    window.location.reload();
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

                  <span onClick={() => handleNavigate("/bypasscamera")}>
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
        {/* <SideBar display={open} /> */}
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
                fontFamily: "Calibri", //fontFamily: "Calibri"
                fontStyle: "normal",
                color: "slategray",
              }}
            >
              Alerts
            </Typography>
            {/* <Tooltip title="Alerts" placement="right-start">
							<img src={ALERT} style={{ width: "10vh", height: "10vh" }} alt="LOGO" />
						</Tooltip> */}
          </div>
          <div className="filters">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  format="DD-MM-YYYY"
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={
                deDE.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Start Time"
                  views={["hours", "minutes", "seconds"]}
                  ampm={true}
                  clearIcon={null}
                  format="HH:mm:ss"
                  onChange={(time) => {
                    setStartTime(time);
                  }}
                  value={startTime}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  format="DD-MM-YYYY"
                  label="End Date"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={
                deDE.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="End Time"
                  views={["hours", "minutes", "seconds"]}
                  ampm={true}
                  clearIcon={null}
                  format="HH:mm:ss"
                  onChange={(time) => setEndTime(time)}
                  value={endTime}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="filters2">
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
            <FormControl sx={{ m: 1, width: 300 }}>
              <ReactSelect
                options={alertoptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                // 	Option,
                // }}
                onChange={(e) => handleChange(e)}
                allowSelectAll={true}
                placeholder="Select Alerts"
                value={optionSelected}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <ReactSelect
                options={zoneoptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                // 	Option,
                // }}
                onChange={(e) => handleZoneChange(e)}
                allowSelectAll={true}
                placeholder="Select Zones"
                value={zoneOptionSelected}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <ReactSelect
                options={usersAssignedOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                // 	Option,
                // }}
                onChange={(e) => handlePersonChange(e)}
                allowSelectAll={true}
                placeholder="Select Person"
                value={usersAssignedOptionSelected}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <ReactSelect
                options={statusOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={(e) => handleStatusChange(e)}
                allowSelectAll={true}
                placeholder="Select Status"
                value={statusOptionSelected}
              />
            </FormControl>
            <button
              className="btn btn-primary"
              onClick={handleGetData}
              style={{ width: "15vw", backgroundColor: "#2292A4" }}
            >
              Get Data
            </button>
            <Tooltip
              title={
                pageNavigationData == false
                  ? "This is disabled.Works only on dashboard to alerts page navigation."
                  : "Click here to reset filters."
              }
            >
              <button
                // disabled={pageNavigationData == false ? true : false}
                className="btn btn-primary"
                onClick={handleResetFilters}
                style={{ width: "15vw", backgroundColor: "#2292A4" }}
              >
                Reset Filters
              </button>
            </Tooltip>

            <div
              style={{
                backgroundColor: "#2292A4",
                padding: "1vh",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <span>
                Total Alerts {dataSource?.length ? dataSource.length : 0}
              </span>
            </div>
          </div>
          <div
            className="my-2 mb-3"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
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
                  // onClick={() => handleStatusClose(modalRecord)}
                >
                  Close All
                </Button>
              </Popconfirm>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2vh",
              }}
            >
              <CommonButton
                onClick={(e) => generatePDF()}
                icon={FileDownloadIcon}
              >
                DownloadPdf
              </CommonButton>
              <div>
                <ExportToExcel apiData={dataSource} fileName={"Alerts Sheet"} />
              </div>
            </div>
          </div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2vh",
              }}
            >
              <span style={{ color: "slategray", fontStyle: "italic" }}>
                Data is loading.Please wait...
              </span>
              <Spin />
            </div>
          ) : (
            <Table
              rowKey={(record) => record.id}
              rowSelection={{
                selectedRowKeys: selectedRowsKeys,
                onChange: (keys, selectedRowKeys, selectedRows) => {
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
              dataSource={dataSource}
            />
          )}
          <Modal
            title="Alert Status"
            style={{
              top: 20,
            }}
            centered
            open={modalOpen}
            onOk={async () => {
              setModalOpen(false);
              let startingDateValue = await convertDate(startDate);
              let endingDateValue = await convertDate(endDate);
              let startingTimeValue = await convertTime(startTime);
              let endingTimeValue = await convertTime(endTime);
              let alertSelected = optionSelected;
              let cameraSelected = cameraOptionSelected;
              let zoneSelected = zoneOptionSelected;
              let usersSelected = usersAssignedOptionSelected;
              let statusSelected = statusOptionSelected;
              if (alertSelected == null && cameraSelected == null) {
                let updatedTableData = await get24hrsAlertsList();
                setDataSource(updatedTableData.data);
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
                  statusSelected,
                });
                setDataSource(updatedTableData.data);
              }
            }}
            onCancel={async () => {
              setModalOpen(false);
              let startingDateValue = await convertDate(startDate);
              let endingDateValue = await convertDate(endDate);
              let startingTimeValue = await convertTime(startTime);
              let endingTimeValue = await convertTime(endTime);
              let alertSelected = optionSelected;
              let cameraSelected = cameraOptionSelected;
              let zoneSelected = zoneOptionSelected;
              let usersSelected = usersAssignedOptionSelected;
              let statusSelected = statusOptionSelected;
              if (alertSelected == null && cameraSelected == null) {
                let updatedTableData = await get24hrsAlertsList();
                setDataSource(updatedTableData.data);
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
                  statusSelected,
                });
                setDataSource(updatedTableData.data);
              }
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
                      style={{
                        width: "auto",
                        height: "5vh",
                        marginRight: "3vh",
                      }}
                      alt="LOGO"
                    />
                  </Tooltip>
                  <input
                    type="text"
                    value={
                      modalRecord?.AlertsAssigned
                        ? modalRecord?.AlertsAssigned.replace(
                            /[\[\]']+/g,
                            ""
                          ).replace(/['"]+/g, "")
                        : modalRecord?.usersAssigned
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
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
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
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
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
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
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
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
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
                        {modalRecord?.tatstarttime
                          ? modalRecord?.tatstarttime
                          : ""}
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
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2vh" }}
                >
                  <Tooltip title="Comment Input" placement="left-start">
                    <img
                      src={TYPEICON}
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
                      alt="LOGO"
                    />
                  </Tooltip>
                  <TextArea
                    disabled={
                      modalRecord?.status == "Close" ||
                      modalRecord?.status == "Closed" ||
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
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
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
                      }}
                      value={
                        modalRecord?.status == "Open" ||
                        modalRecord?.status == null ||
                        modalRecord?.status == ""
                          ? "Open"
                          : statusValue
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
                shouldUpdate={(prevValues, curValues) =>
                  prevValues !== curValues
                }
              >
                {comments?.length > 0 ? (
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
            cancelButtonProps={{ style: { display: "none" } }}
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
              await handleCloseAllClick();
              let startingDateValue = await convertDate(startDate);
              let endingDateValue = await convertDate(endDate);
              let startingTimeValue = await convertTime(startTime);
              let endingTimeValue = await convertTime(endTime);
              let alertSelected = optionSelected;
              let cameraSelected = cameraOptionSelected;
              let zoneSelected = zoneOptionSelected;
              let usersSelected = usersAssignedOptionSelected;
              let statusSelected = statusOptionSelected;
              if (alertSelected == null && cameraSelected == null) {
                let updatedTableData = await get24hrsAlertsList();
                setDataSource(updatedTableData.data);
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
                  statusSelected,
                });
                setDataSource(updatedTableData.data);
              }
              setSelectedRowKeys([]);
              setShowBulkCloseButton(false);
            }}
            onCancel={async () => {
              setOpenBulkCommentModal(false);
              let startingDateValue = await convertDate(startDate);
              let endingDateValue = await convertDate(endDate);
              let startingTimeValue = await convertTime(startTime);
              let endingTimeValue = await convertTime(endTime);
              let alertSelected = optionSelected;
              let cameraSelected = cameraOptionSelected;
              let zoneSelected = zoneOptionSelected;
              let usersSelected = usersAssignedOptionSelected;
              let statusSelected = statusOptionSelected;
              if (alertSelected == null && cameraSelected == null) {
                let updatedTableData = await get24hrsAlertsList();
                setDataSource(updatedTableData.data);
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
                  statusSelected,
                });
                setDataSource(updatedTableData.data);
              }
              setSelectedRowKeys([]);
              setShowBulkCloseButton(false);
            }}
          >
            {rowsForBulkClose[0]?.status === "Close" ? (
              <span style={{ color: "slategray" }}>
                Comment Below Is Closed
              </span>
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
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2vh" }}
                >
                  <Tooltip title="Comment Input" placement="left-start">
                    <img
                      src={TYPEICON}
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
                      alt="LOGO"
                    />
                  </Tooltip>

                  <TextArea
                    disabled={
                      rowsForBulkClose[0]?.status !== "Open" ? true : false
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
                      rowsForBulkClose[0]?.status !== "Open" ? true : false
                    }
                  >
                    Comment
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Pdf Generate Mail Confirmation"
            style={{
              top: 20,
            }}
            onCancel={() => {
              setModalOpenForPdf(false);
            }}
            centered
            open={modalOpenForPdf}
            footer={null}
          >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              layout="horizontal"
              style={{ maxWidth: 1000 }}
            >
              <Form.Item>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2vh" }}
                >
                  <Tooltip title="Comment Input" placement="left-start">
                    <img
                      src={TYPEICON}
                      style={{
                        width: "5vh",
                        height: "5vh",
                        marginRight: "1vh",
                      }}
                      alt="LOGO"
                    />
                  </Tooltip>

                  <TextArea
                    rows={1}
                    style={{ border: "1px solid skyblue" }}
                    placeholder="Enter Your Mail"
                    value={mailForPdf}
                  />

                  <Popconfirm
                    title="Mail Confirm"
                    description="Are you sure this is your mail."
                    onConfirm={() => {
                      sendPostBodyForGeneratePdf();
                    }}
                    onCancel={(e) => {
                      openNotification("Check your logged in mail once.");
                      setModalOpenForPdf(false);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Confirm Mail</Button>
                  </Popconfirm>
                </div>
              </Form.Item>
              <Form.Item>
                <Typography
                  style={{
                    fontFamily: "sans-serif",
                    color: "red",
                    fontSize: "12px",
                  }}
                  className="mx-1"
                >
                  Note :-{" "}
                  <span>
                    Please make sure to use the date filters to a maximum of one
                    week.
                  </span>
                </Typography>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default NewAlertsPage;
