import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LineGraphList } from "../../services/Graph";
import ReactApexChart from "react-apexcharts";

//For 24hrs
import {
	LineGraphListFor24hrs,
	BarGraphListFor24hrs,
} from "../../services/Last24hrs";
import { BarGraphList, BarClickListFor24hrs } from "../../services/Graph";

const TravelDetailsView = (props) => {
  const { call, callFromDashboard } = props;
  // console.log("LIVE VALUE IN LINE GRAPH", call);
  const [value, setValue] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isApiCall, setIsApiCall] = useState(false);
  const [dataPoint, setDataPoint] = useState("");
  const navigate = useNavigate();

  const getBarGraphList = async ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    let apiData = await LineGraphList({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
    });
    setLoading(false);
    setValue(apiData?.data);
    setCategories(apiData?.data[3]);
  };
  const getBarGraphListFor24hrs = async () => {
    let apiData = await LineGraphListFor24hrs();
    setLoading(false);
    setValue(apiData?.data);
    setCategories(apiData?.data[3]);
  };
  const barClick = ({ args, status }) => {
    let datesObj = localStorage.getItem("Dates");
    let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
    if (status == "Total Status Counts") {
      navigate("/bargraphclickforusersassigned", {
        state: {
          usersAssigned: args,
          isApiCall,
          dates: { startDate, endDate, startTime, endTime },
          status: "Total",
        },
      });
    } else if (status == "Open Status Count") {
      navigate("/bargraphclickforusersassigned", {
        state: {
          usersAssigned: args,
          isApiCall,
          dates: { startDate, endDate, startTime, endTime },
          status: "Open",
        },
      });
    } else {
      setDataPoint(args);
      navigate("/bargraphclickforusersassigned", {
        state: {
          usersAssigned: args,
          isApiCall,
          dates: { startDate, endDate, startTime, endTime },
          status: "Close",
        },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (callFromDashboard > 0) {
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
      getBarGraphList({ startDate, endDate, startTime, endTime });
      setIsApiCall(true);
    } else {
      getBarGraphListFor24hrs();
    }
  }, [callFromDashboard]);

  const chartData = {
    chart: {
      id: "apexchart-example",
      //	foreColor: ["#2292A4", "#2292A4", "#2292A4"],
      type: "bar",
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [],
        },
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // Handle the click event here
          // console.log(
          //   "chart datas -----> ",
          //   config.w.globals.seriesNames,
          //   config.w.globals.seriesNames[config.seriesIndex],
          //   config.seriesIndex
          // );
          try {
            barClick({
              args: categories[config.dataPointIndex],
              status: config.w.globals.seriesNames[config.seriesIndex],
            });
          } catch (error) {
            console.log("The errror ", error);
          }
        },
      },
    },

    xaxis: {
      categories,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 5, 10],
        //colorStops: ["#2292A4"],
      },
    },

    legend: {
      // position: '',
      width: 40,
      // position: 'top',
    },
    series: [
      {
        name: "Total Status Counts",
        data: value && value[0],
        color: "#3A7CA5",
      },
      {
        name: "Open Status Count",
        data: value && value[1],
        color: "#F46036",
      },
      {
        name: "Close Status Count",
        data: value && value[2],
        color: "#4D9078",
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
          height={320}
          type="bar"
        />
      )}
    </>
  );
};

const ApexLineGraph = (props) => {
  const { dates, call, callFromDashboard } = props;
  return (
    <TravelDetailsView
      dates={dates}
      call={call}
      callFromDashboard={callFromDashboard}
    />
  );
};

export default ApexLineGraph;
