import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { Button, Space, Table, Modal, Spin } from "antd";
import { notification } from "antd";
import Box from "@mui/material/Box";
import Magnifier from "react-magnifier";
import Typography from "@mui/material/Typography";
import { SmileOutlined } from "@ant-design/icons";
import { getTopLatestAlertsList } from "../../services/AlertsTable";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CAMERAICON from "../../Assets/camera.png";
import ALERTICON from "../../Assets/alert.png";
import DATEICON from "../../Assets/schedule.png";
import CLOCKICON from "../../Assets/clock.png";
import IMAGEICON from "../../Assets/picture.png";
import DOWNLOADICON from "../../Assets/download.png";
import NOTFOUNDICON from "../../Assets/not-found.png";

//24hrs Api
import { get24hrsTopLatestAlertsList } from "../../services/Last24hrs";

const getRandomuserParams = (params) => ({
	results: params.pagination?.pageSize,
	page: params.pagination?.current,
	...params,
});
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
const modalstyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 520,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function TopLatestAlert(props) {
	const { call, callFromDashboard } = props;

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [Image, setImage] = React.useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  // const handleChange = (pagination, filters, sorter) => {
  // 	console.log("Various parameters", pagination, filters, sorter);
  // 	setFilteredInfo(filters);
  // 	setSortedInfo(sorter);
  // };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const GetTableList = async ({ startDate, endDate, startTime, endTime }) => {
    let apiData = await getTopLatestAlertsList({
      startingDateValue: startDate,
      startingTimeValue: startTime,
      endingDateValue: endDate,
      endingTimeValue: endTime,
    });
    // console.log("API DATA ", apiData);
    if (apiData == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      navigate("/");
    } else if (apiData !== null) {
      setTableData(apiData.data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: apiData?.data?.length,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    } else if (apiData == null) {
      openNotification("No Data Found.");
      setTableData([]);
    }
  };
  const get24hrsTopTableList = async () => {
    let Top24hrsdata = await get24hrsTopLatestAlertsList();
    setLoading(false);
    setTableData(Top24hrsdata.data);
  };

  useEffect(() => {
    if (callFromDashboard > 0) {
      let datesObj = localStorage.getItem("Dates");
      let { startDate, endDate, startTime, endTime } = JSON.parse(datesObj);
      GetTableList({ startDate, endDate, startTime, endTime });
    } else {
      get24hrsTopTableList();
    }
  }, [JSON.stringify(tableParams), callFromDashboard]);
	const handleTableChange = (pagination, filters, sorter) => {
		setFilteredInfo(filters);
		setSortedInfo(sorter);
		setTableParams({
			pagination,
			filters,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setTableData([]);
		}
	};
	const columns = [
		{
			title: (
				<>
					<IconButton sx={{ p: 1 }}>
						<img
							src={DATEICON}
							style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
							alt="LOGO"
						/>
					</IconButton>

					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Date
					</span>
				</>
			),
			dataIndex: "date",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.date,
			// 		value: item.date,
			// 	};
			// }),
			// // specify the condition of filtering result
			// // here is that finding the name started with `value`
			// onFilter: (value, record) => record.date.indexOf(value) === 0,
			// sorter: (a, b) => new Date(a.date) - new Date(b.date),
			// sortDirections: ["descend"],
			align: "left",
		},
		{
			title: (
				<>
					<IconButton sx={{ p: 1 }}>
						<img
							src={CLOCKICON}
							style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
							alt="LOGO"
						/>
					</IconButton>

					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Time
					</span>
				</>
			),
			dataIndex: "time",
			// defaultSortOrder: "descend",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.time,
			// 		value: item.time,
			// 	};
			// }),
			// onFilter: (value, record) => record.time.indexOf(value) === 0,
			align: "left",
		},
		// {
		// 	title: "Image",
		// 	dataIndex: "address",
		// 	render: () => (
		// 		<img
		// 			src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png"
		// 			alt="_blank"
		// 			style={{ width: "100px", height: "100px" }}
		// 		/>
		// 	),
		// 	filters: tableData?.map((item) => {
		// 		return {
		// 			text: item.image ? item.image : "not image",
		// 			value: item.image ? item.image : "not image",
		// 		};
		// 	}),
		// 	onFilter: (value, record) => record.image.indexOf(value) === 0,
		// },
		// {
		// 	title: (
		// 		<Tooltip title="Alert Type" placement="right-start">
		// 			<IconButton sx={{ p: 1 }}>
		// 				<img
		// 					src={ALERTICON}
		// 					style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
		// 					alt="LOGO"
		// 				/>
		// 			</IconButton>
		// 		</Tooltip>
		// 	),
		// 	dataIndex: "alert_type",
		// 	filters: tableData?.map((item) => {
		// 		return {
		// 			text: item.alert_type,
		// 			value: item.alert_type,
		// 		};
		// 	}),
		// 	onFilter: (value, record) => record.alert.indexOf(value) === 0,
		// },
		{
			title: (
				<>
					<IconButton sx={{ p: 1 }}>
						<img
							src={ALERTICON}
							style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
							alt="LOGO"
						/>
					</IconButton>

					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Alert
					</span>
				</>
			),
			dataIndex: "alert",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.alert,
			// 		value: item.alert,
			// 	};
			// }),
			// onFilter: (value, record) => record.alert.indexOf(value) === 0,
			align: "left",
		},
		{
			title: (
				<>
					<IconButton sx={{ p: 1 }}>
						<img
							src={CAMERAICON}
							style={{ width: "5vh", height: "5vh" }}
							alt="LOGO"
						/>
					</IconButton>

					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Camera
					</span>
				</>
			),
			dataIndex: "camera",
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.camera,
			// 		value: item.camera,
			// 	};
			// }),
			// onFilter: (value, record) => record.camera.indexOf(value) === 0,
			align: "left",
		},
		{
			title: (
				<>
					<IconButton sx={{ p: 1 }}>
						<img src={IMAGEICON} style={{ width: "5vh", height: "5vh" }} alt="LOGO" />
					</IconButton>

					<span
						style={{
							color: "slategray",
							fontSize: "large",
							fontFamily: "Calibri",
							fontWeight: "normal",
						}}
					>
						Image
					</span>
				</>
			),
			dataIndex: "image",
			render: (_, record) => {
				return (
					<img
						src={record.image}
						alt={IMAGEICON}
						onClick={function () {
							handleOpen();
							setImage(record.image);
						}}
						style={{
							width: "200px",
							height: "100px",
							cursor: "pointer",
							border: "1px solid skyblue",
							padding: "0.5vh",
							borderRadius: "2vh",
						}}
					/>
				);
			},
			// render: () => (

			// 	<img
			// 		src={record.image}
			// 		alt="_blank"
			// 		style={{ width: "100px", height: "100px" }}
			// 	/>
			// ),
			// filters: tableData?.map((item) => {
			// 	return {
			// 		text: item.image ? item.image : "not image",
			// 		value: item.image ? item.image : "not image",
			// 	};
			// }),
			// onFilter: (value, record) => record.image.indexOf(value) === 0,
			align: "left",
		},
	];
	return (
		<>
			{loading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Spin />
					<span className="mx-3" style={{ color: "slategray" }}>
						Loading please wait...
					</span>
				</div>
			) : (
				<>
					<Space
						style={{
							marginBottom: 16,
						}}
					>
						{/* <Button onClick={setAgeSort}>Sort age</Button>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button> */}
					</Space>
					<Table
						columns={columns}
						dataSource={tableData}
						pagination={tableParams.pagination}
						loading={loading}
						onChange={handleTableChange}
					/>
					<Modal
						open={open}
						centered
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						onOk={handleClose}
						onCancel={handleClose}
						cancelButtonProps={{ style: { display: "none" } }}
					>
						<Box>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Image
							</Typography>
							{/* <Magnifier src={Image} mgShape="square" /> */}
							{Image ? (
								<>
									<Magnifier src={Image} mgShape="square" alt="_blank" />
									<a href={Image}>
										<img
											src={DOWNLOADICON}
											style={{ width: "5vh", height: "5vh" }}
											className="my-3"
										/>{" "}
										Download
									</a>
								</>
							) : (
								<div style={{ display: "flex", justifyContent: "center" }}>
									<img
										src={NOTFOUNDICON}
										alt="_blank"
										style={{ width: "15vh", height: "15vh" }}
									/>
								</div>
							)}
						</Box>
					</Modal>
				</>
			)}
		</>
	);
}

export default TopLatestAlert;
