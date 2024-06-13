import React, { useEffect, useState } from "react";
// import { useIdleTimer } from "react-idle-timer";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { deDE } from "@mui/x-date-pickers/locales";
import { SmileOutlined } from "@ant-design/icons";
import { notification, Spin, Alert, ConfigProvider } from "antd";
import Divider from "@mui/material/Divider";
import BarGraph from "../Graph/ApexBarGraph";
import Linegraph from "../Graph/ApexLineGraph";
import Piechart from "../Graph/ApexPieChart";
import Dock from "../Dock/Dock";
import Person from "../Person/Person";
import Security from "../Security/Security";
import Violation from "../Violation/Violation";
import BARGRAPHICON from "../../Assets/bar-chart.gif";
import LINEGRAPHICON from "../../Assets/bar-chart.gif";
import PIECHARTICON from "../../Assets/piechart.gif";
import TABLEICON from "../../Assets/table.gif";
import MANICON from "../../Assets/man.png";
import ALLICON from "../../Assets/warning.png";
import HIGHFREQICON from "../../Assets/high-performance.png";
import LATESTHIGHFREQICON from "../../Assets/mostFrequent.gif";
import DOCKICON from "../../Assets/cross-docking.png";
import SECURITYICON from "../../Assets/guard.png";
import VIOLATIONICON from "../../Assets/violations.png";
import TATGRAPHICON from "../../Assets/truck.gif";
import ENTRYICON from "../../Assets/entrance.png";
import EXITICON from "../../Assets/log-out.png";
import CLOCKICON from "../../Assets/clock.png";
import jwt_decode from "jwt-decode";
import { decryptRequest } from "../../utils/crypt";
import { LogActivity } from "../../services/Login";

import convertDate from "../../utils/convertDates";
import convertTime from "../../utils/convertTimes";

import {
  Count,
  TotalCount,
  EntryCount,
  ExitCount,
  TatCount,
} from "../../services/Count";
import { getLastAlertsList } from "../../services/LastEntryAlert";
import { LineGraphListForTat } from "../../services/Graph";
import TopAlerts from "../Table/TopAlerts";
import TopLatestAlerts from "../Table/TopLatestAlert";
import TatGraph from "../Graph/ApexLineGraphForTAT";

//last24hrs Apis
import {
  Last24hrsTotalCount,
  Last24hrsEntryCount,
  Last24hrsExitCount,
  Last24hrsTatCount,
} from "../../services/Last24hrs";
import { FilterForZones } from "../../services/Filters";

//Zone Wise Table
import ZoneWiseTable from "../Table/ZoneWiseTable";

import "./index.css";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        backgroundColor: "white",
        width: "100%",
        border: "1px solid #2292A4",
        borderRadius: "5px",
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useIdleTimer = (timeout = 900000) => {
  // 900000ms = 15 minutes
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      setIsIdle(false);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Set up event listeners for various user actions
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // Set initial timer
    resetTimer();

    return () => {
      // Clean up
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [timeout]); // Reset only if timeout changes

  return isIdle;
};

