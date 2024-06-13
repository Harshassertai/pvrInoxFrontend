import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spin } from "antd";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { getLatestAlertsList } from "../../services/AlertsTable";
import IconButton from "@mui/material/IconButton";
import ALERTICON from "../../Assets/alert.png";
import FREQUENCYICON from "../../Assets/frequency.png";

//24hrs Api
import { get24hrsFrequentedAlertsList } from "../../services/Last24hrs";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
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

function TopAlerts(props) {
  const { call, callFromDashboard } = props;
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const getTableList = async ({ startDate, endDate, startTime, endTime }) => {
    let apiData = await getLatestAlertsList({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
    });
    console.log("MOST FREQUENTED ALERTS -----> ", apiData);
    if (apiData == "Network Error") {
      openNotification("Network error caught in most frequented alerts.");
      setTableData([]);
    } else if (apiData == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      navigate("/");
    } else if (apiData !== null) {
      setLoading(false);
      setTableData(apiData.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: apiData?.data?.length,
        },
      });
    } else if (apiData == null) {
      openNotification("No Data Found.");
      setTableData([]);
    } 
  };
  const get24hrsTableList = async () => {
    let frequented24hrsdata = await get24hrsFrequentedAlertsList();
    setLoading(false);
    setTableData(frequented24hrsdata.data);
  };

  useEffect(() => {
    setLoading(true);
    if (callFromDashboard > 0) {
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
      getTableList({ startDate, endDate, startTime, endTime });
    } else {
      get24hrsTableList();
    }
  }, [JSON.stringify(tableParams), callFromDashboard]);

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setTableData([]);
    }
  };
  const columns = [
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
      dataIndex: "alert",
    },
    {
      title: (
        <>
          <IconButton sx={{ p: 1 }}>
            <img
              src={FREQUENCYICON}
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
            Frequency
          </span>
        </>
      ),
      dataIndex: "count",
    },
  ];
  return (
    <>
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
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </>
      )}
    </>
  );
}

export default TopAlerts;
