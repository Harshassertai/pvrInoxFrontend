import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BarGraphList } from "../../services/Graph";
import { FilterForZones } from "../../services/Filters";
import ReactApexChart from "react-apexcharts";
import "./index.css";

//For 24hrs
import { BarGraphListFor24hrs } from "../../services/Last24hrs";

const TravelDetailsView = (props) => {
  const { call, callFromDashboard } = props;
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [dataPoint, setDataPoint] = useState("");
  const [isApiCall, setIsApiCall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zonesValue, setZones] = useState([]);
  const getBarGraphList = async ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    let apiData = await BarGraphList({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
    });
    setLoading(false);
    setValue(apiData.data);
  };

  const barClick = async ({ args }) => {
    let datesObj = localStorage.getItem("Dates");
    let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
    let newZones = zonesValue;
    setDataPoint(newZones[args]);
    navigate("/bargraphclick", {
      state: {
        zoneValue: newZones[args],
        isApiCall,
        dates: { startDate, endDate, startTime, endTime },
      },
    });
  };

  const getBarGraphListFor24hrs = async () => {
    let apiData = await BarGraphListFor24hrs();
    setLoading(false);
    setValue(apiData.data);
  };

  const getZonesValues = async () => {
    let zonesInBarGraph = await FilterForZones();
    let zonesData = zonesInBarGraph.data
      .filter((item) => {
        if (item.label != null) {
          return item.label;
        }
      })
      .map((item) => {
        return item.label;
      });
    setZones(zonesData);
  };

  useEffect(() => {
    getZonesValues();

    setLoading(true);
    if (callFromDashboard > 0) {
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
      getBarGraphList({ startDate, endDate, startTime, endTime });
      // getBarGraphList();
      setIsApiCall(true);
    } else {
      getBarGraphListFor24hrs();
    }
  }, [callFromDashboard]);
  const chartData = {
    chart: {
      id: "apexchart-example",
      foreColor: ["#F44336", "#E91E63", "#9C27B0"],
      type: "pie",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
          customIcons: [],
        },
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          switch (config.dataPointIndex) {
            case 0:
              barClick({ args: config.dataPointIndex });
              break;
            case 1:
              barClick({ args: config.dataPointIndex });
              break;
            case 2:
              barClick({ args: config.dataPointIndex });
              break;
            case 3:
              barClick({ args: config.dataPointIndex });
              break;
            case 4:
              barClick({ args: config.dataPointIndex });
              break;
            case 5:
              barClick({ args: config.dataPointIndex });
              break;
            case 6:
              barClick({ args: config.dataPointIndex });
              break;
            case 7:
              barClick({ args: config.dataPointIndex });
              break;
            case 8:
              barClick({ args: config.dataPointIndex });
              break;
            case 9:
              barClick({ args: config.dataPointIndex });
              break;
            case 10:
              barClick({ args: config.dataPointIndex });
              break;
            case 11:
              barClick({ args: config.dataPointIndex });
              break;
            case 12:
              barClick({ args: config.dataPointIndex });
              break;
            case 13:
              barClick({ args: config.dataPointIndex });
              break;
            case 14:
              barClick({ args: config.dataPointIndex });
              break;
            default:
              barClick({ args: config.dataPointIndex });
          }
        },
      },
    },
    labels: [
      "Ante Room",
      "Battery Charging Area",
      "Common Pathway Entry Exit",
      "Docking Area Internal",
      "Electric Room",
      "Generator Area",
      "Material Handling",
      "Office Area",
      "Office Entry",
      "Pump Room",
      "Road Backside",
      "Road Frontside",
      "Staging Area",
      // "UN",
      "Work Entry",
    ].sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }),
    legend: {
      // position: '',
      width: 40,
      // position: 'top',
    },

    series: value && value.length > 0 ? value : [],
    fill: {
      colors: [
        "#3B3561",
        "#4481B3",
        "#187D8A",
        "#97C6FF",
        "#5D0202",
        "#7C769E",
        "#FC7A57",
        "#9D4F4F",
        "#EE9F9F",
        "#F5A27E",
        "#AC7070",
        "#5E9180",
        "#1E603A",
        "#6C915E",
      ],
    },
    colors: [
      "#3B3561",
      "#4481B3",
      "#187D8A",
      "#97C6FF",
      "#5D0202",
      "#7C769E",
      "#FC7A57",
      "#9D4F4F",
      "#EE9F9F",
      "#F5A27E",
      "#AC7070",
      "#5E9180",
      "#1E603A",
      "#6C915E",
    ],
  };

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
        <ReactApexChart
          options={chartData}
          series={chartData.series}
          type="pie"
          width="100%"
          height={450}
        />
      )}
    </>
  );
};

const ApexPieChart = (props) => {
  const { dates, call, callFromDashboard } = props;
  return (
    <TravelDetailsView
      dates={dates}
      call={call}
      callFromDashboard={callFromDashboard}
    />
  );
};

export default ApexPieChart;