function Main() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  let [startDate, setStartDate] = useState(dayjs(new Date()));
  let [endDate, setEndDate] = useState(dayjs(new Date()));
  let [startTime, setStartTime] = useState(new Date().setHours(0, 0, 0));
  let [endTime, setEndTime] = useState(new Date());
  const [filterObject, setFilterObject] = useState({});
  const [filterObjectForTables, setFilterObjectForTable] = useState({});
  const [tatDataValue, setTatDataValue] = useState();
  const [totalAllCount, setTotalAllCount] = useState(0);
  const [totalEntryCount, setTotalEntryCount] = useState(0);
  const [totalExitCount, setTotalExitCount] = useState(0);
  const [tatCount, setTatCount] = useState(0);
  const [dockCount, setDockCount] = useState(0);
  const [personCount, setPersonCount] = useState(0);
  const [SecurityCount, setSecurityCount] = useState(0);
  const [violationCount, setViolationCount] = useState(0);
  const [callLive, setCallLive] = useState(false);
  const [callLiveFromDashboard, setCallLiveFromDashboard] = useState(0);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setColor, setIsColor] = useState(false);
  const [tabTitle, setTabTitle] = useState("Overview");
  const [zoneTableCount, setZoneTableCount] = useState(0);

  const isIdle = useIdleTimer(900000); // Set timeout as 15 minutes

  useEffect(() => {
    if (isIdle) {
      openNotification("Logging Out. You Are Idle for 15 minutes.");
      localStorage.clear();
      navigate("/");
    }
  }, [isIdle]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    let categories = [
      "Office Entry [OE]", //0
      "Work Entry [WE]", //1
      "Common Pathway Entry Exit [CP]", //2
      "Docking Area Internal [DI]", //3
      "Ante Room [AR]", //5
      "Pump Room [PR]", //6
      "Generator Area [GA]", //7
      "Electric Room [ER]", //8
      "Road Backside [RB]", //9
      "Road Frontside [RF]", //10
      "Staging Area [SA]", //11
      "Battery Charging Area [BC]", //12
      "Material Handling [MHEA]", //13
      "Office Area [OA]", //14
    ].sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    let newcategories = ["Overview", ...categories];
    setTabTitle(newcategories[newValue]);
  };
  async function getDatesFunction() {
    startDate = await convertDate(startDate);
    endDate = await convertDate(endDate);
    startTime = await convertTime(startTime);
    endTime = await convertTime(endTime);
    let datesObj = {
      startDate,
      startTime,
      endDate,
      endTime,
    };
    localStorage.setItem("Dates", JSON.stringify(datesObj));
  }
  const getLast24hrsData = async () => {
    let total24hrsCountData = await Last24hrsTotalCount(zones[value - 1]);
    let total24hrsEntryCountData = await Last24hrsEntryCount(zones[value - 1]);
    let total24hrsExitCountData = await Last24hrsExitCount(zones[value - 1]);
    let total24hrsTatCountData = await Last24hrsTatCount(zones[value - 1]);
    if (zones[value - 1] == undefined) {
      setTotalAllCount(
        total24hrsCountData?.data ? total24hrsCountData.data : 0
      );
      setTotalEntryCount(
        total24hrsEntryCountData?.data ? total24hrsEntryCountData.data : 0
      );
      setTotalExitCount(
        total24hrsExitCountData?.data ? total24hrsExitCountData.data : 0
      );
      setTatCount(
        total24hrsTatCountData?.data ? total24hrsTatCountData.data : 0
      );
      setZoneTableCount(0);
    } else {
      setZoneTableCount(
        total24hrsCountData?.data ? total24hrsCountData.data : 0
      );
    }
  };
  const getZones = async () => {
    let zonesData = await FilterForZones();
    let filteredZones = zonesData.data
      ?.filter((item) => {
        return item.label != null;
      })
      .map((item) => {
        return item.label;
      });

    setZones(filteredZones);
    setLoading(false);
  };

  // useEffect(() => {
  //   getLast24hrsData();
  // }, [value]);

  useEffect(() => {
    getDatesFunction();

    let cookiesValue = Cookies.get("name");
    if (cookiesValue) {
      if (new Date(JSON.parse(cookiesValue)?.expires) <= new Date()) {
        localStorage.clear();
        Cookies.remove("name");
        navigate("/");
      }
    }
    getZones();
  }, []);

  const handleDataAfterNavigation = async ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    let totalCountData = await TotalCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: zones[value - 1],
    });
    let totalEntryCountData = await EntryCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: undefined,
    });
    let totalExitCountData = await ExitCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: undefined,
    });
    let tatCountData = await TatCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: undefined,
    });
    if (zones[value - 1] == undefined) {
      setTotalAllCount(totalCountData?.data ? totalCountData.data : 0);
      setTotalEntryCount(
        totalEntryCountData?.data ? totalEntryCountData.data : 0
      );
      setTotalExitCount(totalExitCountData?.data ? totalExitCountData.data : 0);
      setTatCount(tatCountData?.data ? tatCountData.data : 0);
      setZoneTableCount(0);
    } else {
      setZoneTableCount(totalCountData?.data ? totalCountData.data : 0);
    }

    let lastEntryData = await getLastAlertsList();
  };

  const handleGetData = async () => {
    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    let datesObj = {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
    };
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
    localStorage.setItem("Dates", JSON.stringify(datesObj));
    localStorage.setItem("getDataClickedFromDashboard", true);
    setFilterObjectForTable({
      startDate: startingDateValue,
      endDate: endingDateValue,
      startTime: startingTimeValue,
      endTime: endingTimeValue,
    });
    setCallLive(true);
    setCallLiveFromDashboard(callLiveFromDashboard + 1);
    let totalCountData = await TotalCount({
      startingDateValue,
      startingTimeValue,
      endingDateValue,
      endingTimeValue,
      value: zones[value - 1],
    });
    let totalEntryCountData = await EntryCount({
      startingDateValue,
      startingTimeValue,
      endingDateValue,
      endingTimeValue,
      value: undefined,
    });
    let totalExitCountData = await ExitCount({
      startingDateValue,
      startingTimeValue,
      endingDateValue,
      endingTimeValue,
      value: undefined,
    });
    let tatCountData = await TatCount({
      startingDateValue,
      startingTimeValue,
      endingDateValue,
      endingTimeValue,
      value: undefined,
    });
    if (zones[value - 1] == undefined) {
      setTotalAllCount(totalCountData?.data ? totalCountData.data : 0);
      setTotalEntryCount(
        totalEntryCountData?.data ? totalEntryCountData.data : 0
      );
      setTotalExitCount(totalExitCountData?.data ? totalExitCountData.data : 0);
      setTatCount(tatCountData?.data ? tatCountData.data : 0);
      setZoneTableCount(0);
    } else {
      setZoneTableCount(totalCountData?.data ? totalCountData.data : 0);
    }
    let lastEntryData = await getLastAlertsList();
  };

  const handleGetDataForBackedClicked = async ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    let datesObj = {
      startDate,
      startTime,
      endDate,
      endTime,
    };
    localStorage.setItem("Dates", JSON.stringify(datesObj));
    setFilterObjectForTable({
      startDate,
      startTime,
      endDate,
      endTime,
    });
    setCallLive(true);
    setCallLiveFromDashboard(callLiveFromDashboard + 1);
    let totalCountData = await TotalCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: zones[value - 1],
    });
    let totalEntryCountData = await EntryCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: undefined,
    });
    let totalExitCountData = await ExitCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: undefined,
    });
    let tatCountData = await TatCount({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
      value: undefined,
    });
    if (zones[value - 1] == undefined) {
      setTotalAllCount(totalCountData?.data ? totalCountData.data : 0);
      setTotalEntryCount(
        totalEntryCountData?.data ? totalEntryCountData.data : 0
      );
      setTotalExitCount(totalExitCountData?.data ? totalExitCountData.data : 0);
      setTatCount(tatCountData?.data ? tatCountData.data : 0);
      setZoneTableCount(0);
    } else {
      setZoneTableCount(totalCountData?.data ? totalCountData.data : 0);
    }

    let lastEntryData = await getLastAlertsList();
  };

  useEffect(() => {
    console.log("Backed Dates -----> ", state);
    if (state?.backClicked) {
      let { startDate, endDate, startTime, endTime } = state.selectedDates;
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

      handleGetDataForBackedClicked({ startDate, endDate, startTime, endTime });
    } else {
      setStartDate(dayjs(new Date()));
      setEndDate(dayjs(new Date()));
      setStartTime(new Date().setHours(0, 0, 0));
      setEndTime(new Date());
      getLast24hrsData();
    }
  }, []);

  const changeDates = ({
    startingDateValue,
    endingDateValue,
    startingTimeValue,
    endingTimeValue,
  }) => {
    let datesObj = {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
    };
    localStorage.setItem("Dates", JSON.stringify(datesObj));
  };

  const handleTabClick = (index) => {
    console.log("Tab value ", index);
  };
  const handleCardClick = async (cardClickedName) => {
    console.log("Call Live ----> ", callLive);
    let startingDateValue = await convertDate(startDate);
    let endingDateValue = await convertDate(endDate);
    let startingTimeValue = await convertTime(startTime);
    let endingTimeValue = await convertTime(endTime);
    if (callLive) {
      navigate("/countsTable", {
        state: {
          cardName: cardClickedName,
          handleDataClicked: true,
          dates: {
            startDate: startingDateValue,
            endDate: endingDateValue,
            startTime: startingTimeValue,
            endTime: endingTimeValue,
          },
        },
      });
    } else {
      navigate("/countsTable", {
        state: {
          cardName: cardClickedName,
          handleDataClicked: false,
          dates: {
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
          },
        },
      });
    }
  };

  return (
    <div className="mainDiv">
      <Typography
        textAlign="center"
        style={{
          fontSize: "x-large",
          fontFamily: "Calibri",
          fontStyle: "normal",
          color: "slategray",
        }}
      >
        {tabTitle ? tabTitle : ""}
      </Typography>
      <div className="filters">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Start Date"
              format="DD-MM-YYYY"
              value={startDate}
              selected={startDate}
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
              label="End Date"
              format="DD-MM-YYYY"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              value={endDate}
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
        <button
          className="btn btn-primary"
          onClick={handleGetData}
          style={{ backgroundColor: "#2292A4" }}
        >
          Get Data
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1vh",
          justifyContent: "space-between",
          width: "93vw",
        }}
      >
        <div className="filters2" style={{ backgroundColor: "#02a3d4" }}>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex" },
              mx: "5vh",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <img
              src={ALLICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
            <Typography
              textAlign="center"
              style={{
                fontSize: "medium",
                fontFamily: "Calibri",
                fontStyle: "normal",
                color: "white",
              }}
            >
              Total Alerts {totalAllCount - (totalEntryCount + totalExitCount)}
            </Typography>
          </Box>
        </div>
        <div
          className="filters2"
          style={{ backgroundColor: "#02a3d4" }}
          onClick={() => handleCardClick("Entry")}
        >
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex" },
              mx: "5vh",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <img
              src={ENTRYICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
            <Typography
              textAlign="center"
              style={{
                fontSize: "medium",
                fontFamily: "Calibri",
                fontStyle: "normal",
                color: "white",
              }}
            >
              Total Entry {totalEntryCount}
            </Typography>
          </Box>
        </div>
        <div
          className="filters2"
          style={{ backgroundColor: "#02a3d4" }}
          onClick={() => handleCardClick("Exit")}
        >
          <Box
            sx={{
              flexGrow: 0,
              display: { lg: "flex" },
              mx: "5vh",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <img
              src={EXITICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
            <Typography
              textAlign="center"
              style={{
                fontSize: "medium",
                fontFamily: "Calibri",
                fontStyle: "normal",
                color: "white",
              }}
            >
              Total Exit {totalExitCount}
            </Typography>
          </Box>
        </div>
        <div
          className="filters2"
          style={{ backgroundColor: "#02a3d4", pointer: "cursor" }}
          onClick={() => handleCardClick("Vehicle Turn Around Time")}
        >
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex" },
              mx: "5vh",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <img
              src={CLOCKICON}
              style={{ width: "5vh", height: "5vh" }}
              alt="LOGO"
            />
            <Typography
              textAlign="center"
              style={{
                fontSize: "medium",
                fontFamily: "Calibri",
                fontStyle: "normal",
                color: "white",
              }}
            >
              Tat Total Count {tatCount}
            </Typography>
          </Box>
        </div>
      </div>
      <div className="my-3">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    /* here is your component tokens */
                    itemActiveColor: "grey",
                  },
                },
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                type="cards"
              >
                <Tab
                  label="Overview"
                  {...a11yProps(0)}
                  style={{ backgroundColor: "#2292A4", color: "white" }}
                />
                {loading ? (
                  <div
                    className="mx-5"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spin />
                    <span className="mx-3" style={{ color: "slategray" }}>
                      Zones are loading.Please wait..
                    </span>
                  </div>
                ) : (
                  zones?.map((item, index, zones) => {
                    return (
                      <Tab
                        label={item}
                        {...a11yProps(index)}
                        style={{
                          backgroundColor: "#2292A4",
                          color: "white",
                        }}
                        onClick={() => {
                          handleTabClick(index);
                        }}
                      />
                    );
                  })
                )}
              </Tabs>
            </ConfigProvider>
          </Box>
          <TabPanel value={value} index={0}>
            {/* Dashboard Main Graphs */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1vh",
                }}
              >
                <div style={{ width: "50%" }} className="GraphDiv">
                  <div style={{ display: "flex" }}>
                    <img
                      src={BARGRAPHICON}
                      style={{ width: "5vh", height: "4vh" }}
                      alt="LOGO"
                    />
                    <h6
                      style={{
                        marginLeft: "2vh",
                        fontSize: "x-large",
                        color: "slategrey",
                        fontFamily: "Calibri",
                        fontStyle: "normal",
                      }}
                    >
                      Alerts{" "}
                    </h6>
                  </div>
                  <Divider className="my-3 mb-5 divider" />
                  <BarGraph
                    dates={filterObjectForTables}
                    call={callLive}
                    callFromDashboard={callLiveFromDashboard}
                  />
                </div>
                <div style={{ width: "50%" }} className="GraphDiv">
                  <div style={{ display: "flex" }}>
                    <img
                      src={PIECHARTICON}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                    <h6
                      style={{
                        marginLeft: "2vh",
                        fontSize: "x-large",
                        color: "slategrey",
                        fontFamily: "Calibri",
                        fontStyle: "normal",
                      }}
                    >
                      Alerts Chart
                    </h6>
                  </div>

                  <Divider className="my-3 mb-5 divider" />
                  <Piechart
                    dates={filterObjectForTables}
                    call={callLive}
                    callFromDashboard={callLiveFromDashboard}
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1vh",
                }}
              >
                <div style={{ width: "50%" }} className="GraphDiv">
                  <div style={{ display: "flex" }}>
                    <img
                      src={LINEGRAPHICON}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                    <h6
                      style={{
                        marginLeft: "2vh",
                        fontSize: "x-large",
                        color: "slategrey",
                        fontFamily: "Calibri",
                        fontStyle: "normal",
                      }}
                    >
                      Alerts Trend{" "}
                    </h6>
                  </div>
                  <Divider className="my-3 mb-5 divider" />
                  <Linegraph
                    dates={filterObject}
                    call={callLive}
                    callFromDashboard={callLiveFromDashboard}
                  />
                </div>
                <div style={{ width: "50%" }} className="GraphDiv">
                  <div style={{ display: "flex" }}>
                    <img
                      src={LATESTHIGHFREQICON}
                      style={{ width: "5vh", height: "5vh" }}
                      alt="LOGO"
                    />
                    <h6
                      style={{
                        marginLeft: "2vh",
                        fontSize: "x-large",
                        color: "slategrey",
                        fontFamily: "Calibri",
                        fontStyle: "normal",
                      }}
                    >
                      Most Frequent Alerts{" "}
                    </h6>
                  </div>
                  <Divider className="my-3 divider" />
                  <TopAlerts
                    dates={filterObjectForTables}
                    call={callLive}
                    callFromDashboard={callLiveFromDashboard}
                  />
                </div>
              </div>
              <div className="GraphDiv">
                <div style={{ display: "flex" }}>
                  <img
                    src={TATGRAPHICON}
                    style={{ width: "5vh", height: "5vh" }}
                    alt="LOGO"
                  />
                  <h6
                    style={{
                      marginLeft: "2vh",
                      fontSize: "x-large",
                      color: "slategrey",
                      fontFamily: "Calibri",
                      fontStyle: "normal",
                    }}
                  >
                    Vehicle Turn Around Time Trends{" "}
                  </h6>
                </div>
                <Divider className="my-3 divider" />
                <TatGraph
                  dates={filterObjectForTables}
                  call={callLive}
                  callFromDashboard={callLiveFromDashboard}
                />
              </div>
              <div className="GraphDiv">
                <div style={{ display: "flex" }}>
                  <img
                    src={TABLEICON}
                    style={{ width: "5vh", height: "5vh" }}
                    alt="LOGO"
                  />
                  <h6
                    style={{
                      marginLeft: "2vh",
                      fontSize: "x-large",
                      color: "slategrey",
                      fontFamily: "Calibri",
                      fontStyle: "normal",
                    }}
                  >
                    Latest Alerts{" "}
                  </h6>
                </div>
                <Divider className="my-3 divider" />
                <TopLatestAlerts
                  dates={filterObjectForTables}
                  call={callLive}
                />
              </div>
            </div>
          </TabPanel>
          {zones?.map((item, index) => {
            return (
              <TabPanel value={value} index={index + 1}>
                <ZoneWiseTable
                  item={item}
                  dates={filterObjectForTables}
                  call={callLive}
                />
              </TabPanel>
            );
          })}
        </Box>
      </div>
    </div>
  );
}

export default Main;
