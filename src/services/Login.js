import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { encryptRequest, decryptRequest } from "../utils/crypt";

const LogActivity = async ({ activity, type, email, ...args }) => {
  let result = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Users/userActivity`, {
      activity,
      type: type,
      email: email,
      args,
    })
    .then((res) => {
      console.log("USER ACTIVITY LOGGED------> ");
    })
    .catch((err) => {
      console.log("CAUGHT ERROR WHILE USER ACTIVITY LOGGED------> ", err);
    });
};

const sessionFetch = async (token) => {
  var decoded = jwt_decode(token);
  let { data } = decoded;
  let emailOfUser = "";
  let decryptedResponse = await decryptRequest(data);

  let { email, lastLoginTime } = JSON.parse(decryptedResponse);
  LogActivity({
    activity: [{ workDone: "Login Done" }],
    type: "SignIn button Clicked",
    email: email,
    lastLoginTime,
  });
};

const loginFetch = async ({ email, password }) => {
  let Request = await encryptRequest({ email, password });
  let result = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Auth/login`, {
      Request,
    })
    .then(async (res) => {
      console.log("responnse of login ", res.data);
      let { message, statusCode } = res.data;
      let decryptedResponse = await decryptRequest(res.data.data);
      localStorage.setItem("token", JSON.parse(decryptedResponse));
      let tokenData = jwt_decode(JSON.parse(decryptedResponse));
      console.log("Token Data ---> ", tokenData);
      return { message, statusCode };
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

const signUpFetch = async ({
  newUserName,
  newUserEmail,
  newUserPassword,
  accessValueForNewUser,
}) => {
  let result = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Auth/signup`, {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      access: accessValueForNewUser,
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return result;
};

export { loginFetch, signUpFetch, LogActivity };
