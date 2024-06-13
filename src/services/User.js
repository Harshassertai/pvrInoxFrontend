import axios from "axios";
import { decryptRequest } from "../utils/crypt";

const getUsersList = async () => {
  let responseData = await axios
    .get(`${process.env.REACT_APP_BASEURL}/Users/userslist`, {
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
  if (responseData) {
    return responseData;
  } else {
    return "No Data Found.";
  }
};
const deletUser = async ({ email }) => {
  let responseData = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Users/deleteUser`, {
      email,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      return err;
    });
  if (responseData) {
    return responseData;
  } else {
    return "No Data Found.";
  }
};
const editUser = async ({
  requestedEmail,
  newUserName,
  newUserEmail,
  newUserPassword,
  accessValueForNewUser,
}) => {
  let result = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Users/editUser`, {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return result;
};

const listUserActivity = async ({ email }) => {
  let token = localStorage.getItem("token");
  let result = await axios
    .get(`${process.env.REACT_APP_BASEURL}/Users/userActivity?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log("error of timeline ---> ", err);
      if (err.response) {
        return err.response.data.data;
      } else {
        return err.message;
      }
    });
  return result;
};

export { getUsersList, deletUser, editUser, listUserActivity };
