import axios from "axios";
import { decryptRequest } from "../utils/crypt";

const Count = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  value,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Person/count`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      console.log("Error of count", err);
      if (err.message == "Network Error") {
        return err.message;
      } else {
        return err?.response?.data?.message || err;
      }
    });
  return resp;
};

const EntryCount = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  value,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/counts/entrycount`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err;
      } else {
        return err;
      }
    });
  return resp;
};
const ExitCount = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  value,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/counts/exitcount`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err;
      } else {
        return err;
      }
    });
  return resp;
};
const TotalCount = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  value,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/counts/totalcount`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err;
      } else {
        return err;
      }
    });
  return resp;
};
const TatCount = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  value,
}) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/counts/tatcount`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err;
      } else {
        return err;
      }
    });
  return resp;
};

export { Count, TotalCount, EntryCount, ExitCount, TatCount };
