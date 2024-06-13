import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { LineGraphListForTat } from "../../services/Graph";
import { LineGraphListFor24hrsForTAT } from "../../services/Last24hrs";
import ReactApexChart from "react-apexcharts";

const TravelDetailsView = (props) => {
  const { callFromDashboard, call } = props;

  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [dataPoint, setDataPoint] = useState([]);
  const [toolTipData, setToolTipData] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tatValue, setTatValue] = useState("");
  const [tatStartValue, setTatStartValue] = useState("");
  const [tatEndValue, setTatEndValue] = useState("");
  const [cameraValue, setCameraValue] = useState("");
  const [zoneValue, setZoneValue] = useState("");

  const getLineGraphList = async ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    let apiData = await LineGraphListForTat({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
    });
    if (apiData.data != undefined) {
      setLoading(false);
      setValue(apiData?.data.data[0]);
      setDataPoint(apiData?.data[0]?.y);
      setToolTipData(apiData?.data[0]?.z);
    } else if (apiData == "Not Found") {
      setLoading(false);
    }
  };

  const getLineGraphListFor24hrs = async () => {
    let apiData = await LineGraphListFor24hrsForTAT();
    if (apiData.data != undefined) {
      setLoading(false);
      setValue(apiData?.data[0]);
      setDataPoint(apiData?.data[0]?.y);
      setToolTipData(apiData?.data[0]?.z);
    } else if (apiData == "Not Found") {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (callFromDashboard > 0) {
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
      getLineGraphList({ startDate, endDate, startTime, endTime });
      setIsApiCall(true);
    } else {
      getLineGraphListFor24hrs();
    }
  }, [callFromDashboard]);

  const options = {
    chart: {
      type: "candlestick",
    },
    xaxis: {
      // type: "datetime",
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#086375", // Color for upward sticks (bullish)
          downward: "#247ba0", // Color for downward sticks (bearish)
        },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        setTatValue(value[dataPointIndex].z[seriesIndex]);
        setTatStartValue(value[dataPointIndex].z[seriesIndex + 1]);
        setTatEndValue(value[dataPointIndex].z[seriesIndex + 2]);
        setCameraValue(value[dataPointIndex].z[seriesIndex + 3]);
        setZoneValue(value[dataPointIndex].z[seriesIndex + 4]);
        return (
          '<div class="custom-tooltip" style="padding:2vh">' +
          "<span>TAT: " +
          tatValue +
          "</span><br>" +
          "<span>TAT Start Time: " +
          tatStartValue +
          "</span><br>" +
          "<span>TAT End Time: " +
          tatEndValue +
          "</span><br>" +
          "<span>Camera: " +
          cameraValue +
          "</span><br>" +
          "<span>Zone: " +
          zoneValue +
          "</span><br>" +
          "</div>"
        );
      },
    },
  };

  const series = [
    {
      data: value && value.length > 0 ? value : [],
      color: "blue",
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
          {value?.length > 0 ? (
            <ReactApexChart
              options={options}
              series={series}
              width="100%"
              height={300}
              // type="line"
              type="candlestick"
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="mx-3" style={{ color: "slategray" }}>
                No Data
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

const ApexLineGraphForTAT = (props) => {
  const { dates, call, callFromDashboard } = props;
  return (
    <TravelDetailsView
      dates={dates}
      call={call}
      callFromDashboard={callFromDashboard}
    />
  );
};

export default ApexLineGraphForTAT;
