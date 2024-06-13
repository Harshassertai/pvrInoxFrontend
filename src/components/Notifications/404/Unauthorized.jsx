import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import NotFoundImage from "../../../Assets/access denied.jpg";

function Unauthorized() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    localStorage.setItem("path", "/home");
    navigate("/home");
  };
  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={handleNavigate}>
            Back Home
          </Button>
        }
      />
    </>
  );
}

export default Unauthorized;
