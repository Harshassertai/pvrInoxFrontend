import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
const { Paragraph, Text } = Typography;

function Failure({ title, message, failureMessage }) {
  return (
    <div>
      <Result status="error" title={title} subTitle={message}>
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you are looking for has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" />
            <span>{failureMessage}</span>
          </Paragraph>
        </div>
      </Result>
    </div>
  );
}

export default Failure;
