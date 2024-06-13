import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, notification } from "antd";
import { SmileOutlined, MailFilled } from "@ant-design/icons";
import LoginLogo from "../../Assets/login.png";
import "./ResetPassword.css";
import useInputs from "../../customhooks/useInputs";

import ResetPasswordFetch from "../../services/ResetPassword";

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

function ResetPassword() {
	const [searchParams] = useSearchParams();
	let tokenValue = "";
	for (const entry of searchParams.entries()) {
		const [param, value] = entry;
		tokenValue = value;
	}
	let password = useInputs("");
	let confirmpassword = useInputs("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password === "") {
      return openNotification("Password is required field!");
    }
    let passwordRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    if (password.value !== confirmpassword.value) {
      return openNotification("Password mismatch!");
    }
    if (passwordRegex.test(password.value)) {
      let data = await ResetPasswordFetch({
        token: tokenValue,
        password: password.value,
      });
      if (data === "Password has been updated.") {
        openNotification(data);
        navigate("/");
      } else {
        openNotification(data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      return openNotification(
        "Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character."
      );
    }
  };
  return (
    <div className="LoginDiv">
      <div className="ImageDiv">
        <h3>PAREKH</h3>
        <img src={LoginLogo} alt="Logo" />
      </div>
      <div className="InputDiv">
        <div className="InputDivText">
          <h3>Reset Password</h3>

          <p className="details">Enter your details below</p>
        </div>
        <div className="InputDivInner">
          <div className="Input">
            <label>Password</label>
            <Input
              required
              prefix={<MailFilled size="10vh" />}
              placeholder="Enter Your New Password"
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
          </div>
          <div className="Input">
            <label>Confirm Password</label>
            <Input
              required
              prefix={<MailFilled size="10vh" />}
              placeholder="Enter above password for confirm"
              value={confirmpassword.value}
              onChange={confirmpassword.onChange}
            />
          </div>
          <div className="my-3">
            <button
              type="button"
              class="btn btn-dark"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
