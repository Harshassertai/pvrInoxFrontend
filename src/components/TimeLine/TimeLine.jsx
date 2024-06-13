import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline, Spin, Select, notification, Modal } from "antd";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { SmileOutlined } from "@ant-design/icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CommonButton from "../../common/commonbutton/CommonButton";
import CommonNavbar from "../Dashboard/CommonNavbar";
import { listUserActivity, getUsersList } from "../../services/User";
import NetworkError from "../Notifications/500/NetworkError";
import Success from "../Notifications/200/Success";
import Failure from "../Notifications/Failure/Failure";

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

const TimeLine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  let { email } = state;
  const [itemsValues, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [successResult, setSuccessResult] = useState(false);
  const [errorResult, setErrorResult] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkForError = () => {
    setIsErrorModalOpen(false);
  };
  const handleCancelForError = () => {
    setIsErrorModalOpen(false);
  };

  const getUserActivityList = async () => {
    let data = await listUserActivity({ email });

    if (data.length > 0) {
      setLoading(false);
      setItems(data);
      setSuccessResult(true);
      setIsModalOpen(true);
    } else {
      setFailureMessage("There is no user activity present currently.");
      setErrorResult(true);
      setIsErrorModalOpen(true);
    }
  };
  const onChange = async (value) => {
    setLoading(true);

    let data = await listUserActivity({ email: value });
    console.log("On Changes of user activity ------> ", data);

    if (data.length < 0) {
    }

    if (data.length > 0) {
      setLoading(false);
      setItems(data);
      setSuccessResult(true);
      setIsModalOpen(true);
    } else if (data.length < 0) {
      setFailureMessage("There is no user activity present currently.");
      setErrorResult(true);
      setIsErrorModalOpen(true);
      setLoading(false);
      setItems([]);
    } else {
      setFailureMessage("There is no user activity present currently.");
      setErrorResult(true);
      setIsErrorModalOpen(true);
      setLoading(false);
      setItems([]);
    }
  };
  const onSearch = async (value) => {
    setLoading(true);
    let data = await listUserActivity({ email: value });

    if (data.length > 0) {
      setLoading(false);
      setItems(data);
    } else {
      setLoading(false);
      setItems([]);
      setFailureMessage("There is no user activity present currently.");
      setErrorResult(true);
      setIsErrorModalOpen(true);
    }
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getUsersDetails = async () => {
    let data = await getUsersList();
    console.log("User details data -----> ", data?.response?.data?.message);

    if (data == "Token Expired,Login Again.") {
      openNotification("Token Expired,Login Again.");
      localStorage.removeItem("Dates");
      localStorage.clear();
      Cookies.remove("name");
      navigate("/");
    } else {
      if (data?.response?.data?.message == "Token Expired,Login Again.") {
        setFailureMessage("Token Expired,Login Again.");
        setErrorResult(true);
        setIsErrorModalOpen(true);
        setInterval(() => {
          localStorage.removeItem("Dates");
          localStorage.clear();
          Cookies.remove("name");
          navigate("/");
        }, 1000);
      }
      let usersEmail = data?.data?.map((item) => {
        return { value: item.email, label: item.email };
      });
      setUsers(usersEmail);
    }
  };

  const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
      let userSheetData = apiData.map((item) => {
        return {
          ActivityDone: item.children,
          ActivityType: item.type,
          SessionStart: item.sessionStart,
          SessionEnd: item.sessionEnd,
        };
      });
      const ws = XLSX.utils.json_to_sheet(userSheetData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
      <CommonButton
        onClick={(e) => exportToCSV(apiData, fileName)}
        icon={FileUploadIcon}
      >
        Export
      </CommonButton>
    );
  };

  useEffect(() => {
    getUserActivityList();
    getUsersDetails();
  }, [email]);
  return (
    <>
      <CommonNavbar />
      <div
        style={{
          marginTop: "5vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1vh",
        }}
      >
        <div>
          {loading ? (
            <Spin />
          ) : (
            <div style={{ display: "flex", gap: "2vh", alignItems: "center" }}>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={users}
                style={{ width: "30vh" }}
              />
              <div>
                <ExportToExcel
                  apiData={itemsValues}
                  fileName={"Activity Sheet"}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <span
            style={{
              fontWeight: "bolder",
              fontSize: "3vh",
              fontStyle: "italic",
              textDecoration: "underline",
            }}
          >
            User Activity
          </span>
        </div>
        <div>
          <span
            style={{
              fontWeight: "bolder",
              fontSize: "3vh",
              fontStyle: "italic",
            }}
          >
            Activity Count :-{" "}
            {Array.isArray(itemsValues) && itemsValues?.length > 0
              ? itemsValues.length
              : 0}
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: "10vh",
          marginBottom: "50vh",
          height: "auto",
        }}
      >
        <div
          style={{
            marginTop: "10vh",
            padding: "2vh",
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
              }}
            >
              <Spin />
              <span className="mx-3" style={{ color: "slategray" }}>
                Loading please wait...
              </span>
            </div>
          ) : (
            <Timeline
              mode="alternate"
              items={
                Array.isArray(itemsValues) && itemsValues?.length > 0
                  ? itemsValues?.map((item) => {
                      if (item.type == "Logout button Clicked") {
                        return {
                          color: "red",
                          children: item.children,
                        };
                      } else if (item.type == "SignIn button Clicked") {
                        return {
                          color: "green",
                          children: item.children,
                        };
                      } else {
                        return {
                          dot: (
                            <ClockCircleOutlined
                              style={{
                                fontSize: "16px",
                              }}
                            />
                          ),
                          children: item.children,
                        };
                      }
                    })
                  : [
                      {
                        color: "red",
                        children: "No Activity Present For The User.",
                      },
                    ]
              }
            />
          )}
        </div>
      </div>
      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {successResult && (
          <Success
            message="User Activity Fetched Successfully"
            title="Success"
          />
        )}
      </Modal>
      <Modal
        title={null}
        open={isErrorModalOpen}
        onOk={handleOkForError}
        onCancel={handleCancelForError}
        footer={null}
      >
        {errorResult && (
          <Failure
            message="Please check server connectivity or may be result is empty."
            title="User Activity Fetching Failed"
            failureMessage={failureMessage}
          />
        )}
      </Modal>
    </>
  );
};
export default TimeLine;
