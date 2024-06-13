import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, notification } from "antd";
import { SmileOutlined, MailFilled, LockFilled } from "@ant-design/icons";
import LoginLogo from "../../Assets/login.png";
import "./ForgotPassword.css";
import useInputs from "../../customhooks/useInputs";

import ForgotPasswordFetch from "../../services/ForgotPassword";

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

function ForgotPassword() {
	let email = useInputs("");
	const navigate = useNavigate();

	const handleForgotPassword = async () => {
		if (email === "") {
			return openNotification("Email is required field!");
		}
		let data = await ForgotPasswordFetch({
			email: email.value,
		});
		if (data == "Email is incorrect!") {
			openNotification(data);
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} else {
			openNotification(data);
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
					<h3>Forgot Password</h3>

					<p className="details">Enter your details below</p>
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
					<div className="my-3">
						<button type="button" class="btn btn-dark" onClick={handleForgotPassword}>
							SEND LINK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
