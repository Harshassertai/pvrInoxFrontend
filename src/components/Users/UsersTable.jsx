import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  notification,
  Select,
  Popconfirm,
} from "antd";
import SEARCHICON from "../../Assets/data-analysis.png";
import { SmileOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EMAILICON from "../../Assets/useremail.png";
import NAMEICON from "../../Assets/contact-card.png";
import DATEICON from "../../Assets/schedule.png";
import ROLEICON from "../../Assets/permission.png";
import jwt_decode from "jwt-decode";
import { decryptRequest } from "../../utils/crypt";
import { getUsersList, editUser, deletUser } from "../../services/User";
import { formatISODate } from "../../utils/FormatDate";

const openNotification = (description) => {
  notification.open({
    message: "Alert",
    description,
    icon: (
      <SmileOutlined
        style={{
          color: "black",
        }}
      />
    ),
  });
};

function UsersTable(props) {
  const {
    apiData: { data },
    addClick,
  } = props;
  const onChange = (pagination, filters, sorter, extra) => {};
  let [isDeleteClicked, setIsDeleteClicked] = useState(false);
  let [userTable, setUserTable] = useState([]);
  const [accessValue, setAccessValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [requestedEmail, setRequestedEmail] = useState("");
  const [accessValueForNewUser, setAccessValuForNewUser] = useState("User");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  //Modal Function
  const showModal = (record) => {
    setIsModalOpen(true);
    setRequestedEmail(record.email);
    setNewUserEmail(record.email);
    setNewUserName(record.name);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (e) => {
    setNewUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setNewUserPassword(e.target.value);
  };

  const handleAccessChange = (value) => {
    setAccessValuForNewUser(value);
  };

  function validateEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  let getUserDataList = async () => {
    let Userdata = await getUsersList();
    setUserTable(Userdata?.data);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    console.log("Decoded Token ", decoded);
    let { access } = decoded;
    setAccessValue(access);
  }, []);

  const handleEditUser = async () => {
    let emailValidation = validateEmail(newUserEmail);
    console.log(
      "Edit User Payload -----> ",
      requestedEmail,
      newUserEmail,
      newUserName,
      newUserPassword,
      accessValueForNewUser
    );
    if (emailValidation) {
      let editUserResponse = await editUser({
        requestedEmail,
        newUserEmail,
        newUserName,
        newUserPassword,
        accessValueForNewUser,
      });
      if (editUserResponse === "User Updated Successfully") {
        await getUserDataList();
        openNotification(editUserResponse);
        handleModalClose();
        setAccessValuForNewUser("User");
      } else if (
        editUserResponse ===
        "Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character."
      ) {
        openNotification(editUserResponse);
        handleModalClose();
        setAccessValuForNewUser("User");
      }
    } else {
      openNotification("Enter a valid email");
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    setIsDeleteClicked(true);
    let deleteUserResponse = await deletUser({ email: record.email });
    if (deleteUserResponse.data === "User Deleted Successfully") {
      await getUserDataList();
      openNotification(deleteUserResponse.data);
    }
  };
  useEffect(() => {
    if (!isDeleteClicked) {
      getUserDataList();
    } else if (addClick) {
      getUserDataList();
    } else {
      getUserDataList();
    }
  }, [isDeleteClicked]);
  const columns = [
    {
      title: (
        <>
          <Tooltip title="Name" placement="right-start">
            <IconButton sx={{ p: 1 }}>
              <img
                src={NAMEICON}
                style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                alt="LOGO"
              />
            </IconButton>
          </Tooltip>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Name
          </span>
        </>
      ),
      dataIndex: "name",
    },
    {
      title: (
        <>
          <Tooltip title="Email" placement="right-start">
            <IconButton sx={{ p: 1 }}>
              <img
                src={EMAILICON}
                style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                alt="LOGO"
              />
            </IconButton>
          </Tooltip>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Email
          </span>
        </>
      ),
      dataIndex: "email",
    },
    {
      title: (
        <>
          <Tooltip title="Last Login" placement="right-start">
            <IconButton sx={{ p: 1 }}>
              <img
                src={DATEICON}
                style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                alt="LOGO"
              />
            </IconButton>
          </Tooltip>
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
      render: (_, record) => <span>{formatISODate(record.last_login)}</span>,
    },
    {
      title: (
        <div style={{ display: accessValue == "Admin" ? "Block" : "none" }}>
          <Tooltip title="Last Login" placement="right-start">
            <IconButton sx={{ p: 1 }}>
              <img
                src={ROLEICON}
                style={{ width: "5vh", height: "5vh", marginRight: "1vh" }}
                alt="LOGO"
              />
            </IconButton>
          </Tooltip>
          <span
            style={{
              color: "slategray",
              fontSize: "large",
              fontFamily: "Calibri",
              fontWeight: "normal",
            }}
          >
            Role
          </span>
        </div>
      ),
      render: (_, record) => (
        <span style={{ display: accessValue == "Admin" ? "Block" : "none" }}>
          {record.access == null
            ? "User"
            : record.access == ""
            ? "User"
            : record.access}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1vh" }}>
          <Tooltip
            title={
              accessValue == "Admin"
                ? "Click Here To Edit This User"
                : "You Don't Have Permission For Edit."
            }
          >
            <Button
              disabled={accessValue == "Admin" ? false : true}
              onClick={() => {
                showModal(record);
              }}
            >
              Edit
            </Button>
          </Tooltip>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this user."
            onConfirm={() => handleDelete(record)}
            onCancel={() => {
              console.log("Delete No Clicked");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip
              title={
                accessValue == "Admin"
                  ? "Click Here To Delete This User"
                  : "You Don't Have Permission For Delete."
              }
            >
              <Button disabled={accessValue == "Admin" ? false : true}>
                Delete
              </Button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <div
        className="my-3"
        style={{ border: "1px solid #2292A4", borderRadius: "5px" }}
      >
        <Table columns={columns} dataSource={userTable} onChange={onChange} />
      </div>
      <>
        <Modal
          title="Edit User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ display: "flex", Gap: "2vh", flexDirection: "column" }}>
            <div style={{ padding: "1vh" }}>
              <Input
                placeholder="Name"
                value={newUserName}
                onChange={handleNameChange}
              />
            </div>
            <div style={{ padding: "1vh" }}>
              <Input
                placeholder="Email"
                value={newUserEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div style={{ padding: "1vh" }}>
              <Select
                placeholder="Outlined"
                style={{
                  width: 120,
                }}
                value={accessValueForNewUser}
                onChange={handleAccessChange}
                defaultValue="User"
                options={[
                  {
                    value: "Admin",
                    label: "Admin",
                  },
                  {
                    value: "User",
                    label: "User",
                  },
                ]}
              />
            </div>
            <div style={{ padding: "1vh" }}>
              <Input
                placeholder="Password"
                type="password"
                value={newUserPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div style={{ padding: "1vh", gap: "1vh", display: "flex" }}>
              <Button onClick={handleEditUser}>Submit</Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
}

export default UsersTable;
