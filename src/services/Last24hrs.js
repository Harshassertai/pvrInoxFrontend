import axios from "axios";
import { decryptRequest } from "../utils/crypt";

//For Counts Card on Dashboard

const Last24hrsEntryCount = async (value) => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/last24hrsEntrycount`)
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err.message;
      } else {
        return err;
      }
    });
  return resp;
};

const Last24hrsExitCount = async (value) => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/last24hrsExitcount`)
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err.message;
      } else {
        return err;
      }
    });
  return resp;
};
const Last24hrsTatCount = async (value) => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/last24hrsTatcount`)
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err.message;
      } else {
        return err;
      }
    });
  return resp;
};
const Last24hrsTotalCount = async (value) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/last24hrs/last24hrstotalcount`, {
      TabNo: value,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      if (err.message == "Network Error") {
        return err.message;
      } else {
        return err;
      }
    });
  return resp;
};

//For Alerts Page
const get24hrsAlertsList = async () => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/last24hrsAlerts`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
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

const get24hrsCardAlertsList = async ({ cardName }) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/last24hrs/last24hrsCardAlertsTable`,
      { cardName },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
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

//For MostFrequentedAlerts

const get24hrsFrequentedAlertsList = async () => {
  let resp = await axios
    .get(
      `${process.env.REACT_APP_BASEURL}/last24hrs/latest24hrsAlerts`,

      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);

      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      return err?.response?.data?.message;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const get24hrsTopLatestAlertsList = async () => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/latest24TopAlerts`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      return err?.response?.data?.message;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

//For Graphs

const BarGraphListFor24hrs = async () => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/bargraphcountsfor24hrs`)
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption).data };
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

const LineGraphListFor24hrsForTAT = async () => {
  let resp = await axios
    .get(
      `${process.env.REACT_APP_BASEURL}/last24hrs/linegraphcountsfor24hrsfortat`
    )
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption).data };
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

const LineGraphListFor24hrs = async () => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/last24hrs/linegraphcountsfor24hrs`)
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return {
        data: JSON.parse(dataafterdecryption).data,
      };
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

//For Bar graph bar click
const BarClickListFor24hrs = async (dataPoint) => {
  let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/last24hrs/barclickfor24hrs`, {
      zone: dataPoint,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);

      return {
        data: JSON.parse(dataafterdecryption).data,
        title: JSON.parse(dataafterdecryption).title,
      };
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

//For Bar graph bar click For User Assigned
const BarClickListFor24hrsForUserAssigned = async (dataPoint) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/last24hrs/barclickfor24hrsForUserAssigned`,
      {
        usersAssigned: dataPoint,
      }
    )
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);

      return {
        data: JSON.parse(dataafterdecryption).data,
        title: JSON.parse(dataafterdecryption).title,
      };
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

export {
  Last24hrsEntryCount,
  Last24hrsExitCount,
  Last24hrsTatCount,
  Last24hrsTotalCount,
  get24hrsAlertsList,
  get24hrsCardAlertsList,
  get24hrsFrequentedAlertsList,
  get24hrsTopLatestAlertsList,
  BarGraphListFor24hrs,
  LineGraphListFor24hrs,
  BarClickListFor24hrs,
  LineGraphListFor24hrsForTAT,
  BarClickListFor24hrsForUserAssigned,
};
