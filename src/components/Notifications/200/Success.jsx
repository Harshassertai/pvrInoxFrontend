import React from "react";
import { Button, Result } from "antd";

function Success({ message, title }) {
  return (
    <div>
      <Result status="success" title={title} subTitle={message} />
    </div>
  );
}

export default Success;
