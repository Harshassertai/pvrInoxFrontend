import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, notification } from "antd";
import { SmileOutlined, MailFilled, LockFilled } from "@ant-design/icons";
import LoginLogo from "../../Assets/inoxLogo.png";
import LoginGif from "../../Assets/loginGif.gif";
import "./index.css";
import useInputs from "../../customhooks/useInputs";

import { loginFetch } from "../../services/Login";

const openNotification = (description) => {
  notification.open({
    message: "Alert",
    description,
    icon: (
      <SmileOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};

function Login() {
  let email = useInputs("");
  let password = useInputs("");
  const [btndisable, setBtnDisable] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "") {
      return openNotification("Email is required field!");
    }
    if (password === "") {
      return openNotification("Password is required field!");
    }
    let data = await loginFetch({
      email: email.value,
      password: password.value,
    });
    console.log("Data of login ---> ", data);
    if (data.statusCode == 200) {
      setBtnDisable(true);
      openNotification(data);
      setTimeout(() => {
        localStorage.setItem("path", "/users");
        navigate("/users");
      }, 2000);
    } else {
      return;
    }
  };
  return (
    <div className="LoginDiv">
      <div className="ImageDiv">
        <h3>PVR</h3>
        <img src={LoginLogo} alt="Logo" />
      </div>
      <div className="InputDiv">
        <div className="InputDivText">
          <img src={LoginGif} style={{ width: "5vw", borderRadius: "5px" }} />

          {/* <p className="details">Enter your login details below</p> */}
        </div>
        <div className="InputDivInner">
          <div className="Input">
            <label>Email Address</label>
            <Input
              required
              prefix={<MailFilled size="10vh" />}
              placeholder="Enter Your Email"
              value={email.value}
              onChange={email.onChange}
            />
          </div>
          <div className="my-2 PasswordDiv">
            <label>Password</label>
            {/* <a href="/">Forgot your password ?</a> */}
          </div>
          <div className="Input">
            <Input
              required
              prefix={<LockFilled size="10vh" />}
              placeholder="Enter Your Password"
              value={password.password}
              onChange={password.onChange}
              type="password"
            />
          </div>
          <div
            className="my-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              type="button"
              class="btn btn-dark"
              onClick={handleLogin}
              disabled={btndisable ? btndisable : false}
            >
              SIGN IN
            </button>
            <a href="/forgotpassword">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
