import axios from "axios";
import { decryptRequest } from "../utils/crypt";
const BarGraphList = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Person/bargraphcounts`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption).data };
    })
    .catch((err) => {
      return err?.response?.data?.message || err || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const LineGraphList = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Person/linegraphcounts`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      // console.log("line graph coungts ", JSON.parse(dataafterdecryption));
      return { data: JSON.parse(dataafterdecryption).data };
    })
    .catch((err) => {
      return err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const LineGraphListForTat = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  // value,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Person/linegraphcountsfortat`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      // TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      return err?.response?.data?.data || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const BarGraphClick = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  zone,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Person/bargraphclick`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      zone,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return {
        data: JSON.parse(dataafterdecryption)?.data,
        title: JSON.parse(dataafterdecryption)?.title,
      };
    })
    .catch((err) => {
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const BarGraphClickForUsersAssigned = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  usersAssigned,
}) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Person/bargraphclickforusersassigned`,
      {
        startDate: startingDateValue,
        startTime: startingTimeValue,
        endDate: endingDateValue,
        endTime: endingTimeValue,
        usersAssigned,
      }
    )
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return {
        data: JSON.parse(dataafterdecryption)?.data,
        title: JSON.parse(dataafterdecryption)?.title,
      };
    })
    .catch((err) => {
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

export {
	BarGraphList,
	LineGraphList,
	LineGraphListForTat,
	BarGraphClick,
	BarGraphClickForUsersAssigned,
};
