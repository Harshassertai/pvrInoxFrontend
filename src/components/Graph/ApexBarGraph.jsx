import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BarGraphList, BarClickListFor24hrs } from "../../services/Graph";
import { FilterForZones } from "../../services/Filters";
import ReactApexChart from "react-apexcharts";

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

  const getBarGraphListFor24hrs = async () => {
    let apiData = await BarGraphListFor24hrs();
    setLoading(false);
    setValue(apiData.data);
  };
  const barClick = ({ args }) => {
    let datesObj = localStorage.getItem("Dates");
    let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
    let newZones = zonesValue;
    navigate("/bargraphclick", {
      state: {
        zoneValue: newZones[args],
        isApiCall,
        dates: { startDate, endDate, startTime, endTime },
      },
    });
  };

  const getZonesValues = async () => {
    let zonesData = [
      "AR",
      "BC",
      "CP",
      "DI",
      "ER",
      "GA",
      "MHEA",
      "OA",
      "OE",
      "PR",
      "RB",
      "RF",
      "SA",
      // "UN",
      "WE",
    ];
    setZones(zonesData);
  };

  useEffect(() => {
    getZonesValues();
    setLoading(true);
    if (callFromDashboard > 0) {
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } =
        JSON.parse(datesObj) || {};
      getBarGraphList({ startDate, endDate, startTime, endTime });
      setIsApiCall(true);
    } else {
      getBarGraphListFor24hrs();
    }
  }, [callFromDashboard]);

  const chartData = {
    chart: {
      id: "apexchart-example",
      type: "bar",
      foreColor: ["#F44336", "#E91E63", "#9C27B0"],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top",
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["#333"],
          },
          offsetX: 30,
        },
      },
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
          // Handle the click event here
          // console.log("Clicked on data point:", config.dataPointIndex, chartContext);
          try {
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
          } catch (error) {
            console.log("The errror ", error);
          }
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "AR",
        "BC",
        "CP",
        "DI",
        "ER",
        "GA",
        "MHEA",
        "OA",
        "OE",
        "PR",
        "RB",
        "RF",
        "SA",
        // "UN",
        "WE",
      ],
      tickAmount: undefined,
      tickPlacement: "between",
      min: undefined,
      max: undefined,
      range: undefined,
      floating: false,
      decimalsInFloat: undefined,
      overwriteCategories: undefined,
      position: "bottom",
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        style: {
          colors: [
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
          ],
          // fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          // fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        format: undefined,
        formatter: undefined,
        datetimeUTC: true,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      fill: {
        type: "solid",
        color: "#B1B9C4",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    series: [
      {
        name: "Total Count",
        type: "column",
        data: value,
      },
    ],
    colors: [
      function ({ value, seriesIndex, dataPointIndex, w }) {
        if (dataPointIndex == 0) {
          return "#3B3561";
        } else if (dataPointIndex == 1) {
          return "#4481B3";
        } else if (dataPointIndex == 2) {
          return "#187D8A";
        } else if (dataPointIndex == 3) {
          return "#97C6FF";
        } else if (dataPointIndex == 4) {
          return "#5D0202";
        } else if (dataPointIndex == 5) {
          return "#7C769E";
        } else if (dataPointIndex == 6) {
          return "#FC7A57";
        } else if (dataPointIndex == 7) {
          return "#9D4F4F";
        } else if (dataPointIndex == 8) {
          return "#EE9F9F";
        } else if (dataPointIndex == 9) {
          return "#F5A27E";
        } else if (dataPointIndex == 10) {
          return "#AC7070";
        } else if (dataPointIndex == 11 || dataPointIndex == 12) {
          return "#5E9180";
        } else if (dataPointIndex == 13) {
          return "#1E603A";
        } else if (dataPointIndex == 14) {
          return "#6C915E";
        } else {
          return "skyblue";
        }
      },
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
          width="100%"
          height={300}
          type="bar"
        />
      )}
    </>
  );
};

const ApexBarGraph = (props) => {
  const { dates, call, callFromDashboard } = props;
  return (
    <TravelDetailsView
      dates={dates}
      call={call}
      callFromDashboard={callFromDashboard}
    />
  );
};

export default ApexBarGraph;
