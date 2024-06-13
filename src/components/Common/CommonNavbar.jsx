import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../../Assets/parekh.jpeg";
import SideBar from "../Dashboard/SideBar";
import Main from "../Dashboard/Main";
import "./index.css";

function CommonNavbar() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleSideBar = () => {
		setOpen(!open);
	};
	const handleLogout = () => {
		navigate("/");
	};
	return (
		<div>
			<nav
				// style={{ backgroundColor: "white" }}
				className="navbar navbar-expand-lg navBar"
			>
				<a
					className="navbar-brand"
					href="#"
					onClick={handleSideBar}
					style={{ color: "white", fontWeight: "bolder" }}
				>
					<img src={LOGO} style={{ width: "9vh", height: "8vh" }} />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					style={{ display: "flex", justifyContent: "flex-end", width: "100vw" }}
				>
					<button className="btn btn-light my-2 my-sm-0" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<div style={{ display: "flex" }} className="my-3 mx-2">
				<SideBar display={open} />
				<h5>Users</h5>
			</div>
		</div>
	);
}

export default CommonNavbar;
