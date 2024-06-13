import axios from "axios";
import { decryptRequest } from "../utils/crypt";

const getAlertsList = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  alertSelected,
  cameraSelected,
  zoneSelected,
  usersSelected,
  statusSelected,
}) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/alertsTable`,
      {
        startDate: startingDateValue,
        startTime: startingTimeValue,
        endDate: endingDateValue,
        endTime: endingTimeValue,
        camera: cameraSelected?.length > 0 ? cameraSelected : null,
        alert: alertSelected?.length > 0 ? alertSelected : null,
        zone: zoneSelected?.length > 0 ? zoneSelected : null,
        person: usersSelected?.length > 0 ? usersSelected : null,
        status: statusSelected?.length > 0 ? statusSelected : null,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const getAlertsListDateWise = async ({
  startingDateValue,
  endingDateValue,
  alertSelected,
  cameraSelected,
  zoneSelected,
  usersSelected,
  statusSelected,
}) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/alertsTableDateWise`,
      {
        startDate: startingDateValue,
        endDate: endingDateValue,
        camera: cameraSelected?.length > 0 ? cameraSelected : null,
        alert: alertSelected?.length > 0 ? alertSelected : null,
        zone: zoneSelected?.length > 0 ? zoneSelected : null,
        person: usersSelected?.length > 0 ? usersSelected : null,
        status: statusSelected?.length > 0 ? statusSelected : null,
      },
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
      console.log("Error is ---> ", err);
      if (err?.response) {
        return err?.response?.data?.message || err;
      } else {
        return err.message;
      }
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const getCardAlertsList = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  cardName,
}) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/cardalertsTable`,
      {
        startDate: startingDateValue,
        startTime: startingTimeValue,
        endDate: endingDateValue,
        endTime: endingTimeValue,
        cardName,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const getAlertsListZoneWise = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
  zoneSelected,
}) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/alertsTableZoneWise`,
      {
        startDate: startingDateValue,
        startTime: startingTimeValue,
        endDate: endingDateValue,
        endTime: endingTimeValue,
        zone: zoneSelected?.length > 0 ? zoneSelected[0] : null,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const getLatestAlertsList = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
}) => {
  let result = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/latestAlerts`,
      {
        startDate: startingDateValue,
        startTime: startingTimeValue,
        endDate: endingDateValue,
        endTime: endingTimeValue,
      },

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
      if (err.response) {
        return err.response.data.msg;
      } else {
        return err.message;
      }
    });
  return result;
};
const getTopLatestAlertsList = async ({
  startingDateValue,
  startingTimeValue,
  endingDateValue,
  endingTimeValue,
}) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/latestTopAlerts`,
      {
        startDate: startingDateValue,
        startTime: startingTimeValue,
        endDate: endingDateValue,
        endTime: endingTimeValue,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const postComment = async (id, comments, commentText, name) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/comment`,
      {
        id: id,
        comment: [
          {
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString().split(" ")[0],
            comment: commentText,
            name: name,
          },
          ...comments,
        ],
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const postCommentForBulkStatusClose = async (ids, commentText, name) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/bulkcloseComment`,
      {
        ids: ids,
        comment: commentText,
        name: name,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};

const commentList = async (id) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/commentsList`,
      {
        id: id,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const closeStatus = async (id, name) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/statusClose`,
      {
        id: id,
        name: name,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const bulkCloseStatus = async (idList, name) => {
  let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Table/bulkCloseStatus`,
      {
        ids: idList,
        name: name,
      },
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
      return err?.response?.data?.message || err;
    });
  if (resp) {
    return resp;
  } else {
    return "No Data Found.";
  }
};
const getByPassCameraList = async () => {
  let resp = await axios
    .get(`${process.env.REACT_APP_BASEURL}/Table/camerabypasstable`, {
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

const editVisibility = async ({ id }) => {
  let resp = await axios
    .post(
      `http://localhost:5000/Table/editVisibility`,
      {
        id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(async (res) => {
      return { data: res.data.data };
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
  getAlertsList,
  getAlertsListDateWise,
  getCardAlertsList,
  getAlertsListZoneWise,
  getLatestAlertsList,
  getTopLatestAlertsList,
  postComment,
  commentList,
  closeStatus,
  bulkCloseStatus,
  postCommentForBulkStatusClose,
  getByPassCameraList,
  editVisibility,
};
